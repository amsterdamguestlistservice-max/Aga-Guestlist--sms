// api/_concierge.js
//   /api/ags?fn=notify-concierge  (webhook) someone used the concierge -> admin push
//   /api/ags?fn=concierge-admin   (admin)   GET: recent sessions (+ who is in the concierge now)
//                                            GET ?chat=<user_id>: the live chat with one guest
//                                            POST {user_id, body}: Keurten writes in the guest's chat (take over)
//                                            POST {id, reply}: old one-off answer (also lands in the chat)
//   /api/ags?fn=notify-concierge-msg (webhook) guest wrote in the chat -> admin push
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


const KEURTEN = 'Keurten \u00b7 Founder of AGS';
// Keurten writes in a guest's concierge chat: stored, shown live in their app, and pushed.
async function keurtenSays(sb, userId, body) {
  const { error } = await sb.from('concierge_messages').insert({ user_id: userId, sender: 'keurten', body: body });
  if (error) throw new Error(error.message);
  try { await saveInbox(userId, { title: KEURTEN, body: body, url: './index.html?concierge=1' }); } catch (e) { /* inbox is a backup */ }
  let pushed = 0;
  // No push when they have the chat open right now: the message shows up live there.
  const { data: pres } = await sb.from('app_presence').select('screen, last_seen').eq('user_id', userId).order('last_seen', { ascending: false }).limit(1);
  const p0 = (pres || [])[0];
  if (p0 && p0.screen === 'concierge' && Date.now() - Date.parse(p0.last_seen) < 45000) return 0;
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    const { data: subs } = await sb.from('push_subscriptions').select('endpoint, p256dh, auth').eq('user_id', userId);
    const payload = JSON.stringify({ title: KEURTEN, body: body, url: './index.html?concierge=1', tag: 'ags-concierge' });
    for (const s of subs || []) { try { await sendPush(webpush, { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, payload); pushed++; } catch (e) { /* ignore */ } }
  }
  return pushed;
}

