// api/_notify-alert-signup.js  (route: /api/ags?fn=notify-alert-signup)
//
// Supabase webhook on INSERT into alert_signups ("Notify me first", e.g. New
// Year's Eve): tells the AGS team with an admin push, with a running total.
// Protected by the same WEBHOOK_SECRET header as the other webhooks.

const { createClient } = require('@supabase/supabase-js');
const { pushToAdmins } = require('./_admin-push');

const TOPICS = { nye: 'New Year\'s Eve' };

module.exports = async function handler(req, res) {
  const secret = (req.headers['x-webhook-secret'] || '').trim();
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET.trim()) { res.status(401).json({ ok: false }); return; }
  const record = (req.body && req.body.record) || {};
  if (!record.user_id || !record.topic) { res.status(200).json({ skipped: true }); return; }
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const [{ count }, { data: prof }, { data: req1 }] = await Promise.all([
      supabase.from('alert_signups').select('user_id', { count: 'exact', head: true }).eq('topic', record.topic),
      supabase.from('member_profiles').select('display_name').eq('user_id', record.user_id).maybeSingle(),
      supabase.from('guestlist_requests').select('first_name, last_name').eq('user_id', record.user_id).order('created_at', { ascending: false }).limit(1)
    ]);
    const r = (req1 && req1[0]) || {};
    const name = (prof && prof.display_name) || [r.first_name, r.last_name].filter(Boolean).join(' ') || 'Someone';
    const label = TOPICS[String(record.topic).split('-')[0]] || record.topic;
    const pushed = await pushToAdmins({
      title: '🎆 ' + label + ': new sign-up',
      body: name + ' wants to hear first. ' + (count || 1) + ' signed up so far.',
      url: '/admin/'
    });
    res.status(200).json({ ok: true, pushed: pushed, total: count });
  } catch (e) {
    res.status(200).json({ ok: false, error: e.message || 'failed' });
  }
};
