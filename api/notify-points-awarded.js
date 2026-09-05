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
      "You're on the list for " + (record.event_name || 'your event') +
        '! +' + POINTS_PER_APPROVAL + ' points (total: ' + newPoints + ').'
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
      referralBonusGiven: referralBonusGiven
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
