// api/_notify-ticket-click.js  (/api/ags?fn=notify-ticket-click)
// Database Webhook on link_clicks (kind = 'tickets'): tells the AGS team
// someone opened a ticket link. Same person + same party within 30 minutes
// only notifies once.
const { createClient } = require('@supabase/supabase-js');
const { pushToAdmins } = require('./_admin-push');

module.exports = async function handler(req, res) {
  const secret = String(req.headers['x-webhook-secret'] || '').trim();
  const expected = String(process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const r = (req.body || {}).record || {};
  if (r.kind !== 'tickets' || !r.event_id || r.event_id === 'test-event-0000') { res.status(200).json({ skipped: true }); return; }
  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    if (r.user_id) {
      const { count } = await sb.from('link_clicks').select('id', { count: 'exact', head: true })
        .eq('user_id', r.user_id).eq('event_id', r.event_id).eq('kind', 'tickets')
        .gte('created_at', new Date(Date.now() - 30 * 60e3).toISOString()).neq('id', r.id);
      if (count > 0) { res.status(200).json({ skipped: 'recent' }); return; }
    }
    let who = 'A guest (not logged in)';
    if (r.user_id) {
      try { const { data } = await sb.auth.admin.getUserById(r.user_id); const m = (data && data.user && data.user.user_metadata) || {}; who = [m.first_name, m.last_name].filter(Boolean).join(' ') || (data && data.user && data.user.email) || 'A member'; } catch (e) {}
    }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const { count: total } = await sb.from('link_clicks').select('id', { count: 'exact', head: true }).eq('event_id', r.event_id).eq('kind', 'tickets');
    const sent = await pushToAdmins({
      title: '🎟️ Ticket click · ' + (r.event_name || r.event_id),
      body: who + ' opened the ticket link' + (total ? ' · ' + total + ' click' + (total > 1 ? 's' : '') + ' for this party so far' : ''),
      url: '/app/index.html'
    });
    res.status(200).json({ ok: true, sent: sent });
  } catch (e) { res.status(500).json({ error: e.message || 'failed' }); }
};
