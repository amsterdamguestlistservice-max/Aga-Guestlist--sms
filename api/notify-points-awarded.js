// api/notify-points-awarded.js
//
// Called automatically by a Supabase Database Webhook whenever a row in
// guestlist_requests is updated. Two things can happen here:
//
// On a new "Approved":
//   1. adds POINTS_PER_APPROVAL points to that guest's profile
//   2. sends that guest a personal push notification, if they have one
//      linked to their account
//   3. if this is that guest's FIRST-EVER approved request and they
//      signed up via a referral link, awards REFERRAL_BONUS_POINTS to
//      whoever referred them, plus a push notification to the referrer
//
// On a new "No-Show" (only meaningful after an approval):
//   1. deducts NO_SHOW_PENALTY points from that guest's profile
//      (never below 0)
//   2. sends that guest a personal push notification explaining why
//
// Required environment variables (same Vercel project as the other
// functions):
//   WEBHOOK_SECRET             — the same one already used for the
//                                 new-account email webhook (section 6)
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   VAPID_PUBLIC_KEY
//   VAPID_PRIVATE_KEY
//
// Depends on "web-push" and "@supabase/supabase-js" — already added to
// package.json for the push notification feature.

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

const POINTS_PER_APPROVAL = 10;
const REFERRAL_BONUS_POINTS = 20;
const NO_SHOW_PENALTY = 15;


// ---- Guest email (needs a verified sending domain in Resend) ----
// Resend's sandbox sender can only email the account owner, so guest emails
// stay switched off until RESEND_GUEST_FROM is set in Vercel, e.g.
//   Amsterdam Guestlist Service <noreply@amsterdamguestlistservice.website>
// (the domain must be verified in Resend first). Never throws.
function guestEmailHtml(heading, line, record) {
  var esc = function (v) {
    return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };
  return '<div style="background:#050505;color:#F5F5F5;padding:28px;font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">' +
    '<p style="color:#C9A24A;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">Amsterdam Guestlist Service</p>' +
    '<h2 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;margin:0 0 12px;">' + esc(heading) + '</h2>' +
    '<p style="color:#cfcfcf;line-height:1.6;margin:0 0 18px;">Hi ' + esc(record.first_name || 'there') + ', ' + esc(line) + '</p>' +
    '<p style="border:1px solid #3a3223;padding:14px;line-height:1.7;margin:0 0 18px;">' +
    '<strong>' + esc(record.event_name) + '</strong><br>' + esc(record.event_venue) + '<br>' + esc(record.event_date) +
    (record.total_guests > 1 ? '<br>Party size: ' + esc(record.total_guests) : '') + '</p>' +
    '<p style="color:#8a8a8a;font-size:12px;margin:0;">Open the app anytime: <a style="color:#E6C875;" href="https://www.amsterdamguestlistservice.website/app/">amsterdamguestlistservice.website/app</a></p>' +
    '</div>';
}
async function emailGuest(record, subject, heading, line) {
  try {
    var from = process.env.RESEND_GUEST_FROM;
    if (!from || !process.env.RESEND_API_KEY || !record.email) return false;
    var r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from, to: record.email, subject: subject, html: guestEmailHtml(heading, line, record) })
    });
    return r.ok;
  } catch (e) {
    return false;
  }
}

async function addPoints(supabase, userId, amount) {
  const { data: existing } = await supabase
    .from('profiles')
    .select('points')
    .eq('user_id', userId)
    .maybeSingle();

  const newTotal = Math.max(0, (existing ? existing.points : 0) + amount);

  await supabase
    .from('profiles')
    .upsert({ user_id: userId, points: newTotal, updated_at: new Date().toISOString() });

  return newTotal;
}

async function sendPush(supabase, userId, title, body) {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return 0;

  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', userId);

  if (!subs || !subs.length) return 0;

  webpush.setVapidDetails(
    'mailto:amsterdamguestlistservice@outlook.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const payload = JSON.stringify({ title: title, body: body, url: './index.html' });
  let pushed = 0;

  await Promise.all(subs.map(async function (sub) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      );
      pushed++;
    } catch (err) {
      if (err && (err.statusCode === 404 || err.statusCode === 410)) {
        await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
      }
    }
  }));

  return pushed;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = (req.headers['x-webhook-secret'] || '').trim();
  const expected = (process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const payload = req.body || {};
  const record = payload.record || {};
  const oldRecord = payload.old_record || {};

  const newStatus = String(record.status || '').trim().toLowerCase();
  const oldStatus = String(oldRecord.status || '').trim().toLowerCase();

  const justApproved = newStatus === 'approved' && oldStatus !== 'approved';
  const justMarkedNoShow = newStatus === 'no-show' && oldStatus !== 'no-show';

  if (!justApproved && !justMarkedNoShow) {
    res.status(200).json({ skipped: true });
    return;
  }

  if (!record.user_id) {
    res.status(200).json({ skipped: true, reason: 'No user_id on request' });
    return;
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // ---- No-show: deduct points, notify, done ----
    if (justMarkedNoShow) {
      const newPoints = await addPoints(supabase, record.user_id, -NO_SHOW_PENALTY);
      const pushed = await sendPush(
        supabase,
        record.user_id,
        'Amsterdam Guestlist Service',
        "You were marked as a no-show for " + (record.event_name || 'your event') +
          '. -' + NO_SHOW_PENALTY + ' points (total: ' + newPoints + ').'
      );
      res.status(200).json({ penalty: NO_SHOW_PENALTY, newPoints: newPoints, pushed: pushed });
      return;
    }

    // ---- Approved: award points + referral bonus (unchanged) ----
    const newPoints = await addPoints(supabase, record.user_id, POINTS_PER_APPROVAL);

    const pushed = await sendPush(
      supabase,
      record.user_id,
      'Amsterdam Guestlist Service',
      'Good news! Your request for ' + (record.event_name || 'your event') +
        " is approved \u2705 You're on the list. +" + POINTS_PER_APPROVAL + ' points (total: ' + newPoints + ').'
    );

    const guestEmailed = await emailGuest(
      record,
      "You're on the list — " + (record.event_name || 'your event'),
      'Your request is approved',
      "good news, your guestlist request is approved and you're on the list. See you there!"
    );

    // ---- Referral bonus: only on this guest's first-ever approval ----
    let referralBonusGiven = false;
    const { count: approvedCount } = await supabase
      .from('guestlist_requests')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', record.user_id)
      .eq('status', 'Approved');

    if (approvedCount === 1) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('referred_by')
        .eq('user_id', record.user_id)
        .maybeSingle();

      if (profile && profile.referred_by) {
        await addPoints(supabase, profile.referred_by, REFERRAL_BONUS_POINTS);
        referralBonusGiven = true;
        await sendPush(
          supabase,
          profile.referred_by,
          'Amsterdam Guestlist Service',
          'A friend you invited just got on the list! +' + REFERRAL_BONUS_POINTS + ' bonus points.'
        );
      }
    }

    res.status(200).json({
      awarded: POINTS_PER_APPROVAL,
      newPoints: newPoints,
      pushed: pushed,
      guestEmailed: guestEmailed,
      referralBonusGiven: referralBonusGiven
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
