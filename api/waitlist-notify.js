// api/waitlist-notify.js
//
// POST { event_id }  — called right after a guestlist spot is released
// (in-app "Release your spot" and the email cancel link), and swept by the
// daily cron. For every free spot it notifies the next person on that
// event's waitlist (push + email): "A spot just opened up — claim it".
//
// Safe to call publicly: it returns no personal data, only acts when a
// spot is genuinely free, never notifies the same person twice
// (notified_at), and holds a spot for people notified in the last 2 hours
// so one free spot doesn't alert the whole waitlist at once.

const webpush = require('web-push');
const { sendPush: sendAnyPush } = require('./_push');
const { createClient } = require('@supabase/supabase-js');
const { sendGuestEmail } = require('./_guest-email');

const HOLD_MS = 2 * 60 * 60 * 1000;

async function pushTo(supabase, userId, title, body) {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return 0;
  const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth').eq('user_id', userId);
  if (!subs || !subs.length) return 0;
  webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  const payload = JSON.stringify({ title: title, body: body, url: './index.html' });
  let n = 0;
  await Promise.all(subs.map(async function (s) {
    try { await sendAnyPush(webpush, { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload); n++; }
    catch (err) { if (err && (err.statusCode === 404 || err.statusCode === 410)) await supabase.from('push_subscriptions').delete().eq('endpoint', s.endpoint); }
  }));
  return n;
}

async function notifyForEvent(supabase, eventId) {
  const { data: gl } = await supabase.from('event_guestlists').select('*').eq('event_id', eventId).maybeSingle();
  if (!gl || !gl.enabled || new Date(gl.deadline).getTime() <= Date.now()) return 0;
  const free = gl.capacity - gl.claimed_count;
  if (free <= 0) return 0;

  const { data: rows } = await supabase.from('guestlist_waitlist')
    .select('id, user_id, event_name, created_at, notified_at').eq('event_id', eventId).order('created_at', { ascending: true });
  if (!rows || !rows.length) return 0;
  const { data: claims } = await supabase.from('guestlist_claims').select('user_id').eq('event_id', eventId);
  const claimed = new Set((claims || []).map(function (c) { return c.user_id; }));

  const recentHolds = rows.filter(function (r) {
    return r.notified_at && !claimed.has(r.user_id) && Date.now() - new Date(r.notified_at).getTime() < HOLD_MS;
  }).length;
  let toNotify = Math.max(0, free - recentHolds);
  if (!toNotify) return 0;

  let sent = 0;
  for (const r of rows) {
    if (!toNotify) break;
    if (r.notified_at || claimed.has(r.user_id)) continue;
    // Mark first, so parallel calls can't double-notify.
    const { data: marked } = await supabase.from('guestlist_waitlist')
      .update({ notified_at: new Date().toISOString() }).eq('id', r.id).is('notified_at', null).select('id');
    if (!marked || !marked.length) continue;
    toNotify--; sent++;

    const name = r.event_name || 'your night';
    await pushTo(supabase, r.user_id, 'A spot just opened up 🔑', name + ': a guestlist spot is free. Open the app and claim it before someone else does.');
    try {
      const { data: u } = await supabase.auth.admin.getUserById(r.user_id);
      const user = u && u.user;
      const m = eventId.match(/(\d{4}-\d{2}-\d{2})$/);
      const date = m ? m[1] : String(gl.deadline).slice(0, 10);
      if (user && user.email) {
        await sendGuestEmail('waitlist', {
          email: user.email,
          first_name: (user.user_metadata && user.user_metadata.first_name) || '',
          last_name: (user.user_metadata && user.user_metadata.last_name) || '',
          event_name: r.event_name, event_venue: '', event_date: date, total_guests: 1
        });
      }
    } catch (e) { /* email is a bonus */ }
  }
  return sent;
}

module.exports = async function handler(req, res) {
  if (require('./_cors')(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  const eventId = String((req.body && req.body.event_id) || '').slice(0, 120);
  if (!/^[a-z0-9-]+$/i.test(eventId)) { res.status(400).json({ ok: false }); return; }
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const sent = await notifyForEvent(supabase, eventId);
    res.status(200).json({ ok: true, notified: sent });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
};
module.exports.notifyForEvent = notifyForEvent;
