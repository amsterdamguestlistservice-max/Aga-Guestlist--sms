// api/send-notification.js
//
// Sends a push notification to every guest who has opted in. Called from
// admin/notify.html — never from the app itself. Protected by a shared
// secret (NOTIFY_ADMIN_SECRET) so only whoever knows that secret can send.
//
// Required environment variables (Vercel → Project → Settings →
// Environment Variables):
//   VAPID_PUBLIC_KEY          — see README.md section 7
//   VAPID_PRIVATE_KEY         — see README.md section 7
//   NOTIFY_ADMIN_SECRET       — a secret you make up yourself
//   SUPABASE_URL              — your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY — Supabase → Project Settings → API →
//                                "service_role" key (NOT the anon key —
//                                this one bypasses Row Level Security,
//                                so it must only ever live here, never
//                                in client-side code)
//
// Depends on the "web-push" and "@supabase/supabase-js" npm packages —
// add both to the package.json at the root of your repo (same place
// notify-new-account.js's "resend" dependency lives).

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = req.headers['x-notify-secret'];
  if (!secret || secret !== process.env.NOTIFY_ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { title, body, url } = req.body || {};
  if (!body || !String(body).trim()) {
    res.status(400).json({ error: 'Missing notification text' });
    return;
  }

  try {
    webpush.setVapidDetails(
      'mailto:amsterdamguestlistservice@outlook.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: subs, error } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth');

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    const payload = JSON.stringify({
      title: title && String(title).trim() ? String(title).trim() : 'Amsterdam Guestlist Service',
      body: String(body).trim(),
      url: url && String(url).trim() ? String(url).trim() : './index.html'
    });

    let sent = 0;
    let failed = 0;
    let removed = 0;

    await Promise.all((subs || []).map(async function (sub) {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        );
        sent++;
      } catch (err) {
        failed++;
        // 404/410 means the subscription is gone (uninstalled, expired) — clean it up.
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
          removed++;
        }
      }
    }));

    res.status(200).json({ total: (subs || []).length, sent, failed, removed });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
