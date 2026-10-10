// api/notify-new-request.js
//
// Called automatically by a Supabase Database Webhook whenever a new
// row is inserted into guestlist_requests (i.e. a guest just submitted
// a request). Emails you the details so you don't have to keep
// checking admin/requests.html.
//
// Required environment variables (same Vercel project as the others):
//   WEBHOOK_SECRET             — same one already used for the other
//                                 Database Webhooks
//   RESEND_API_KEY             — same one from section 6
//   NOTIFY_EMAIL_TO            — same one from section 6
//
// It also sends the guest a push notification confirming their request
// was received (needs SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
// VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY — same ones as
// notify-points-awarded.js; skipped quietly if any are missing).
//
// Uses Resend's plain HTTP API directly (no extra npm package needed —
// Vercel's Node runtime has fetch built in).

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');


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

async function pushToGuest(record) {
  if (!record.user_id) return 0;
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return 0;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', record.user_id);
  if (!subs || !subs.length) return 0;

  webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  const payload = JSON.stringify({
    title: 'Amsterdam Guestlist Service',
    body: 'Request received for ' + (record.event_name || 'your event') +
      '! We\'ll review it and let you know as soon as it\'s approved.',
    url: './index.html'
  });

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

  const record = (req.body || {}).record || {};

  try {
    const guestName = [record.first_name, record.last_name].filter(Boolean).join(' ') || 'A guest';
    const partySize = record.total_guests ? record.total_guests : 1;

    const html =
      '<h2>New guestlist request</h2>' +
      '<p><strong>Event:</strong> ' + escapeHtml(record.event_name) + '<br>' +
      '<strong>Venue:</strong> ' + escapeHtml(record.event_venue) + '<br>' +
      '<strong>Date:</strong> ' + escapeHtml(record.event_date) + '</p>' +
      '<p><strong>Guest:</strong> ' + escapeHtml(guestName) + (record.age ? ' (' + escapeHtml(record.age) + ')' : '') + '<br>' +
      (record.instagram ? '<strong>Instagram:</strong> ' + escapeHtml(record.instagram) + '<br>' : '') +
      (record.phone ? '<strong>Phone:</strong> ' + escapeHtml(record.phone) + '<br>' : '') +
      (record.email ? '<strong>Email:</strong> ' + escapeHtml(record.email) + '<br>' : '') +
      '<strong>Party size:</strong> ' + partySize + '</p>' +
      '<p><a href="https://amsterdamguestlistservice.website/admin/requests.html">Review it in the admin dashboard →</a></p>';

    // Confirmation push to the guest runs alongside the admin email and can
    // never block or break it.
    const guestPush = pushToGuest(record).catch(function () { return 0; });
    const guestMail = emailGuest(
      record,
      'We received your request — ' + (record.event_name || 'your event'),
      'Request received',
      "we've received your guestlist request. We'll review it and let you know as soon as it's approved."
    );

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Amsterdam Guestlist Service <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL_TO,
        subject: 'New guestlist request — ' + (record.event_name || 'an event'),
        html: html
      })
    });

    const pushed = await guestPush;
    const guestEmailed = await guestMail;

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      res.status(200).json({ warning: 'Email failed to send', detail: errBody, pushed: pushed, guestEmailed: guestEmailed });
      return;
    }

    res.status(200).json({ ok: true, pushed: pushed, guestEmailed: guestEmailed });
  } catch (err) {
    res.status(200).json({ warning: 'Email failed to send', detail: err.message || 'Unknown error' });
  }
};

function escapeHtml(str){
  if(str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, function(ch){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch];
  });
}
