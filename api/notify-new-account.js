// api/notify-new-account.js
//
// Vercel serverless function. This is what makes the "new account →
// automatic email" flow work with zero action from the new guest.
//
// It is NOT called by the app directly. Instead, Supabase itself calls
// this endpoint automatically, server-side, the moment a new row is
// inserted into auth.users (i.e. the moment someone signs up) — via a
// Supabase Database Webhook. See README.md for how to wire that up.
//
// Accepts: POST from Supabase's Database Webhook (its own payload shape)
// Sends:   a push to the AGS team (falls back to one email via Resend
//          only when no admin device has notifications on)
//
// Credentials come ONLY from environment variables set in the Vercel
// dashboard — never from this file.

const { pushToAdmins } = require('./_admin-push');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  // Supabase Database Webhooks let you attach a custom header with a
  // shared secret, so random requests to this URL can't trigger fake
  // emails. See README.md step 3.
  const expectedSecret = process.env.WEBHOOK_SECRET;
  const providedSecret = req.headers['x-webhook-secret'];
  if (expectedSecret && providedSecret !== expectedSecret) {
    res.status(401).json({ ok: false, error: 'Invalid webhook secret' });
    return;
  }

  try {
    const body = req.body || {};
    // Supabase's Database Webhook payload for an INSERT on auth.users
    // puts the new row under "record".
    const record = body.record || {};
    const email = record.email || 'unknown';
    const meta = record.raw_user_meta_data || {};
    const firstName = meta.first_name || meta.given_name || meta.full_name || meta.name || '';
    const lastName = meta.last_name || meta.family_name || '';
    const fullName = (firstName + ' ' + lastName).trim() || 'A new guest';

    // Push to the AGS team first. Only if that reaches nobody do we fall
    // back to the admin email (which counts against the Resend quota).
    const pushed = await pushToAdmins({
      title: '🆕 New account',
      body: fullName + ' just created an account.',
      url: '/admin/requests.html'
    });
    if (pushed > 0) {
      res.status(200).json({ ok: true, result: 'pushed', pushed: pushed });
      return;
    }

    const { RESEND_API_KEY, NOTIFY_EMAIL_TO } = process.env;

    if (!RESEND_API_KEY || !NOTIFY_EMAIL_TO) {
      res.status(200).json({ ok: true, result: 'skipped: Resend environment variables not configured' });
      return;
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_ADMIN_FROM || 'AGS Admin <notifications@amsterdamguestlistservice.website>',
        to: [NOTIFY_EMAIL_TO],
        subject: 'New account created — ' + fullName,
        text:
          'A new account was just created in the app.\n\n' +
          'Name: ' + fullName + '\n' +
          'Email: ' + email + '\n' +
          'Created: ' + new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })
      })
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      throw new Error('Resend responded with ' + emailRes.status + ': ' + errText);
    }

    res.status(200).json({ ok: true, result: 'sent' });
  } catch (err) {
    // Common causes at this point:
    //  - RESEND_API_KEY missing or invalid
    //  - "from" address not verified with Resend yet
    console.error('New account email failed:', err.message);
    res.status(200).json({ ok: false, error: err.message });
  }
};
