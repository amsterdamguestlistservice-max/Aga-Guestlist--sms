// api/send-day-reminders.js
//
// Day-of reminder (plus a 'Tomorrow' reminder on the evening run). Runs automatically via Vercel Cron (see vercel.json) on
// the afternoon and evening of every day. For every APPROVED guestlist
// request whose event is today (Europe/Amsterdam), it sends that guest:
//   - a personal push notification (if they have notifications on), and
//   - an email (only once RESEND_GUEST_FROM is set, same as other guest mails)
// Each request is marked with reminder_sent_at, so nobody gets it twice —
// the second run of the day only catches guests approved after the first.
//
// Goal: fewer no-shows. AGS is paid per guestlist check-in.
// It also sends the "Tonight" push (see _last-spots.js) to members without a
// spot when tonight's guestlists still have room.
//
// Auth: Vercel Cron sends "Authorization: Bearer <CRON_SECRET>". You can
// also trigger it by hand with ?key=<ADMIN_KEY> (add &dry=1 to only see
// who would get a reminder without sending anything).
//
// Environment variables: CRON_SECRET, ADMIN_KEY, SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY,
// optional RESEND_API_KEY + RESEND_GUEST_FROM.

const webpush = require('web-push');
const { sendPush: sendAnyPush, saveInbox } = require('./_push');
const { createClient } = require('@supabase/supabase-js');
const { sendGuestEmail } = require('./_guest-email');
const { notifyForEvent } = require('./waitlist-notify');
const { sendTonightPush, sendWeeklyPush, sendNewEventsPush, sendPlannerPush } = require('./_last-spots');

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

// The evening before: "Tomorrow" push, only on the evening run (Amsterdam
// time 18:00 or later), once per request (eve_reminder_sent_at).
function eveText(r) {
  const extra = (r.total_guests || 1) - 1;
  const who = extra > 0 ? 'You + ' + extra + (extra === 1 ? ' guest are' : ' guests are') : "You're";
  return {
    title: 'Tomorrow: ' + r.event_name + ' 🔑',
    body: who + ' on the guestlist at ' + (r.event_venue || 'the venue').split(' · ')[0] +
      '. Bring your ID and arrive on time. Can\'t make it? Cancel in the app so someone else gets your spot.'
  };
}

