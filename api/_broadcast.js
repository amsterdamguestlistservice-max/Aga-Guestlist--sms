// api/_broadcast.js  (public URL: /api/ags?fn=broadcast)
//
// Sends a push notification from a row in public.push_outbox. Inserting a
// row (title, body, url, audience) is all it takes: a Supabase Database
// Webhook on push_outbox calls this endpoint, which sends the push and
// writes the result back onto the row. This lets AGS (or Claude, with
// database access) send a push without opening the admin page.
//
//   audience 'all'    — every device with notifications on (default)
//   audience 'admins' — only the AGS team (see _admin-push.js)
//   audience 'not_on:<event_id>' — everyone except guests already on that list
//   audience 'users:<uuid,uuid>' — only these accounts
//
// Protected by the same WEBHOOK_SECRET as the other Database Webhooks.

const webpush = require('web-push');
const { sendPush: sendAnyPush, withPid } = require('./_push');
const { createClient } = require('@supabase/supabase-js');
const { pushToAdmins } = require('./_admin-push');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const secret = String(req.headers['x-webhook-secret'] || '').trim();
  const expected = String(process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) { res.status(401).json({ error: 'Unauthorized' }); return; }

  const record = (req.body || {}).record || {};
  const text = String(record.body || '').trim();
  if (!record.id || !text) { res.status(400).json({ error: 'Missing notification text' }); return; }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    res.status(500).json({ error: 'Push not configured' }); return;
  }
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Claim the row first, so a retried webhook never sends twice.
  const { data: claimed } = await supabase
    .from('push_outbox')
    .update({ sent_at: new Date().toISOString() })
    .eq('id', record.id)
    .is('sent_at', null)
    .select('id');
  if (!claimed || !claimed.length) { res.status(200).json({ skipped: 'already_sent' }); return; }

  const payload = {
    title: String(record.title || '').trim() || 'Amsterdam Guestlist Service',
    body: text,
    url: String(record.url || '').trim() || './index.html'
  };

  let result;
  try {
    if (record.audience === 'admins') {
      result = { audience: 'admins', sent: await pushToAdmins(payload) };
    } else {
      webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
      const { data: allSubs, error } = await supabase.from('push_subscriptions').select('endpoint, p256dh, auth, user_id');
      if (error) throw new Error(error.message);
      // audience 'not_on:<event_id>' skips everyone who already holds a spot on that guestlist.
      let subs = allSubs || [];
      const aud = String(record.audience || '');
      if (aud.indexOf('not_on:') === 0) {
        const evIds = aud.slice(7).split(',').filter(Boolean);
        const { data: claims } = await supabase.from('guestlist_claims').select('user_id').in('event_id', evIds);
        const skip = new Set((claims || []).map(function (c) { return c.user_id; }));
        subs = subs.filter(function (s) { return !s.user_id || !skip.has(s.user_id); });
      } else if (aud.indexOf('users:') === 0) {
        // audience 'users:<uuid,uuid>' — only these accounts (e.g. guests on tonight's list)
        const only = new Set(aud.slice(6).split(',').filter(Boolean));
        subs = subs.filter(function (s) { return s.user_id && only.has(s.user_id); });
      }
      const body = JSON.stringify(payload);
      let sent = 0, failed = 0, removed = 0;
      await Promise.all((subs || []).map(async function (sub) {
        try {
          await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, body);
          sent++;
        } catch (err) {
          failed++;
          if (err && (err.statusCode === 404 || err.statusCode === 410)) {
            await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
            removed++;
          }
        }
      }));
      result = { audience: aud || 'all', total: (subs || []).length, sent: sent, failed: failed, removed: removed };
      // Also put it in the in-app inbox of every account in the audience, including the ones
      // without notifications on, so they see it the next time they open the app.
      try {
        const ids = [];
        let page = 1;
        for (;;) {
          const { data: lu, error: le } = await supabase.auth.admin.listUsers({ page: page, perPage: 1000 });
          if (le || !lu || !lu.users || !lu.users.length) break;
          lu.users.forEach(function (u) { ids.push(u.id); });
          if (lu.users.length < 1000) break;
          page++;
        }
        let targets = ids;
        if (aud.indexOf('not_on:') === 0) {
          const evIds = aud.slice(7).split(',').filter(Boolean);
          const { data: claims } = await supabase.from('guestlist_claims').select('user_id').in('event_id', evIds);
          const skip = new Set((claims || []).map(function (c) { return c.user_id; }));
          targets = ids.filter(function (u) { return !skip.has(u); });
        } else if (aud.indexOf('users:') === 0) {
          const only = new Set(aud.slice(6).split(',').filter(Boolean));
          targets = ids.filter(function (u) { return only.has(u); });
        }
        const pid = JSON.parse(withPid(body)).pid;
        const rows = targets.map(function (u) { return { user_id: u, pid: pid, title: payload.title, body: payload.body, url: payload.url }; });
        let saved = 0;
        for (let i = 0; i < rows.length; i += 500) {
          const { error: ie } = await supabase.from('inbox').upsert(rows.slice(i, i + 500), { onConflict: 'user_id,pid', ignoreDuplicates: true });
          if (!ie) saved += Math.min(500, rows.length - i);
        }
        result.inbox = saved;
      } catch (e) { result.inboxError = String(e && e.message || e); }
    }
  } catch (err) {
    result = { error: (err && err.message) || 'Unknown error' };
  }

  await supabase.from('push_outbox').update({ result: result }).eq('id', record.id);
  res.status(200).json(result);
};
