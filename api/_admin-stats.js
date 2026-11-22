// api/_admin-stats.js — numbers for the in-app admin page (/api/admin-stats).
// Same access rule as the other admin endpoints (see _admin-auth.js).

const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');
const { loadEvents } = require('./_events');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const who = await isAdmin(req);
  if (!who.ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const dayStart = new Date(today + 'T00:00:00+01:00').toISOString();
    const weekStart = new Date(Date.now() - 7 * 864e5).toISOString();

    const [members, subs, reqs, lists, events, allReqs, referred] = await Promise.all([
      sb.from('profiles').select('user_id', { count: 'exact', head: true }),
      sb.from('push_subscriptions').select('endpoint, created_at'),
      sb.from('guestlist_requests').select('id, status, event_name, event_date, total_guests, created_at').gte('event_date', today),
      sb.from('event_guestlists').select('event_id, enabled, capacity, claimed_count, deadline').gte('deadline', new Date(Date.now() - 3 * 864e5).toISOString()), // last 3 days stay, to mark no-shows
      loadEvents(),
      sb.from('guestlist_requests').select('status, total_guests, event_name, event_date').range(0, 19999),
      sb.from('profiles').select('user_id', { count: 'exact', head: true }).not('referred_by', 'is', null)
    ]);

    // New accounts (auth admin API: newest first, enough for "today / 7 days").
    let signupsToday = 0, signupsWeek = 0, accountsTotal = 0, accountsMonth = 0;
    const ams = function (iso) { return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
    const days14 = [];
    for (let i = 13; i >= 0; i--) days14.push({ date: ams(Date.now() - i * 864e5), n: 0 });
    const monthKey = today.slice(0, 7);
    try {
      for (let page = 1; page <= 20; page++) {
        const { data } = await sb.auth.admin.listUsers({ page: page, perPage: 1000 });
        const users = (data && data.users) || [];
        users.forEach(function (u) {
          accountsTotal++;
          if (u.created_at >= dayStart) signupsToday++;
          if (u.created_at >= weekStart) signupsWeek++;
          const d = ams(u.created_at);
          if (d.slice(0, 7) === monthKey) accountsMonth++;
          const slot = days14.find(function (x) { return x.date === d; });
          if (slot) slot.n++;
        });
        if (users.length < 1000) break;
      }
    } catch (e) {}

    // All-time guestlist numbers
    const all = allReqs.data || [];
    const st = function (r) { return String(r.status || 'pending').trim().toLowerCase(); };
    let approvedReq = 0, approvedGuests = 0, noShows = 0, declined = 0;
    const topMap = {};
    all.forEach(function (r) {
      const x = st(r), g = Number(r.total_guests) || 1;
      if (x === 'approved') { approvedReq++; approvedGuests += g; topMap[r.event_name] = (topMap[r.event_name] || 0) + g; }
      else if (x === 'no-show') noShows++;
      else if (x === 'declined') declined++;
    });
    const topEvents = Object.keys(topMap).map(function (k) { return { name: k, guests: topMap[k] }; })
      .sort(function (a, b) { return b.guests - a.guests; }).slice(0, 5);

    const s = subs.data || [];
    const rows = reqs.data || [];
    const norm = function (x) { return String(x || 'pending').trim().toLowerCase(); };
    const byEvent = {};
    rows.forEach(function (r) {
      const k = r.event_name + '|' + r.event_date;
      const o = byEvent[k] || (byEvent[k] = { pending: 0, approved: 0, guests: 0 });
      if (norm(r.status) === 'pending') o.pending++;
      if (norm(r.status) === 'approved') { o.approved++; o.guests += Number(r.total_guests) || 1; }
    });
    const evById = {};
    (events || []).forEach(function (e) { evById[e.id] = e; });
    const upcoming = (lists.data || []).map(function (g) {
      const isAgeOk = /-ageok$/.test(g.event_id);
      const base = evById[isAgeOk ? g.event_id.replace(/-ageok$/, '') : g.event_id] || {};
      const ev = isAgeOk ? { name: (base.name || g.event_id) + ' (Age OK)', date: base.date, venue: base.venue } : base;
      const k = (ev.name || '') + '|' + (ev.date || '');
      const c = byEvent[k] || { pending: 0, approved: 0, guests: 0 };
      return { event_id: g.event_id, name: ev.name || g.event_id, date: ev.date || String(g.deadline).slice(0, 10), venue: ev.venue || '',
        enabled: g.enabled, capacity: g.capacity, claimed: g.claimed_count, pending: c.pending, approved: c.approved, guests: c.guests };
    }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; }).slice(0, 80);

    // Party ratings (1-5 stars) from guests the day after.
    let ratings = [];
    try {
      const { data: rt } = await sb.from('party_ratings').select('event_name, event_date, rating, comment, created_at').order('created_at', { ascending: false }).limit(1000);
      const by = {};
      (rt || []).forEach(function (r) {
        const k = r.event_name + '|' + r.event_date;
        const o = by[k] || (by[k] = { name: r.event_name, date: r.event_date, n: 0, sum: 0, comments: [] });
        o.n++; o.sum += r.rating;
        if (r.comment && o.comments.length < 5) o.comments.push({ rating: r.rating, text: r.comment });
      });
      ratings = Object.keys(by).map(function (k) { const o = by[k]; return { name: o.name, date: o.date, count: o.n, avg: Math.round(o.sum / o.n * 10) / 10, comments: o.comments }; })
        .sort(function (a, b) { return a.date < b.date ? 1 : -1; }).slice(0, 20);
    } catch (e) { ratings = []; }

    res.status(200).json({
      ok: true,
      ratings: ratings,
      email: who.email || null,
      members: members.count || 0,
      accountsTotal: accountsTotal || members.count || 0,
      accountsMonth: accountsMonth,
      signups14: days14,
      requestsTotal: all.length,
      approvedRequests: approvedReq,
      approvedGuests: approvedGuests,
      noShows: noShows,
      declined: declined,
      referred: referred.count || 0,
      topEvents: topEvents,
      signupsToday: signupsToday,
      signupsWeek: signupsWeek,
      pushIphone: s.filter(function (x) { return String(x.endpoint).indexOf('apns:') === 0; }).length,
      pushIphoneToday: s.filter(function (x) { return String(x.endpoint).indexOf('apns:') === 0 && x.created_at >= dayStart; }).length,
      pushWeb: s.filter(function (x) { return String(x.endpoint).indexOf('apns:') !== 0; }).length,
      pending: rows.filter(function (r) { return norm(r.status) === 'pending'; }).length,
      upcoming: upcoming
    });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed' });
  }
};
