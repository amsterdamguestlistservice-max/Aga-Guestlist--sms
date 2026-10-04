// api/reminders-today.js
//
// Vercel serverless function. Powers the "admin-reminders.html" page —
// returns every APPROVED guestlist request whose event is tonight
// (event_date = today, Europe/Amsterdam), so the admin page can build a
// ready-to-tap WhatsApp reminder link for each guest.
//
// This is read-only and only ever returns guests for TODAY — nothing
// else in guestlist_requests is exposed through this endpoint.
//
// Protected by a simple shared key (so the URL alone can't be used by a
// stranger to pull guest phone numbers). Credentials and the key come
// ONLY from environment variables set in the Vercel dashboard — never
// from this file.

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const expectedKey = process.env.ADMIN_KEY;
  const providedKey = req.query.key;
  if (!expectedKey || providedKey !== expectedKey) {
    res.status(401).json({ ok: false, error: 'Invalid or missing key' });
    return;
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    res.status(200).json({ ok: true, result: 'skipped: Supabase service-role environment variables not configured', guests: [] });
    return;
  }

  try {
    // "Today" in Europe/Amsterdam — a night that starts at 23:00 is
    // still saved under the date it started, so matching on today's
    // date (Amsterdam time) is exactly "tonight's events".
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); // YYYY-MM-DD

    const url = SUPABASE_URL + '/rest/v1/guestlist_requests' +
      '?select=id,first_name,last_name,phone,event_name,event_venue,event_date,total_guests' +
      '&status=eq.Approved' +
      '&event_date=eq.' + today +
      '&order=event_name.asc';

    const sbRes = await fetch(url, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_SERVICE_ROLE_KEY
      }
    });

    if (!sbRes.ok) {
      const text = await sbRes.text();
      res.status(502).json({ ok: false, error: 'Supabase query failed: ' + text });
      return;
    }

    const rows = await sbRes.json();
    res.status(200).json({ ok: true, date: today, guests: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};
