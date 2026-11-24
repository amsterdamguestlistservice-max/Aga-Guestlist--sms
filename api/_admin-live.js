// api/_admin-live.js — who is in the app right now (/api/ags?fn=admin-live, admins only).
// The app pings ping_presence() every minute while it's on screen.
const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const since2 = new Date(Date.now() - 2.5 * 60e3).toISOString();
    const since60 = new Date(Date.now() - 60 * 60e3).toISOString();
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const [now, hour, day] = await Promise.all([
      sb.from('app_presence').select('visitor, user_id, last_seen, screen').gte('last_seen', since2).order('last_seen', { ascending: false }).limit(1000),
      sb.from('app_presence').select('visitor', { count: 'exact', head: true }).gte('last_seen', since60),
      sb.from('daily_actives').select('visitor, user_id').eq('day', today).limit(20000)
    ]);
    const rows = now.data || [];
    const ids = Array.from(new Set(rows.map(function (r) { return r.user_id; }).filter(Boolean)));
    const names = {};
    await Promise.all(ids.map(async function (u) {
      try { const { data } = await sb.auth.admin.getUserById(u); const m = (data && data.user && data.user.user_metadata) || {}; names[u] = [m.first_name, m.last_name].filter(Boolean).join(' ') || (data && data.user && data.user.email) || 'Member'; } catch (e) { names[u] = 'Member'; }
    }));
    const screens = {};
    rows.forEach(function (r) { const k = r.screen || 'app'; screens[k] = (screens[k] || 0) + 1; });
    const d = day.data || [];
    res.status(200).json({
      now: rows.length,
      nowMembers: ids.length,
      people: ids.map(function (u) { const r = rows.find(function (x) { return x.user_id === u; }); return { name: names[u], screen: r && r.screen }; }),
      screens: screens,
      lastHour: hour.count || 0,
      today: d.length,
      todayMembers: new Set(d.map(function (x) { return x.user_id; }).filter(Boolean)).size
    });
  } catch (e) { res.status(500).json({ error: e.message || 'failed' }); }
};
