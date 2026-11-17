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

    const [members, subs, reqs, lists, events] = await Promise.all([
      sb.from('profiles').select('user_id', { count: 'exact', head: true }),
      sb.from('push_subscriptions').select('endpoint, created_at'),
      sb.from('guestlist_requests').select('id, status, event_name, event_date, total_guests, created_at').gte('event_date', today),
      sb.from('event_guestlists').select('event_id, enabled, capacity, claimed_count, deadline').gte('deadline', new Date().toISOString()),
      loadEvents()
    ]);

    // New accounts (auth admin API: newest first, enough for "today / 7 days").
    let signupsToday = 0, signupsWeek = 0;
    try {
      const { data } = await sb.auth.admin.listUsers({ page: 1, perPage: 1000 });
      (data && data.users || []).forEach(function (u) {
        if (u.created_at >= dayStart) signupsToday++;
        if (u.created_at >= weekStart) signupsWeek++;
      });
    } catch (e) {}

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
      const ev = evById[g.event_id] || {};
      const k = (ev.name || '') + '|' + (ev.date || '');
      const c = byEvent[k] || { pending: 0, approved: 0, guests: 0 };
      return { event_id: g.event_id, name: ev.name || g.event_id, date: ev.date || String(g.deadline).slice(0, 10), venue: ev.venue || '',
        enabled: g.enabled, capacity: g.capacity, claimed: g.claimed_count, pending: c.pending, approved: c.approved, guests: c.guests };
    }).sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; }).slice(0, 14);

    res.status(200).json({
      ok: true,
      email: who.email || null,
      members: members.count || 0,
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
