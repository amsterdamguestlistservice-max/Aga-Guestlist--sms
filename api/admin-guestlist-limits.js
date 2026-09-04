// api/admin-guestlist-limits.js
//
// Backend for admin/guestlist-limits.html — lets you turn a limited
// guestlist on/off per event, change its capacity, and change its
// deadline. Uses the same password as your other admin pages
// (NOTIFY_ADMIN_SECRET) — no new secret needed.
//
// GET  → returns every row from event_guestlists
// POST → upserts one event's settings: { event_id, enabled, capacity, deadline }
//
// Required environment variables (same Vercel project as the others):
//   NOTIFY_ADMIN_SECRET
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

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
        .from('event_guestlists')
        .select('*')
        .order('deadline', { ascending: true });

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ guestlists: data || [] });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Unknown error' });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { event_id, enabled, capacity, deadline } = req.body || {};
      if (!event_id) {
        res.status(400).json({ error: 'Missing event_id' });
        return;
      }
      if (capacity !== undefined && (typeof capacity !== 'number' || capacity < 0)) {
        res.status(400).json({ error: 'capacity must be a non-negative number' });
        return;
      }

      const update = { event_id: event_id };
      if (enabled !== undefined) update.enabled = !!enabled;
      if (capacity !== undefined) update.capacity = capacity;
      if (deadline !== undefined) update.deadline = deadline;
      update.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('event_guestlists')
        .upsert(update, { onConflict: 'event_id' })
        .select()
        .single();

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ guestlist: data });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Unknown error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