async function notifyMsg(req, res) {
  const secret = String(req.headers['x-webhook-secret'] || '').trim();
  const expected = String(process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const r = (req.body || {}).record || {};
  if (!r.user_id || r.sender !== 'guest') { res.status(200).json({ skipped: true }); return; }
  const sb = db();
  const who = await nameOf(sb, r.user_id);
  const sent = await pushToAdmins({ title: '\ud83d\udcac ' + who + ' \u00b7 concierge chat', body: String(r.body || '').slice(0, 160), url: '/app/index.html?admin=concierge&chat=' + r.user_id });
  res.status(200).json({ ok: true, sent: sent });
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
  const sent = await pushToAdmins({ title: (r.message ? '💬 Concierge question · ' : '🛎️ Concierge · ') + who, body: body, url: '/app/index.html?admin=concierge&cc=' + r.id });
  res.status(200).json({ ok: true, sent: sent });
}

async function admin(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const sb = db();
  if (req.method === 'POST') {
    const b = req.body || {};
    if (b.user_id) {
      const text = String(b.body || '').trim().slice(0, 600);
      if (!text) { res.status(400).json({ error: 'Write a message first' }); return; }
      try { const pushed = await keurtenSays(sb, b.user_id, text); res.status(200).json({ ok: true, pushed: pushed }); }
      catch (e) { res.status(500).json({ error: e.message }); }
      return;
    }
    const id = b.id, reply = String(b.reply || '').trim().slice(0, 600);
    if (!id || !reply) { res.status(400).json({ error: 'Write a reply first' }); return; }
    const { data: row, error } = await sb.from('concierge_requests').update({ reply: reply, replied_at: new Date().toISOString() }).eq('id', id).select('user_id').maybeSingle();
    if (error || !row) { res.status(500).json({ error: (error && error.message) || 'not found' }); return; }
    try { const pushed = await keurtenSays(sb, row.user_id, reply); res.status(200).json({ ok: true, pushed: pushed }); }
    catch (e) { res.status(500).json({ error: e.message }); }
    return;
  }
  const chatUser = String((req.query || {}).chat || '');
  if (chatUser) {
    const { data: msgs } = await sb.from('concierge_messages').select('id, sender, body, created_at, read_at').eq('user_id', chatUser).order('created_at', { ascending: true }).limit(200);
    const { data: pres } = await sb.from('app_presence').select('screen, last_seen').eq('user_id', chatUser).order('last_seen', { ascending: false }).limit(1);
    const p = (pres || [])[0];
    res.status(200).json({ name: await nameOf(sb, chatUser), messages: msgs || [], here: !!(p && p.screen === 'concierge' && Date.now() - Date.parse(p.last_seen) < 90000), online: !!(p && Date.now() - Date.parse(p.last_seen) < 150000) });
    return;
  }
  const { data: rows } = await sb.from('concierge_requests').select('id, user_id, answers, picks, chosen, message, reply, replied_at, created_at')
    .order('created_at', { ascending: false }).limit(80);
  const ids = Array.from(new Set((rows || []).map(function (r) { return r.user_id; })));
  const names = {}, contact = {};
  await Promise.all(ids.map(async function (u) { names[u] = await nameOf(sb, u); }));
  if (ids.length) {
    // Latest phone / Instagram from their guestlist requests, for one-tap WhatsApp or DM.
    const { data: reqs } = await sb.from('guestlist_requests').select('user_id, phone, instagram, created_at').in('user_id', ids).order('created_at', { ascending: true }).limit(2000);
    (reqs || []).forEach(function (q) {
      const c = contact[q.user_id] = contact[q.user_id] || {};
      if (q.phone) c.phone = q.phone;
      if (q.instagram && q.instagram !== 'None') c.ig = String(q.instagram).replace(/^@/, '');
    });
  }
  // Who has the concierge open right now, and every guest chat (last message, unread).
  const { data: pres } = await sb.from('app_presence').select('user_id, last_seen').eq('screen', 'concierge').gt('last_seen', new Date(Date.now() - 90000).toISOString()).not('user_id', 'is', null);
  const liveIds = Array.from(new Set((pres || []).map(function (p) { return p.user_id; })));
  const { data: msgs } = await sb.from('concierge_messages').select('user_id, sender, body, created_at, read_at').gt('created_at', new Date(Date.now() - 30 * 864e5).toISOString()).order('created_at', { ascending: true }).limit(2000);
  const chats = {};
  (msgs || []).forEach(function (m) {
    const c = chats[m.user_id] = chats[m.user_id] || { user_id: m.user_id, waiting: 0 };
    c.last = (m.sender === 'bot' ? 'Concierge: ' : m.sender === 'flow' ? 'Picked: ' : '') + m.body; c.last_sender = m.sender; c.last_at = m.created_at;
    if (m.sender === 'guest') c.waiting++; else if (m.sender === 'keurten') c.waiting = 0;
  });
  const extra = liveIds.concat(Object.keys(chats)).filter(function (u) { return !names[u]; });
  await Promise.all(Array.from(new Set(extra)).map(async function (u) { names[u] = await nameOf(sb, u); }));
  const live = liveIds.map(function (u) { return { user_id: u, name: names[u] }; });
  const chatList = Object.keys(chats).map(function (u) { return Object.assign(chats[u], { name: names[u], live: liveIds.indexOf(u) >= 0 }); })
    .sort(function (a, b) { return Date.parse(b.last_at) - Date.parse(a.last_at); });
  res.status(200).json({ live: live, chats: chatList, sessions: (rows || []).map(function (r) { return Object.assign({}, r, { name: names[r.user_id], summary: summary(r.answers), phone: (contact[r.user_id] || {}).phone || '', ig: (contact[r.user_id] || {}).ig || '' }); }) });
}

module.exports = { notify, notifyMsg, admin };
