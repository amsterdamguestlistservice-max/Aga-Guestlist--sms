// api/send-day-reminders.js
//
// Day-of reminder. Runs automatically via Vercel Cron (see vercel.json) on
// the afternoon and evening of every day. For every APPROVED guestlist
// request whose event is today (Europe/Amsterdam), it sends that guest:
//   - a personal push notification (if they have notifications on), and
//   - an email (only once RESEND_GUEST_FROM is set, same as other guest mails)
// Each request is marked with reminder_sent_at, so nobody gets it twice —
// the second run of the day only catches guests approved after the first.
//
// Goal: fewer no-shows. AGS is paid per guestlist check-in.
//
// Auth: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>". You can
// also trigger it by hand with ?key=<ADMIN_KEY> (add &dry=1 to only see
// who would get a reminder without sending anything).
//
// Environment variables: CRON_SECRET, ADMIN_KEY, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
// optional RESEND_API_KEY + RESEND_GUEST_FROM.

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

function isAuthorized(req) {
  const cron = process.env.CRON_SECRET;
  const auth = req.headers['authorization'] || '';
  if (cron && auth === 'Bearer ' + cron) return true;
  const admin = process.env.ADMIN_KEY;
  return !!(admin && req.query && req.query.key === admin);
}

function reminderText(r) {
  const extra = (r.total_guests || 1) - 1;
  const who = extra > 0 ? 'You + ' + extra + (extra === 1 ? ' guest are' : ' guests are') : "You're";
  return {
    title: 'Tonight: ' + r.event_name + ' 🔑',
    body: who + ' on the guestlist at ' + (r.event_venue || 'the venue').split(' · ')[0] +
      '. Arrive on time and bring your ID — see you tonight!'
  };
}

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

async function emailReminder(r, text) {
  try {
    const from = process.env.RESEND_GUEST_FROM;
    if (!from || !process.env.RESEND_API_KEY || !r.email) return false;
    const html =
      '<div style="background:#050505;color:#F5F5F5;padding:28px;font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">' +
      '<p style="color:#C9A24A;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">Amsterdam Guestlist Service</p>' +
      '<h2 style="font-family:Georgia,serif;font-weight:normal;font-size:22px;margin:0 0 12px;">See you tonight</h2>' +
      '<p style="color:#cfcfcf;line-height:1.6;margin:0 0 18px;">Hi ' + esc(r.first_name || 'there') + ', ' + esc(text.body) + '</p>' +
      '<p style="border:1px solid #3a3223;padding:14px;line-height:1.7;margin:0 0 18px;">' +
      '<strong>' + esc(r.event_name) + '</strong><br>' + esc(r.event_venue) +
      (r.total_guests > 1 ? '<br>Party size: ' + esc(r.total_guests) : '') + '</p>' +
      '<p style="color:#8a8a8a;font-size:12px;margin:0;">Can\'t make it anymore? Let us know so your spot can go to someone else.</p>' +
      '</div>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: from, to: r.email, subject: text.title, html: html })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function pushReminder(supabase, r, text) {
  if (!r.user_id || !process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return 0;
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', r.user_id);
  if (!subs || !subs.length) return 0;
  const payload = JSON.stringify({ title: text.title, body: text.body, url: './index.html' });
  let pushed = 0;
  await Promise.all(subs.map(async function (sub) {
    try {
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
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
  if (!isAuthorized(req)) {
    res.status(401).json({ ok: false, error: 'Unauthorized' });
    return;
  }
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res.status(500).json({ ok: false, error: 'Supabase env vars missing' });
    return;
  }
  const dryRun = req.query && (req.query.dry === '1' || req.query.dry === 'true');

  try {
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });

    const { data: rows, error } = await supabase
      .from('guestlist_requests')
      .select('id, user_id, first_name, email, event_name, event_venue, event_date, total_guests')
      .eq('status', 'Approved')
      .eq('event_date', today)
      .is('reminder_sent_at', null);
    if (error) {
      res.status(500).json({ ok: false, error: error.message });
      return;
    }

    if (dryRun) {
      res.status(200).json({ ok: true, dryRun: true, date: today, wouldRemind: (rows || []).length,
        guests: (rows || []).map(function (r) { return { event: r.event_name, first_name: r.first_name, party: r.total_guests }; }) });
      return;
    }

    let pushed = 0, emailed = 0, unreachable = 0;
    for (const r of rows || []) {
      const text = reminderText(r);
      const p = await pushReminder(supabase, r, text);
      const e = await emailReminder(r, text);
      if (p) pushed++;
      if (e) emailed++;
      if (!p && !e) unreachable++;
      // Mark as handled even if we couldn't reach them, so it never repeats.
      await supabase.from('guestlist_requests').update({ reminder_sent_at: new Date().toISOString() }).eq('id', r.id);
    }

    res.status(200).json({ ok: true, date: today, requests: (rows || []).length, pushed, emailed, unreachable });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
};
