// api/_drops.js — the drop (Mon, Wed, Fri 16:00).
//   /api/ags?fn=drops-admin (admin) GET: the coming drop days + today's claims
//                                   POST {date, kind, title, body, event_name, event_date, points, max_claims}: set a drop
//                                   POST {date, reset:true}: back to the automatic drop (only before anyone claimed)
// sendDropPush(supabase) is called by the 16:00 cron run on drop days.

const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');

function db() { return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); }
const ams = function (ms) { return new Date(ms).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
function isDropDay(iso) { const d = new Date(iso + 'T12:00:00Z').getUTCDay(); return d === 1 || d === 3 || d === 5; }
function startsAt(iso) {
  // 16:00 Amsterdam on that date (CET/CEST)
  const probe = new Date(iso + 'T15:00:00Z');
  const h = Number(probe.toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
  return new Date(Date.parse(iso + 'T16:00:00Z') - (h - 15) * 3600e3).toISOString();
}

async function admin(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const sb = db();
  if (req.method === 'POST') {
    const b = req.body || {};
    const date = String(b.date || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isDropDay(date) || date < ams(Date.now())) { res.status(400).json({ error: 'Pick a coming Monday, Wednesday or Friday' }); return; }
    const { data: existing } = await sb.from('drops').select('id').eq('drop_date', date).maybeSingle();
    let claims = 0;
    if (existing) { const { count } = await sb.from('drop_claims').select('user_id', { count: 'exact', head: true }).eq('drop_id', existing.id); claims = count || 0; }
    if (claims > 0) { res.status(400).json({ error: 'People already claimed this drop, it can’t be changed anymore' }); return; }
    if (b.reset) { if (existing) await sb.from('drops').delete().eq('id', existing.id); res.status(200).json({ ok: true }); return; }
    const kind = ['points', 'priority', 'plusone', 'custom'].indexOf(b.kind) >= 0 ? b.kind : 'custom';
    const row = {
      drop_date: date, kind: kind, title: String(b.title || '').trim().slice(0, 80), body: String(b.body || '').trim().slice(0, 200) || null,
      event_name: b.event_name || null, event_date: b.event_date || null,
      points: kind === 'points' ? Math.max(1, Math.min(100, Number(b.points) || 10)) : 0,
      max_claims: Math.max(1, Math.min(500, Number(b.max_claims) || 10)), starts_at: startsAt(date), auto: false
    };
    if (!row.title) { res.status(400).json({ error: 'Give the drop a title' }); return; }
    const { error } = await sb.from('drops').upsert(row, { onConflict: 'drop_date' });
    if (error) { res.status(500).json({ error: error.message }); return; }
    res.status(200).json({ ok: true });
    return;
  }
  // next 3 drop days (today included)
  const days = [];
  for (let i = 0; i < 9 && days.length < 3; i++) { const d = ams(Date.now() + i * 864e5); if (isDropDay(d)) days.push(d); }
  const { data: drops } = await sb.from('drops').select('*').in('drop_date', days);
  const ids = (drops || []).map(function (d) { return d.id; });
  const claims = {};
  if (ids.length) {
    const { data: cl } = await sb.from('drop_claims').select('drop_id, user_id, created_at').in('drop_id', ids).order('created_at', { ascending: true });
    const users = Array.from(new Set((cl || []).map(function (c) { return c.user_id; })));
    const names = {};
    await Promise.all(users.map(async function (u) {
      try { const { data } = await sb.auth.admin.getUserById(u); const m = (data && data.user && data.user.user_metadata) || {}; names[u] = [m.first_name, m.last_name].filter(Boolean).join(' ') || (data && data.user && data.user.email) || 'Guest'; } catch (e) { names[u] = 'Guest'; }
    }));
    (cl || []).forEach(function (c) { (claims[c.drop_id] = claims[c.drop_id] || []).push({ name: names[c.user_id], at: c.created_at }); });
  }
  res.status(200).json({ days: days.map(function (d) {
    const drop = (drops || []).find(function (x) { return x.drop_date === d; }) || null;
    return { date: d, drop: drop, claims: drop ? (claims[drop.id] || []) : [] };
  }) });
}

// 16:00 run on a drop day: make sure the drop exists and tell everyone once.
async function sendDropPush(supabase) {
  try {
    const today = ams(Date.now());
    if (!isDropDay(today)) return { skipped: 'no_drop_today' };
    const hour = Number(new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
    if (hour < 16) return { skipped: 'too_early' };
    await supabase.rpc('ags_auto_drop', { d: today });
    const { data: d } = await supabase.from('drops').select('*').eq('drop_date', today).maybeSingle();
    if (!d) return { skipped: 'no_drop' };
    if (d.pushed_at) return { skipped: 'already_sent' };
    const { count } = await supabase.from('drop_claims').select('user_id', { count: 'exact', head: true }).eq('drop_id', d.id);
    if ((count || 0) >= d.max_claims) return { skipped: 'sold_out' };
    await supabase.from('drops').update({ pushed_at: new Date().toISOString() }).eq('id', d.id);
    const { error } = await supabase.from('push_outbox').insert({
      title: 'Today’s drop is live 🎁', body: d.title + ' · only for the first ' + d.max_claims + '. Be quick.', url: './index.html', audience: 'all'
    });
    return error ? { error: error.message } : { queued: true, title: d.title };
  } catch (e) { return { error: e.message || 'failed' }; }
}

module.exports = { admin, sendDropPush };
