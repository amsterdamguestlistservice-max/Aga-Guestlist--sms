// api/admin-requests.js
//
// Backend for admin/requests.html — the "review guestlist requests"
// dashboard. Two things happen here:
//   GET  → returns every row from guestlist_requests (newest event first)
//   POST → updates one request's status (Approved / Declined / Pending)
//
// Both are protected by the same password as admin/notify.html
// (NOTIFY_ADMIN_SECRET) — no new secret needed.
//
// Approving a request here updates the same guestlist_requests table
// that Supabase Table Editor would, so the existing points-on-approval
// Database Webhook (section 9) still fires normally — points, tiers,
// and referral bonuses keep working exactly as before.
//
// Required environment variables (same Vercel project as the others):
//   NOTIFY_ADMIN_SECRET
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Depends on "@supabase/supabase-js" — already added to package.json.

const { createClient } = require('@supabase/supabase-js');
const { isAdmin } = require('./_admin-auth');

module.exports = async function handler(req, res) {
  if (!(await isAdmin(req)).ok) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('guestlist_requests')
        .select('*')
        .order('event_date', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      // Member tier per requester, so Silver+ can be reviewed first.
      const rows = data || [];
      try {
        const ids = Array.from(new Set(rows.map(function (r) { return r.user_id; }).filter(Boolean)));
        const pts = {};
        for (let i = 0; i < ids.length; i += 300) {
          const { data: pr } = await supabase.from('profiles').select('user_id, points').in('user_id', ids.slice(i, i + 300));
          (pr || []).forEach(function (p) { pts[p.user_id] = p.points || 0; });
        }
        rows.forEach(function (r) { r.points = pts[r.user_id] || 0; });
      } catch (e) { /* optional */ }
      // Changes guests made themselves (edits / cancellations), newest first.
      let changes = [];
      try {
        const { data: ch } = await supabase.from('request_changes').select('id, request_id, kind, summary, size_before, size_after, created_at')
          .gte('created_at', new Date(Date.now() - 30 * 864e5).toISOString()).order('created_at', { ascending: false }).limit(200);
        changes = ch || [];
        const byReq = {};
        changes.forEach(function (c) { (byReq[c.request_id] = byReq[c.request_id] || []).push(c); });
        rows.forEach(function (r) { if (byReq[r.id]) r.changes = byReq[r.id]; });
      } catch (e) { /* optional */ }
      // Drop perks (priority / +1) claimed for the party of a request.
      try {
        const { data: dr } = await supabase.from('drops').select('id, kind, event_name, event_date').in('kind', ['priority', 'plusone']).gte('event_date', new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10));
        if (dr && dr.length) {
          const { data: dc } = await supabase.from('drop_claims').select('drop_id, user_id').not('confirmed_at', 'is', null).in('drop_id', dr.map(function (d) { return d.id; }));
          const byId = {}; dr.forEach(function (d) { byId[d.id] = d; });
          const perk = {};
          (dc || []).forEach(function (c) { const d = byId[c.drop_id]; perk[c.user_id + '|' + d.event_name + '|' + d.event_date] = d.kind; });
          rows.forEach(function (r) { const k = perk[r.user_id + '|' + r.event_name + '|' + String(r.event_date).slice(0, 10)]; if (k) r.drop = k; });
        }
      } catch (e) { /* optional */ }
      // Creators (TikTok/Instagram partners) always get priority.
      try {
        const { data: cr } = await supabase.from('creators').select('user_id');
        const set = new Set((cr || []).map(function (c) { return c.user_id; }));
        rows.forEach(function (r) { if (r.user_id && set.has(r.user_id)) r.creator = true; });
      } catch (e) { /* optional */ }
      // Birthday week: the party falls 5 days before to 2 days after the guest's birthday.
      try {
        const { data: bd } = await supabase.from('birthdays').select('user_id, month, day');
        const bmap = {}; (bd || []).forEach(function (b) { bmap[b.user_id] = b; });
        rows.forEach(function (r) {
          const b = r.user_id && bmap[r.user_id]; if (!b || !r.event_date) return;
          const ref = new Date(String(r.event_date).slice(0, 10) + 'T12:00:00Z'); let best = null;
          [-1, 0, 1].forEach(function (k) {
            const y = ref.getUTCFullYear() + k; let d = new Date(Date.UTC(y, b.month - 1, b.day, 12));
            if (d.getUTCMonth() !== b.month - 1) d = new Date(Date.UTC(y, 2, 1, 12));
            const o = Math.round((d - ref) / 864e5); if (best === null || Math.abs(o) < Math.abs(best)) best = o;
          });
          if (best >= -2 && best <= 5) r.birthday = true;
        });
      } catch (e) { /* optional */ }
            res.status(200).json({ requests: rows, changes: changes });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Unknown error' });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { id, status, missing_guests } = req.body || {};

      // Instagram list: set man / woman for everyone with this Instagram handle.
      if (req.body && req.body.instagram !== undefined && req.body.gender !== undefined) {
        const handle = String(req.body.instagram || '').trim().replace(/^@/, '').toLowerCase();
        const gender = req.body.gender === 'man' || req.body.gender === 'woman' ? req.body.gender : null;
        if (!handle || !/^[a-z0-9._]{1,40}$/.test(handle)) {
          res.status(400).json({ error: 'Invalid Instagram handle' });
          return;
        }
        const { data: rows, error: readErr } = await supabase
          .from('guestlist_requests')
          .select('id, instagram')
          .ilike('instagram', '%' + handle + '%');
        if (readErr) { res.status(500).json({ error: readErr.message }); return; }
        const ids = (rows || []).filter(function (r) {
          return String(r.instagram || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[\/?#].*$/, '').toLowerCase() === handle;
        }).map(function (r) { return r.id; });
        if (!ids.length) { res.status(404).json({ error: 'No requests with @' + handle }); return; }
        const { error: updErr } = await supabase.from('guestlist_requests').update({ gender: gender }).in('id', ids);
        if (updErr) { res.status(500).json({ error: updErr.message }); return; }
        res.status(200).json({ ok: true, updated: ids.length, gender: gender });
        return;
      }

      // Partial no-show: set how many guests of an approved group did not come.
      if (id && missing_guests !== undefined && status === undefined) {
        const missing = Number(missing_guests);
        const { data: row, error: readErr } = await supabase
          .from('guestlist_requests')
          .select('status, total_guests')
          .eq('id', id)
          .maybeSingle();
        if (readErr || !row) {
          res.status(404).json({ error: 'Request not found' });
          return;
        }
        const total = Number(row.total_guests) || 1;
        if (String(row.status || '').trim().toLowerCase() !== 'approved') {
          res.status(400).json({ error: 'Only approved requests can be marked as partial no-show' });
          return;
        }
        if (!Number.isInteger(missing) || missing < 0 || missing >= total) {
          res.status(400).json({ error: 'Missing guests must be between 0 and ' + (total - 1) + '. If nobody came, use No-Show.' });
          return;
        }
        const { error: updErr } = await supabase
          .from('guestlist_requests')
          .update({ missing_guests: missing })
          .eq('id', id);
        if (updErr) {
          res.status(500).json({ error: updErr.message });
          return;
        }
        res.status(200).json({ ok: true, missing_guests: missing });
        return;
      }

      const allowed = ['Pending', 'Approved', 'Declined', 'No-Show'];
      if (!id || !allowed.includes(status)) {
        res.status(400).json({ error: 'Missing or invalid id/status' });
        return;
      }

      const { error } = await supabase
        .from('guestlist_requests')
        .update({ status: status })
        .eq('id', id);

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Unknown error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
