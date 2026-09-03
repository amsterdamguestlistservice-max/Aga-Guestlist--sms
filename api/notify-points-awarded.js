// api/notify-points-awarded.js
//
// Called automatically by a Supabase Database Webhook whenever a row in
// guestlist_requests is updated. If the update just changed the status
// to "Approved" (and it wasn't already Approved before), this:
//   1. adds POINTS_PER_APPROVAL points to that guest's profile
//   2. sends that guest a personal push notification, if they have one
//      linked to their account
//
// Required environment variables (same Vercel project as the other
// functions):
//   WEBHOOK_SECRET             — the same one already used for the
//                                 new-account email webhook (section 6)
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   VAPID_PUBLIC_KEY
//   VAPID_PRIVATE_KEY
//
// Depends on "web-push" and "@supabase/supabase-js" — already added to
// package.json for the push notification feature.

const webpush = require('web-push');
const { createClient } = require('@supabase/supabase-js');

const POINTS_PER_APPROVAL = 10;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = (req.headers['x-webhook-secret'] || '').trim();
  const expected = (process.env.WEBHOOK_SECRET || '').trim();
  if (!secret || !expected || secret !== expected) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const payload = req.body || {};
  const record = payload.record || {};
  const oldRecord = payload.old_record || {};

  const newStatus = String(record.status || '').trim().toLowerCase();
  const oldStatus = String(oldRecord.status || '').trim().toLowerCase();

  // Only act the moment a request newly becomes "Approved" — not on every
  // edit, and not if it was already Approved before this update.
  if (newStatus !== 'approved' || oldStatus === 'approved') {
    res.status(200).json({ skipped: true });
    return;
  }

  if (!record.user_id) {
    res.status(200).json({ skipped: true, reason: 'No user_id on request' });
    return;
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Read current points, then write the new total (upsert covers a
    // guest's very first approval, when they have no profile row yet).
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('points')
      .eq('user_id', record.user_id)
      .maybeSingle();

    const newPoints = (existingProfile ? existingProfile.points : 0) + POINTS_PER_APPROVAL;

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ user_id: record.user_id, points: newPoints, updated_at: new Date().toISOString() });

    if (profileError) {
      res.status(500).json({ error: profileError.message });
      return;
    }

    // Send a personal push notification, if this guest has a linked subscription.
    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .eq('user_id', record.user_id);

    let pushed = 0;
    if (subs && subs.length && process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
      webpush.setVapidDetails(
        'mailto:amsterdamguestlistservice@outlook.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );

      const notifPayload = JSON.stringify({
        title: 'Amsterdam Guestlist Service',
        body: "You're on the list for " + (record.event_name || 'your event') +
          '! +' + POINTS_PER_APPROVAL + ' points (total: ' + newPoints + ').',
        url: './index.html'
      });

      await Promise.all(subs.map(async function (sub) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
            notifPayload
          );
          pushed++;
        } catch (err) {
          if (err && (err.statusCode === 404 || err.statusCode === 410)) {
            await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
          }
        }
      }));
    }

    res.status(200).json({ awarded: POINTS_PER_APPROVAL, newPoints: newPoints, pushed: pushed });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
