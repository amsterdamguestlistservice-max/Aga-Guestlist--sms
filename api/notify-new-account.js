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
// Sends:   one email to the business, via Resend
//
// Credentials come ONLY from environment variables set in the Vercel
// dashboard — never from this file.

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
    const firstName = meta.first_name || '';
    const lastName = meta.last_name || '';
    const fullName = (firstName + ' ' + lastName).trim() || 'A new guest';

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
        from: 'Amsterdam Guestlist Service <onboarding@resend.dev>',
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
