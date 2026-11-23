// api/_outfits.js
//   /api/ags?fn=outfit-admin   (admin)   GET: outfits waiting + this week's top
//                                        POST {id, status:'approved'|'rejected'}
//   /api/ags?fn=notify-outfit  (webhook) new outfit posted -> admin push
// Members post outfit photos; nothing is public until an admin approves it.

const { createClient } = require('@supabase/supabase-js');
const webpush = require('web-push');
const { isAdmin } = require('./_admin-auth');
const { pushToAdmins } = require('./_admin-push');
const { sendPush, saveInbox } = require('./_push');

function db() { return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); }

async function pushUser(supabase, userId, title, body) {
  await saveInbox(userId, { title: title, body: body, url: './index.html?outfits=1' });
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return 0;
  webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  const { data: subs } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth').eq('user_id', userId);
  const payload = JSON.stringify({ title: title, body: body, url: './index.html?outfits=1' });
  let n = 0;
  for (const s of subs || []) { try { await sendPush(webpush, { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload); n++; } catch (e) { /* ignore */ } }
  return n;
}

async function admin(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const who = await isAdmin(req);
  if (!who.ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const supabase = db();
  if (req.method === 'POST') {
    const { id, status } = req.body || {};
    if (!id || ['approved', 'rejected'].indexOf(status) < 0) { res.status(400).json({ error: 'bad input' }); return; }
    const { data: row, error } = await supabase.from('outfits')
      .update({ status: status, approved_at: status === 'approved' ? new Date().toISOString() : null })
      .eq('id', id).select('user_id').maybeSingle();
    if (error || !row) { res.status(500).json({ error: (error && error.message) || 'not found' }); return; }
    if (status === 'approved') {
      try { await pushUser(supabase, row.user_id, 'Your outfit is live 🔥', 'It\'s on the Outfit check wall now. The most 🔥 this week gets featured on AGS Instagram.'); } catch (e) { /* optional */ }
    }
    res.status(200).json({ ok: true });
    return;
  }
  const weekStart = new Date(Date.now() - 7 * 864e5).toISOString();
  const [{ data: pending }, { data: approved }] = await Promise.all([
    supabase.from('outfits').select('id, user_id, image_url, caption, created_at').eq('status', 'pending').order('created_at', { ascending: true }).limit(60),
    supabase.from('outfits').select('id, user_id, image_url, caption, approved_at').eq('status', 'approved').gte('approved_at', weekStart).limit(300)
  ]);
  const ids = (approved || []).map(function (o) { return o.id; });
  const fires = {};
  if (ids.length) {
    const { data: votes } = await supabase.from('outfit_votes').select('outfit_id').in('outfit_id', ids);
    (votes || []).forEach(function (v) { fires[v.outfit_id] = (fires[v.outfit_id] || 0) + 1; });
  }
  const users = Array.from(new Set((pending || []).concat(approved || []).map(function (o) { return o.user_id; })));
  const names = {};
  if (users.length) {
    const { data: mp } = await supabase.from('member_profiles').select('user_id, display_name, instagram').in('user_id', users);
    (mp || []).forEach(function (m) { names[m.user_id] = { name: m.display_name, ig: m.instagram }; });
  }
  const tag = function (o) { const n = names[o.user_id] || {}; return Object.assign({}, o, { name: n.name || 'Member', instagram: n.ig || '' }); };
  res.status(200).json({
    pending: (pending || []).map(tag),
    top: (approved || []).map(function (o) { return Object.assign(tag(o), { fires: fires[o.id] || 0 }); })
      .sort(function (a, b) { return b.fires - a.fires; }).slice(0, 10)
  });
}

async function notify(req, res) {
  const secret = (req.headers['x-webhook-secret'] || '').trim();
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET.trim()) { res.status(401).json({ ok: false }); return; }
  const r = (req.body && req.body.record) || {};
  if (!r.id) { res.status(200).json({ skipped: true }); return; }
  let name = 'A member';
  try { const { data } = await db().from('member_profiles').select('display_name').eq('user_id', r.user_id).maybeSingle(); if (data && data.display_name) name = data.display_name; } catch (e) { /* optional */ }
  const pushed = await pushToAdmins({ title: '👗 New outfit to review', body: name + ' posted an outfit' + (r.caption ? ': "' + String(r.caption).slice(0, 60) + '"' : '') + '. Approve it in your dashboard.', url: '/admin/' });
  res.status(200).json({ ok: true, pushed: pushed });
}

module.exports = { admin: admin, notify: notify };
