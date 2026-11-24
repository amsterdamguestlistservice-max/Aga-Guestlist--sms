// api/_concierge.js
//   /api/ags?fn=notify-concierge  (webhook) someone used the concierge -> admin push
//   /api/ags?fn=concierge-admin   (admin)   GET: recent sessions; POST {id, reply}: answer the guest
// The concierge in the app picks parties without AI. Every session (and any
// question a guest types) reaches the AGS team, who can answer personally.

const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');
const { isAdmin } = require('./_admin-auth');
const { pushToAdmins } = require('./_admin-push');
const { sendPush, saveInbox } = require('./_push');

function db() { return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); }
const WHEN = { tonight: 'Tonight', tomorrow: 'Tomorrow', weekend: 'This weekend', any: 'Any night' };
const SIZE = { 1: 'just me', 2: '2 people', 3: '3–4 people', 5: '5+ people' };

function summary(a) {
  a = a || {};
  return [WHEN[a.when] || '', (a.genres && a.genres.length) ? a.genres.join(', ') : 'any vibe', SIZE[a.size] || ''].filter(Boolean).join(' · ');
}
async function nameOf(sb, userId) {
  try {
    const { data } = await sb.auth.admin.getUserById(userId);
    const m = (data && data.user && data.user.user_metadata) || {};
    return [m.first_name, m.last_name].filter(Boolean).join(' ') || (data && data.user && data.user.email) || 'A guest';
  } catch (e) { return 'A guest'; }
}

async function notify(req, res) {
  const secret = String(req.headers['x-webhook-secret'] || '').trim();
  const expected = String(process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const r = (req.body || {}).record || {};
  if (!r.user_id) { res.status(200).json({ skipped: true }); return; }
  const sb = db();
  const who = await nameOf(sb, r.user_id);
  const picks = (r.picks || []).slice(0, 3).join(', ');
  const body = r.message
    ? '“' + String(r.message).slice(0, 160) + '”' + (r.answers && r.answers.when ? ' · ' + summary(r.answers) : '')
    : summary(r.answers) + (picks ? ' → ' + picks : ' → nothing matched');
  const sent = await pushToAdmins({ title: (r.message ? '💬 Concierge question · ' : '🛎️ Concierge · ') + who, body: body, url: '/app/index.html?admin=concierge' });
  res.status(200).json({ ok: true, sent: sent });
}

async function admin(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const sb = db();
  if (req.method === 'POST') {
    const id = (req.body || {}).id, reply = String((req.body || {}).reply || '').trim().slice(0, 600);
    if (!id || !reply) { res.status(400).json({ error: 'Write a reply first' }); return; }
    const { data: row, error } = await sb.from('concierge_requests').update({ reply: reply, replied_at: new Date().toISOString() }).eq('id', id).select('user_id').maybeSingle();
    if (error || !row) { res.status(500).json({ error: (error && error.message) || 'not found' }); return; }
    const title = 'AGS Concierge 🛎️';
    await saveInbox(row.user_id, { title: title, body: reply, url: './index.html' });
    let pushed = 0;
    if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
      const { data: subs } = await sb.from('push_subscriptions').select('endpoint, p256dh, auth').eq('user_id', row.user_id);
      const payload = JSON.stringify({ title: title, body: reply, url: './index.html' });
      for (const s of subs || []) { try { await sendPush(webpush, { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload); pushed++; } catch (e) { /* ignore */ } }
    }
    res.status(200).json({ ok: true, pushed: pushed });
    return;
  }
  const { data: rows } = await sb.from('concierge_requests').select('id, user_id, answers, picks, chosen, message, reply, replied_at, created_at')
    .order('created_at', { ascending: false }).limit(80);
  const ids = Array.from(new Set((rows || []).map(function (r) { return r.user_id; })));
  const names = {};
  await Promise.all(ids.map(async function (u) { names[u] = await nameOf(sb, u); }));
  res.status(200).json({ sessions: (rows || []).map(function (r) { return Object.assign({}, r, { name: names[r.user_id], summary: summary(r.answers) }); }) });
}

module.exports = { notify, admin };
