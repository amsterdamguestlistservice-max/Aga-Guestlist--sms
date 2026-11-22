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

// Early access: before ev.publicFrom only members (Silver+, 50 points) may see a
// party, so public pushes skip it until then.
function isPublicNow(e) { return !e.secret && !(e.publicFrom && Date.now() < Date.parse(e.publicFrom)); }
async function memberUserIds(supabase) {
  const ids = new Set();
  const { data: rich } = await supabase.from('profiles').select('user_id').gte('points', 50);
  (rich || []).forEach(function (r) { ids.add(r.user_id); });
  const { data: extra } = await supabase.from('member_overrides').select('user_id');
  (extra || []).forEach(function (r) { ids.add(r.user_id); });
  return ids;
}

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
    const events = (await loadEvents()).filter(function (e) { return e.date === today && isPublicNow(e); });
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

// Weekly push, every Tuesday at 20:00 Amsterdam (evening cron run): the
// parties from tomorrow until Sunday, to everyone with notifications on.
// Sent once per Tuesday (app_flags key "weekly_push" = date it went out).
async function sendWeeklyPush(supabase, opts) {
  opts = opts || {};
  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return { skipped: 'no_vapid' };
    const fmt = function (ms) { return new Date(ms).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
    const today = fmt(Date.now());
    const weekday = new Date().toLocaleDateString('en-GB', { timeZone: 'Europe/Amsterdam', weekday: 'long' });
    if (weekday !== 'Tuesday' && !opts.force) return { skipped: 'not_tuesday' };
    // Only from the evening cron run (20:00 Amsterdam in winter).
    const hour = Number(new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
    if (hour < 19 && !opts.force) return { skipped: 'too_early' };
    const from = fmt(Date.now() + 864e5), to = fmt(Date.now() + 5 * 864e5); // Wed .. Sun
    const events = (await loadEvents()).filter(function (e) { return e.date >= from && e.date <= to && isPublicNow(e); })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    if (!events.length) return { skipped: 'no_events_this_week' };

    const dayName = function (iso) { return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }); };
    const byDay = [];
    events.forEach(function (e) {
      const d = dayName(e.date); const last = byDay[byDay.length - 1];
      if (last && last.d === d) last.n.push(e.name); else byDay.push({ d: d, n: [e.name] });
    });
    const title = 'This week in Amsterdam 🔑';
    const body = byDay.map(function (x) { return x.d + ': ' + x.n.join(', '); }).join(' · ') + '. Get on the guestlist in one tap.';

    const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth, user_id');
    if (opts.dryRun) return { dryRun: true, title: title, body: body, recipients: (subs || []).length };

    const { data: flag } = await supabase.from('app_flags').select('value').eq('key', 'weekly_push').maybeSingle();
    if (flag && flag.value === today) return { skipped: 'already_sent' };
    await supabase.from('app_flags').upsert({ key: 'weekly_push', value: today, updated_at: new Date().toISOString() });

    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    const payload = JSON.stringify({ title: title, body: body, url: './index.html' });
    let pushed = 0;
    await Promise.all((subs || []).map(async function (sub) {
      try {
        await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        pushed++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }));
    return { sent: true, events: events.length, pushed: pushed };
  } catch (e) {
    return { error: e.message || 'failed' };
  }
}

