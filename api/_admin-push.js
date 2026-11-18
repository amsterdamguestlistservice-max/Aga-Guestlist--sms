// api/_admin-push.js
//
// Push notifications for the AGS team only (new accounts, new requests).
// Replaces the admin emails so they no longer eat the Resend daily quota.
//
// Who gets them: the app accounts whose email is in ADMIN_PUSH_EMAILS, or,
// if that is not set, in ADMIN_EMAILS (comma separated, Vercel env) — and
// only on the devices where they turned notifications on.
//
// pushToAdmins() never throws. It returns how many devices got the push,
// so callers can fall back to email when it reaches nobody.

const webpush = require('web-push');
const { sendPush: sendAnyPush } = require('./_push');
const { createClient } = require('@supabase/supabase-js');

let cachedIds = null, cachedAt = 0;

function adminEmails() {
  return String(process.env.ADMIN_PUSH_EMAILS || process.env.ADMIN_EMAILS || '')
    .split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
}

async function adminUserIds(supabase) {
  if (cachedIds && Date.now() - cachedAt < 10 * 60 * 1000) return cachedIds;
  const wanted = adminEmails();
  if (!wanted.length) return [];
  const ids = [];
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page: page, perPage: 1000 });
    if (error) break;
    const users = (data && data.users) || [];
    users.forEach(function (u) {
      if (u.email && wanted.indexOf(u.email.toLowerCase()) >= 0) ids.push(u.id);
    });
    if (users.length < 1000) break;
  }
  cachedIds = ids; cachedAt = Date.now();
  return ids;
}

async function pushToAdmins(payload) {
  try {
    const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return 0;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const ids = await adminUserIds(supabase);
    if (!ids.length) return 0;

    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .in('user_id', ids);
    if (!subs || !subs.length) return 0;

    webpush.setVapidDetails('mailto:amsterdamguestlistservice@outlook.com', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    const body = JSON.stringify({
      title: payload.title || 'AGS Admin',
      body: payload.body || '',
      url: payload.url || '/admin/requests.html'
    });

    let sent = 0;
    await Promise.all(subs.map(async function (sub) {
      try {
        await sendAnyPush(webpush, { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, body);
        sent++;
      } catch (err) {
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }));
    return sent;
  } catch (e) {
    console.error('Admin push failed:', e && e.message);
    return 0;
  }
}

module.exports = { pushToAdmins };