async function sendEveReminders(supabase, opts) {
  const now = new Date();
  const hour = Number(now.toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
  if (hour < 18 && !(opts && opts.force)) return { skipped: 'not_evening' };
  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
  const { data: rows, error } = await supabase
    .from('guestlist_requests')
    .select('id, user_id, event_name, event_venue, event_date, total_guests')
    .eq('status', 'Approved')
    .eq('event_date', tomorrow)
    .is('eve_reminder_sent_at', null);
  if (error) return { error: error.message };
  if (opts && opts.dryRun) return { date: tomorrow, wouldRemind: (rows || []).length };
  let pushed = 0;
  for (const r of rows || []) {
    if (await pushReminder(supabase, r, eveText(r))) pushed++;
    await supabase.from('guestlist_requests').update({ eve_reminder_sent_at: new Date().toISOString() }).eq('id', r.id);
  }
  return { date: tomorrow, requests: (rows || []).length, pushed: pushed };
}

// Evening before a party: guests who opened it in the app but never requested
// get one nudge, only while the guestlist is still open and not full.
async function sendStillThinking(supabase, opts) {
  const now = new Date();
  const hour = Number(now.toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
  if (hour < 18 && !(opts && opts.force)) return { skipped: 'not_evening' };
  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
  const { data: views, error } = await supabase.from('event_views')
    .select('user_id, event_id, event_name, event_date, venue').eq('event_date', tomorrow).is('nudge_sent_at', null);
  if (error) return { error: error.message };
  if (!views || !views.length) return { date: tomorrow, nudges: 0 };
  const ids = Array.from(new Set(views.map(function (v) { return v.event_id; })));
  const { data: lists } = await supabase.from('event_guestlists').select('event_id, capacity, claimed_count, deadline, enabled, members_only_until').in('event_id', ids);
  const open = {};
  (lists || []).forEach(function (g) {
    const left = (g.capacity || 0) - (g.claimed_count || 0);
    if (g.enabled !== false && left > 0 && (!g.deadline || new Date(g.deadline) > now) && !(g.members_only_until && new Date(g.members_only_until) > now)) open[g.event_id] = left;
  });
  const { data: reqs } = await supabase.from('guestlist_requests').select('user_id, event_name').eq('event_date', tomorrow);
  const has = new Set((reqs || []).map(function (r) { return r.user_id + '|' + r.event_name; }));
  const todo = views.filter(function (v) { return open[v.event_id] && !has.has(v.user_id + '|' + v.event_name); });
  if (opts && opts.dryRun) return { date: tomorrow, wouldNudge: todo.length };
  let pushed = 0;
  for (const v of todo) {
    const left = open[v.event_id];
    const text = {
      title: 'Still thinking about ' + v.event_name + '? 🔑',
      body: 'Tomorrow' + (v.venue ? ' at ' + v.venue : '') + '. ' + (left <= 10 ? 'Only ' + left + ' spots left' : 'Spots still open') + ' on the guestlist. One tap and you\'re on.'
    };
    if (await pushReminder(supabase, v, text, './index.html?event=' + encodeURIComponent(v.event_id))) pushed++;
  }
  // Mark every view for tomorrow, so nobody is nudged twice (also when skipped).
  await supabase.from('event_views').update({ nudge_sent_at: new Date().toISOString() }).eq('event_date', tomorrow).is('nudge_sent_at', null);
  return { date: tomorrow, candidates: todo.length, pushed: pushed };
}

// Afternoon after a party: "How was <party>? Rate your night" to guests who
// were approved for it (once per request; skipped if they already rated).
async function sendRatePushes(supabase, opts) {
  const now = new Date();
  const hour = Number(now.toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
  if ((hour < 12 || hour >= 18) && !(opts && opts.force)) return { skipped: 'not_afternoon' };
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
  const { data: rows, error } = await supabase
    .from('guestlist_requests')
    .select('id, user_id, event_name, event_date')
    .eq('status', 'Approved')
    .eq('event_date', yesterday)
    .is('rate_push_sent_at', null);
  if (error) return { error: error.message };
  const { data: rated } = await supabase.from('party_ratings').select('user_id, event_name').eq('event_date', yesterday);
  const done = new Set((rated || []).map(function (x) { return x.user_id + '|' + x.event_name; }));
  const seen = new Set();
  const todo = (rows || []).filter(function (r) {
    const k = r.user_id + '|' + r.event_name;
    if (!r.user_id || done.has(k) || seen.has(k)) return false;
    seen.add(k); return true;
  });
  if (opts && opts.dryRun) return { date: yesterday, wouldPush: todo.length };
  let pushed = 0;
  for (const r of todo) {
    if (await pushReminder(supabase, r, { title: 'How was ' + r.event_name + '? ⭐', body: 'Rate your night in 5 seconds. It helps us pick the best parties for you.' }, './index.html?rate=1')) pushed++;
  }
  const ids = (rows || []).map(function (r) { return r.id; });
  if (ids.length) await supabase.from('guestlist_requests').update({ rate_push_sent_at: new Date().toISOString() }).in('id', ids);
  return { date: yesterday, requests: (rows || []).length, pushed: pushed };
}

async function pushReminder(supabase, r, text, url) {
  if (r.user_id) await saveInbox(r.user_id, { title: text.title, body: text.body, url: url || './index.html' });
  if (!r.user_id || !process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return 0;
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', r.user_id);
  if (!subs || !subs.length) return 0;
  const payload = JSON.stringify({ title: text.title, body: text.body, url: url || './index.html' });
  let pushed = 0;
  await Promise.all(subs.map(async function (sub) {
    try {
      await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
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
      .select('id, user_id, first_name, last_name, email, event_name, event_venue, event_date, total_guests')
      .eq('status', 'Approved')
      .eq('event_date', today)
      .is('reminder_sent_at', null);
    if (error) {
      res.status(500).json({ ok: false, error: error.message });
      return;
    }

    if (dryRun) {
      const tonightPush = await sendTonightPush(supabase, { dryRun: true });
      const weeklyPush = await sendWeeklyPush(supabase, { dryRun: true, force: true });
      const newEventsPush = await sendNewEventsPush(supabase, { dryRun: true });
      const eveReminders = await sendEveReminders(supabase, { dryRun: true, force: true });
      const ratePushes = await sendRatePushes(supabase, { dryRun: true, force: true });
      const stillThinking = await sendStillThinking(supabase, { dryRun: true, force: true });
      res.status(200).json({ ok: true, dryRun: true, date: today, tonightPush: tonightPush, weeklyPush: weeklyPush, newEventsPush: newEventsPush, eveReminders: eveReminders, ratePushes: ratePushes, stillThinking: stillThinking, wouldRemind: (rows || []).length,
        guests: (rows || []).map(function (r) { return { event: r.event_name, first_name: r.first_name, party: r.total_guests }; }) });
      return;
    }

    let pushed = 0, emailed = 0, unreachable = 0;
    for (const r of rows || []) {
      const text = reminderText(r);
      const p = await pushReminder(supabase, r, text);
      const e = await sendGuestEmail('reminder', r);
      if (p) pushed++;
      if (e) emailed++;
      if (!p && !e) unreachable++;
      // Mark as handled even if we couldn't reach them, so it never repeats.
      await supabase.from('guestlist_requests').update({ reminder_sent_at: new Date().toISOString() }).eq('id', r.id);
    }

    // Safety net: offer any free spots to people on a waitlist.
    let waitlistNotified = 0;
    try {
      const { data: wl } = await supabase.from('guestlist_waitlist').select('event_id').is('notified_at', null);
      const ids = Array.from(new Set((wl || []).map(function (w) { return w.event_id; })));
      for (const id of ids) waitlistNotified += await notifyForEvent(supabase, id);
    } catch (e) { /* ignore */ }

    // Guestlists still open tonight? One push to members without a spot.
    const tonightPush = await sendTonightPush(supabase);
    // Tuesdays: "this week" push with the parties up to Sunday.
    const weeklyPush = await sendWeeklyPush(supabase);
    // New parties added since the last run.
    const newEventsPush = await sendNewEventsPush(supabase);
    // Thursday evening: "Plan your weekend".
    let plannerPush = null;
    try { plannerPush = await sendPlannerPush(supabase); } catch (e) { plannerPush = { error: String(e && e.message || e) }; }
    // Evening run: "Tomorrow" reminder for guests approved for tomorrow.
    let eveReminders = null;
    try { eveReminders = await sendEveReminders(supabase); } catch (e) { eveReminders = { error: String(e && e.message || e) }; }
    // Afternoon run: "Rate your night" for yesterday's guests.
    let ratePushes = null;
    try { ratePushes = await sendRatePushes(supabase); } catch (e) { ratePushes = { error: String(e && e.message || e) }; }
    // Evening run: one nudge for people who looked at tomorrow's party but didn't request.
    let stillThinking = null;
    // Thursday: the "Plan your weekend" push already asks everyone, so no second nudge.
    if (plannerPush && (plannerPush.queued || plannerPush.skipped === 'already_sent')) stillThinking = { skipped: 'planner_push_today' };
    else { try { stillThinking = await sendStillThinking(supabase); } catch (e) { stillThinking = { error: String(e && e.message || e) }; } }

    res.status(200).json({ ok: true, date: today, requests: (rows || []).length, pushed, emailed, unreachable, waitlistNotified, tonightPush, weeklyPush, newEventsPush, plannerPush, eveReminders, ratePushes, stillThinking });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err && err.message || err) });
  }
};
