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

module.exports = async function handler(req, res) {
  const secret = (req.headers['x-notify-secret'] || '').trim();
  const expected = (process.env.NOTIFY_ADMIN_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) {
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
      res.status(200).json({ requests: data || [] });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Unknown error' });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { id, status, missing_guests } = req.body || {};

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
