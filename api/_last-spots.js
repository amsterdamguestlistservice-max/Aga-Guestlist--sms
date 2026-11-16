// api/_last-spots.js
//
// "Last spots" push. When an event's guestlist is almost full (5 or fewer
// spots left on a list of 25), every member with notifications on who has
// NOT claimed a spot for that event gets one push: request now or grab a
// ticket. Sent at most once per event (event_guestlists.last_spots_push_at).
//
// Called from notify-new-request.js after each new request. Never throws.

const webpush = require('web-push');
const { sendPush: sendAnyPush } = require('./_push');
const { findEvent, loadEvents } = require('./_events');

function spotsThreshold(capacity) {
  return Math.max(3, Math.ceil(capacity * 0.2));
}

function shortDate(iso) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(String(iso).slice(0, 10) + 'T12:00:00Z');
  return days[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + months[d.getUTCMonth()];
}

async function maybeSendLastSpots(supabase, record) {
  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return { skipped: 'no_vapid' };
    const ev = await findEvent(record.event_name, record.event_date);
    if (!ev) return { skipped: 'event_not_found' };

    const { data: gl } = await supabase
      .from('event_guestlists')
      .select('event_id, enabled, capacity, claimed_count, deadline, last_spots_push_at')
      .eq('event_id', ev.id)
      .maybeSingle();
    if (!gl || !gl.enabled || gl.last_spots_push_at) return { skipped: 'not_eligible' };
    if (new Date(gl.deadline) <= new Date()) return { skipped: 'closed' };

    const left = (gl.capacity || 0) - (gl.claimed_count || 0);
    if (left <= 0 || left > spotsThreshold(gl.capacity || 0)) return { skipped: 'not_nearly_full', left: left };

    // Claim the "sent" flag first so two requests at once never double-send.
    const { data: marked } = await supabase
      .from('event_guestlists')
      .update({ last_spots_push_at: new Date().toISOString() })
      .eq('event_id', ev.id)
      .is('last_spots_push_at', null)
      .select('event_id');
    if (!marked || !marked.length) return { skipped: 'already_sent' };

    const { data: claims } = await supabase
      .from('guestlist_claims')
      .select('user_id')
      .eq('event_id', ev.id);
    const claimed = new Set((claims || []).map(function (c) { return c.user_id; }));

    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth, user_id');
    const targets = (subs || []).filter(function (s) { return !s.user_id || !claimed.has(s.user_id); });

    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    const payload = JSON.stringify({
      title: 'Last spots: ' + ev.name,
      body: 'Only ' + left + ' guestlist spot' + (left === 1 ? '' : 's') + ' left for ' + ev.name + ' on ' + shortDate(ev.date) +
        '. Request yours now' + (ev.ticketUrl ? ', or grab a ticket before they’re gone.' : '.'),
      url: './index.html?event=' + encodeURIComponent(ev.id)
    });

    let pushed = 0;
    await Promise.all(targets.map(async function (sub) {
      try {
        await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        pushed++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }));
    return { sent: true, left: left, pushed: pushed };
  } catch (e) {
    return { error: e.message || 'failed' };
  }
}

// "Tonight" push. Runs from the daily cron (16:00 Amsterdam). For every
// event TODAY whose guestlist still has free spots, members with
// notifications on who haven't claimed a spot tonight get ONE push (several
// events tonight are combined into one message). Once per event
// (event_guestlists.day_push_at).
async function sendTonightPush(supabase, opts) {
  opts = opts || {};
  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return { skipped: 'no_vapid' };
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const events = (await loadEvents()).filter(function (e) { return e.date === today; });
    if (!events.length) return { skipped: 'no_events_today' };

    const { data: lists } = await supabase
      .from('event_guestlists')
      .select('event_id, enabled, capacity, claimed_count, deadline, day_push_at')
      .in('event_id', events.map(function (e) { return e.id; }));
    const now = new Date();
    const open = (lists || []).filter(function (g) {
      return g.enabled && !g.day_push_at && new Date(g.deadline) > now && (g.capacity || 0) > (g.claimed_count || 0);
    });
    if (!open.length) return { skipped: 'nothing_open' };
    const tonight = open.map(function (g) {
      const ev = events.find(function (e) { return e.id === g.event_id; });
      return { ev: ev, left: g.capacity - g.claimed_count, deadline: g.deadline };
    }).filter(function (x) { return x.ev; });

    const closes = new Date(tonight[0].deadline).toLocaleTimeString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit' });
    const venue = function (ev) { return String(ev.venue || '').split(' · ')[0]; };
    let title, body, url;
    if (tonight.length === 1) {
      const t = tonight[0];
      title = 'Tonight: ' + t.ev.name + (venue(t.ev) ? ' at ' + venue(t.ev) : '');
      body = 'The guestlist is still open until ' + closes + ' — ' + t.left + ' spot' + (t.left === 1 ? '' : 's') + ' left. Request in one tap.';
      url = './index.html?event=' + encodeURIComponent(t.ev.id);
    } else {
      title = 'Tonight: ' + tonight.map(function (t) { return t.ev.name; }).join(' · ');
      body = 'Guestlists are still open until ' + closes + '. Request your spot in one tap.';
      url = './index.html';
    }

    const ids = tonight.map(function (t) { return t.ev.id; });
    const { data: claims } = await supabase.from('guestlist_claims').select('user_id').in('event_id', ids);
    const claimed = new Set((claims || []).map(function (c) { return c.user_id; }));
    const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth, user_id');
    const targets = (subs || []).filter(function (s) { return !s.user_id || !claimed.has(s.user_id); });

    if (opts.dryRun) return { dryRun: true, title: title, body: body, events: ids, recipients: targets.length };

    // Mark first so a second cron run the same day never repeats it.
    const { data: marked } = await supabase
      .from('event_guestlists')
      .update({ day_push_at: new Date().toISOString() })
      .in('event_id', ids)
      .is('day_push_at', null)
      .select('event_id');
    if (!marked || !marked.length) return { skipped: 'already_sent' };

    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    const payload = JSON.stringify({ title: title, body: body, url: url });
    let pushed = 0;
    await Promise.all(targets.map(async function (sub) {
      try {
        await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        pushed++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }));
    return { sent: true, events: ids, pushed: pushed };
  } catch (e) {
    return { error: e.message || 'failed' };
  }
}

module.exports = { maybeSendLastSpots, sendTonightPush, spotsThreshold };
