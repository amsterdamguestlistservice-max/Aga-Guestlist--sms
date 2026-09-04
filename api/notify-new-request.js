// api/notify-new-request.js
//
// Called automatically by a Supabase Database Webhook whenever a new
// row is inserted into guestlist_requests (i.e. a guest just submitted
// a request). Emails you the details so you don't have to keep
// checking admin/requests.html.
//
// Required environment variables (same Vercel project as the others):
//   WEBHOOK_SECRET             — same one already used for the other
//                                 Database Webhooks
//   RESEND_API_KEY             — same one from section 6
//   NOTIFY_EMAIL_TO            — same one from section 6
//
// Uses Resend's plain HTTP API directly (no extra npm package needed —
// Vercel's Node runtime has fetch built in).

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

  const record = (req.body || {}).record || {};

  try {
    const guestName = [record.first_name, record.last_name].filter(Boolean).join(' ') || 'A guest';
    const partySize = record.total_guests ? record.total_guests : 1;

    const html =
      '<h2>New guestlist request</h2>' +
      '<p><strong>Event:</strong> ' + escapeHtml(record.event_name) + '<br>' +
      '<strong>Venue:</strong> ' + escapeHtml(record.event_venue) + '<br>' +
      '<strong>Date:</strong> ' + escapeHtml(record.event_date) + '</p>' +
      '<p><strong>Guest:</strong> ' + escapeHtml(guestName) + (record.age ? ' (' + escapeHtml(record.age) + ')' : '') + '<br>' +
      (record.instagram ? '<strong>Instagram:</strong> ' + escapeHtml(record.instagram) + '<br>' : '') +
      (record.phone ? '<strong>Phone:</strong> ' + escapeHtml(record.phone) + '<br>' : '') +
      (record.email ? '<strong>Email:</strong> ' + escapeHtml(record.email) + '<br>' : '') +
      '<strong>Party size:</strong> ' + partySize + '</p>' +
      '<p><a href="https://amsterdamguestlistservice.website/admin/requests.html">Review it in the admin dashboard →</a></p>';

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Amsterdam Guestlist Service <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL_TO,
        subject: 'New guestlist request — ' + (record.event_name || 'an event'),
        html: html
      })
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      res.status(200).json({ warning: 'Email failed to send', detail: errBody });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(200).json({ warning: 'Email failed to send', detail: err.message || 'Unknown error' });
  }
};

function escapeHtml(str){
  if(str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, function(ch){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch];
  });
}
