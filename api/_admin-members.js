// api/_admin-members.js — every account for the in-app admin page
// (/api/ags?fn=admin-members). Admins only (see _admin-auth.js).
// One row per account: member number, name, email, joined, points/tier,
// verified guest, requests, no-shows, notifications on, last Instagram/phone.

const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!(await isAdmin(req)).ok) { res.status(401).json({ error: 'Unauthorized' }); return; }
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    // POST {creator: {user_id, on, handle}}: give or remove the Creator label.
    if (req.method === 'POST') {
      const c = (req.body || {}).creator || {};
      if (!c.user_id) { res.status(400).json({ error: 'user_id missing' }); return; }
      if (c.on) {
        const handle = String(c.handle || '').trim().replace(/^@/, '').slice(0, 60) || null;
        const { error } = await sb.from('creators').upsert({ user_id: c.user_id, handle: handle });
        if (error) throw new Error(error.message);
      } else {
        const { error } = await sb.from('creators').delete().eq('user_id', c.user_id);
        if (error) throw new Error(error.message);
      }
      res.status(200).json({ ok: true });
      return;
    }
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const users = [];
    for (let page = 1; page <= 20; page++) {
      const { data } = await sb.auth.admin.listUsers({ page: page, perPage: 1000 });
      const list = (data && data.users) || [];
      users.push.apply(users, list);
      if (list.length < 1000) break;
    }
    const [profiles, numbers, reqs, subs, creators, bdays] = await Promise.all([
      sb.from('profiles').select('user_id, points, referred_by').range(0, 19999),
      sb.from('member_numbers').select('user_id, member_no').range(0, 19999),
      sb.from('guestlist_requests').select('user_id, status, event_date, instagram, phone, created_at').not('user_id', 'is', null).order('created_at', { ascending: true }).range(0, 49999),
      sb.from('push_subscriptions').select('user_id').range(0, 19999),
      sb.from('creators').select('user_id, handle, added_at'),
      sb.from('birthdays').select('user_id, month, day')
    ]);
    const pts = {}, ref = {}, no = {}, push = {}, st = {};
    const invites = {}, cr = {}, bd = {};
    const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    ((bdays && bdays.data) || []).forEach(function (b) { bd[b.user_id] = b.day + ' ' + MON[b.month - 1]; });
    (profiles.data || []).forEach(function (p) { pts[p.user_id] = p.points || 0; ref[p.user_id] = !!p.referred_by; if (p.referred_by) invites[p.referred_by] = (invites[p.referred_by] || 0) + 1; });
    (creators.data || []).forEach(function (c) { cr[c.user_id] = c; });
    (numbers.data || []).forEach(function (n) { no[n.user_id] = n.member_no; });
    (subs.data || []).forEach(function (s) { if (s.user_id) push[s.user_id] = true; });
    (reqs.data || []).forEach(function (r) {
      const s = st[r.user_id] = st[r.user_id] || { requests: 0, approved: 0, noShows: 0, verified: false, last: null, ig: '', phone: '' };
      const status = String(r.status || '').toLowerCase();
      s.requests++;
      if (status === 'approved') { s.approved++; if (String(r.event_date) < today) s.verified = true; }
      if (status === 'no-show') s.noShows++;
      s.last = r.event_date;
      if (r.instagram && r.instagram !== 'None') s.ig = String(r.instagram).replace(/^@/, '');
      if (r.phone) s.phone = r.phone;
    });
    const rows = users.map(function (u) {
      const m = u.user_metadata || {}, s = st[u.id] || {};
      return {
        id: u.id, no: no[u.id] || null,
        name: [m.first_name, m.last_name].filter(Boolean).join(' ').trim(),
        email: u.email || '', joined: u.created_at, lastSeen: u.last_sign_in_at || null,
        points: pts[u.id] || 0, referred: !!ref[u.id], push: !!push[u.id],
        requests: s.requests || 0, approved: s.approved || 0, noShows: s.noShows || 0,
        verified: !!s.verified, lastParty: s.last || null, ig: s.ig || '', phone: s.phone || '',
        creator: !!cr[u.id], creatorHandle: (cr[u.id] && cr[u.id].handle) || '', creatorSince: (cr[u.id] && cr[u.id].added_at) || null, invites: invites[u.id] || 0, birthday: bd[u.id] || ''
      };
    }).sort(function (a, b) { return (b.joined || '').localeCompare(a.joined || ''); });
    res.status(200).json({ members: rows });
  } catch (e) {
    res.status(500).json({ error: e.message || 'failed' });
  }
};