// "New party" push. Compares the events in the app with the list we've
// already announced (app_flags "known_events"). New upcoming events get one
// push to everyone with notifications on. Runs from the daily cron (16:00 and
// 20:00 Amsterdam) and from the admin dashboard button ("announce now").
// The very first run only remembers the current events, it sends nothing.
async function sendNewEventsPush(supabase, opts) {
  opts = opts || {};
  try {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return { skipped: 'no_vapid' };
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const allEvents = await loadEvents();
    if (!allEvents || !allEvents.length) return { skipped: 'no_events_loaded' };
    // Members hear about early-access parties first (once per party).
    const early = opts.dryRun ? null : await announceEarlyToMembers(supabase, allEvents.filter(function (e) { return !isPublicNow(e) && e.date >= today; }));
    // Parties still in their members-only window are announced to everyone once they go public.
    const events = allEvents.filter(isPublicNow);
    const ids = events.map(function (e) { return e.id; });

    const { data: flag } = await supabase.from('app_flags').select('value').eq('key', 'known_events').maybeSingle();
    let known = null;
    try { known = flag && flag.value ? JSON.parse(flag.value) : null; } catch (e) { known = null; }
    const save = function (list) {
      return supabase.from('app_flags').upsert({ key: 'known_events', value: JSON.stringify(list), updated_at: new Date().toISOString() });
    };
    if (!Array.isArray(known)) { if (!opts.dryRun) await save(ids); return { initialised: ids.length }; }

    const knownSet = new Set(known);
    const fresh = events.filter(function (e) { return !knownSet.has(e.id) && e.date >= today; })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    if (!fresh.length) { if (!opts.dryRun) await save(Array.from(new Set(known.concat(ids)))); return { skipped: 'nothing_new' }; }

    const venue = function (ev) { return String(ev.venue || '').split(' · ')[0]; };
    let title, body, url;
    if (fresh.length === 1) {
      const ev = fresh[0];
      title = 'New: ' + ev.name + ' 🔑';
      body = shortDate(ev.date) + (venue(ev) ? ' at ' + venue(ev) : '') + '. Get on the guestlist in one tap.';
      url = './index.html?event=' + encodeURIComponent(ev.id);
    } else {
      title = fresh.length + ' new parties on AGS 🔑';
      body = fresh.slice(0, 4).map(function (ev) { return ev.name + ' (' + shortDate(ev.date) + ')'; }).join(' · ') +
        (fresh.length > 4 ? ' and more' : '') + '. Get on the guestlist in one tap.';
      url = './index.html';
    }

    const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth, user_id');
    if (opts.dryRun) return { dryRun: true, title: title, body: body, events: fresh.map(function (e) { return e.id; }), recipients: (subs || []).length };

    // Remember first so a parallel run never announces twice.
    await save(Array.from(new Set(known.concat(ids))));

    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    const payload = JSON.stringify({ title: title, body: body, url: url });
    let pushed = 0;
    await Promise.all((subs || []).map(async function (sub) {
      try {
        await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload);
        pushed++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }));
    return { sent: true, events: fresh.map(function (e) { return e.id; }), pushed: pushed, early: early };
  } catch (e) {
    return { error: e.message || 'failed' };
  }
}

async function announceEarlyToMembers(supabase, earlyEvents) {
  try {
    if (!earlyEvents.length) return { skipped: 'none' };
    const { data: flag } = await supabase.from('app_flags').select('value').eq('key', 'known_early_events').maybeSingle();
    let known = [];
    try { known = flag && flag.value ? JSON.parse(flag.value) : []; } catch (e) { known = []; }
    const fresh = earlyEvents.filter(function (e) { return known.indexOf(e.id) < 0; });
    if (!fresh.length) return { skipped: 'nothing_new' };
    await supabase.from('app_flags').upsert({ key: 'known_early_events', value: JSON.stringify(known.concat(fresh.map(function (e) { return e.id; }))), updated_at: new Date().toISOString() });
    const members = await memberUserIds(supabase);
    const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth, user_id');
    const mine = (subs || []).filter(function (s) { return s.user_id && members.has(s.user_id); });
    const ev = fresh[0];
    const venue = String(ev.venue || '').split(' · ')[0];
    const payload = JSON.stringify(fresh.length === 1 ? {
      title: 'Early access: ' + ev.name + ' ⚡',
      body: shortDate(ev.date) + (venue ? ' at ' + venue : '') + '. Members see it 48 hours before everyone else. Get on the list first.',
      url: './index.html?event=' + encodeURIComponent(ev.id)
    } : {
      title: fresh.length + ' new parties, early access ⚡',
      body: fresh.slice(0, 4).map(function (e) { return e.name + ' (' + shortDate(e.date) + ')'; }).join(' · ') + '. Members see them 48 hours early.',
      url: './index.html'
    });
    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    let pushed = 0;
    await Promise.all(mine.map(async function (sub) {
      try { await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, payload); pushed++; } catch (e) { /* ignore */ }
    }));
    return { events: fresh.map(function (e) { return e.id; }), pushed: pushed };
  } catch (e) {
    return { error: e.message || 'failed' };
  }
}

module.exports = { maybeSendLastSpots, sendTonightPush, sendWeeklyPush, sendNewEventsPush, spotsThreshold };
