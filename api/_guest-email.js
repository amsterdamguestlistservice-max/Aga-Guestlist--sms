// api/_guest-email.js
//
// One shared, email-client-safe template for every email a GUEST gets:
//   - 'received'  — request received (notify-new-request.js)
//   - 'approved'  — you're on the list (notify-points-awarded.js)
//   - 'reminder'  — tonight reminder (send-day-reminders.js)
// Files starting with "_" inside /api are NOT exposed as endpoints by Vercel.
//
// Built with nested tables + inline styles so it renders the same in
// Gmail, Apple Mail, Outlook and on phones. Always sends a plain-text
// version too (better deliverability, fewer spam hits).

const events = require('./_events');
const cancelToken = require('./_cancel-token');

const APP_URL = 'https://www.amsterdamguestlistservice.website/app/';
const INNER_CIRCLE_URL = 'https://chat.whatsapp.com/LxMQwsnah2b5oe9WRdOFAw';
const LOGO_URL = 'https://www.amsterdamguestlistservice.website/app/icon-192.png';

const C = {
  bg: '#000000',
  card: '#0B0B0B',
  panel: '#121212',
  line: '#2A2418',
  gold: '#C9A24A',
  goldLight: '#E6C875',
  white: '#F5F5F5',
  text: '#CFCFCF',
  muted: '#8A8A8A'
};
const SERIF = "Georgia,'Times New Roman',Times,serif";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

function prettyDate(iso) {
  if (!iso) return '';
  const d = new Date(String(iso).slice(0, 10) + 'T12:00:00Z');
  if (isNaN(d)) return String(iso);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Amsterdam' });
}

function partyLabel(total) {
  const n = Number(total) || 1;
  if (n <= 1) return '1 person';
  return n + ' people';
}

function venueParts(venue) {
  const parts = String(venue || '').split(' · ');
  return { name: parts[0] || '', city: parts[1] || 'Amsterdam' };
}

const VARIANTS = {
  waitlist: {
    subject: function (r) { return 'A spot just opened \u2014 ' + (r.event_name || 'your night'); },
    preheader: function (r) { return 'A guestlist spot for ' + (r.event_name || 'your night') + ' is free. First to claim it gets it.'; },
    eyebrow: 'Waitlist',
    heading: 'A spot just opened up',
    status: { label: 'Claim now', filled: true },
    intro: function (name) {
      return 'Good news, ' + name + '. A guestlist spot for this night just became available. Spots go to whoever claims first, so be quick.';
    },
    noteTitle: 'How to claim',
    note: 'Open the app, find the night and tap \u201cClaim your spot\u201d. If someone beats you to it, you stay on the waitlist.',
    cta: 'Claim my spot',
    hideGuestRows: true
  },
  received: {
    subject: function (r) { return 'Request received — ' + (r.event_name || 'your event'); },
    preheader: function (r) { return 'Your guestlist request for ' + (r.event_name || 'your event') + ' is in. We\'ll let you know once it\'s approved.'; },
    eyebrow: 'Guestlist request',
    heading: 'We’ve received your request',
    status: { label: 'Under review', filled: false },
    intro: function (name) {
      return 'Thank you, ' + name + '. Your guestlist request is in and is now being reviewed by our team. ' +
        'You’ll receive a confirmation by email and in the app as soon as you’re on the list.';
    },
    noteTitle: 'What happens next',
    note: 'Every request is reviewed personally. Keep notifications on in the app so you never miss your confirmation.',
    cta: 'View in the app'
  },
  approved: {
    subject: function (r) { return 'You’re on the list — ' + (r.event_name || 'your event'); },
    preheader: function (r) { return 'Confirmed: you’re on the guestlist for ' + (r.event_name || 'your event') + ' on ' + prettyDate(r.event_date) + '.'; },
    eyebrow: 'Guestlist confirmed',
    heading: 'You’re on the list',
    status: { label: 'Confirmed', filled: true },
    intro: function (name) {
      return 'Good news, ' + name + '. Your request has been approved and your name is on the guestlist. We look forward to welcoming you.';
    },
    noteTitle: 'At the door',
    note: 'Arrive on time, bring a valid photo ID for everyone in your group and give the name above at the door. ' +
      'No-shows lose points, so if your plans change, please release your spot below.',
    cta: 'Open the app'
  },
  reminder: {
    subject: function (r) { return 'Tonight: ' + (r.event_name || 'your event') + ' — you’re on the list'; },
    preheader: function (r) { return 'See you tonight at ' + venueParts(r.event_venue).name + '. Bring your ID.'; },
    eyebrow: 'Tonight',
    heading: 'See you tonight',
    status: { label: 'Tonight', filled: true },
    intro: function (name) {
      return 'Hi ' + name + ', a quick reminder that you’re on the guestlist tonight. Everything is ready for your arrival.';
    },
    noteTitle: 'Before you go',
    note: 'Arrive on time, bring a valid photo ID for everyone in your group and give the name above at the door. ' +
      'Plans changed? Release your spot below so someone else can go.',
    cta: 'Open the app'
  }
};

function detailRow(label, value, last) {
  return '<tr>' +
    '<td style="padding:14px 0;' + (last ? '' : 'border-bottom:1px solid ' + C.line + ';') + 'font-family:' + SANS + ';font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:' + C.muted + ';width:38%;vertical-align:top;">' + esc(label) + '</td>' +
    '<td style="padding:14px 0;' + (last ? '' : 'border-bottom:1px solid ' + C.line + ';') + 'font-family:' + SANS + ';font-size:15px;color:' + C.white + ';text-align:right;vertical-align:top;">' + value + '</td>' +
  '</tr>';
}

function smallButton(href, label) {
  return '<td align="center" width="50%" style="padding:0 4px;">' +
    '<a href="' + esc(href) + '" target="_blank" style="display:block;padding:12px 6px;border:1px solid ' + C.gold + ';color:' + C.goldLight + ';font-family:' + SANS + ';font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;text-decoration:none;white-space:nowrap;">' + esc(label) + '</a>' +
  '</td>';
}

// event: the matching entry from the app's EVENTS (flyer, time, id), or null.
function renderGuestEmail(type, record, event) {
  const v = VARIANTS[type];
  const r = record || {};
  const ev = event || null;
  const confirmed = type === 'approved' || type === 'reminder';
  const flyer = events.flyerUrl(ev);
  const cancelHref = confirmed ? cancelToken.cancelUrl(r.id) : '';
  const firstName = (r.first_name && String(r.first_name).trim()) || 'there';
  const fullName = [r.first_name, r.last_name].filter(Boolean).join(' ').trim() || firstName;
  const venue = venueParts(r.event_venue || (event && event.venue));

  const pill = v.status.filled
    ? '<span style="display:inline-block;padding:6px 14px;background:' + C.gold + ';color:#000000;font-family:' + SANS + ';font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">' + esc(v.status.label) + '</span>'
    : '<span style="display:inline-block;padding:5px 13px;border:1px solid ' + C.gold + ';color:' + C.goldLight + ';font-family:' + SANS + ';font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">' + esc(v.status.label) + '</span>';

  const details =
    detailRow('Event', '<strong style="font-family:' + SERIF + ';font-size:17px;font-weight:normal;color:' + C.white + ';">' + esc(r.event_name) + '</strong>') +
    detailRow('Date', esc(prettyDate(r.event_date)) + (ev && ev.time ? '<br><span style="color:' + C.muted + ';font-size:13px;">From ' + esc(ev.time) + '</span>' : '')) +
    detailRow('Venue', esc(venue.name) + '<br><span style="color:' + C.muted + ';font-size:13px;">' + esc(venue.city) + '</span>') +
    (v.hideGuestRows ? '' : detailRow('Name on the list', esc(fullName)) + detailRow('Guests', esc(partyLabel(r.total_guests)), true));

  const html =
'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
'<meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light">' +
'<title>' + esc(v.subject(r)) + '</title></head>' +
'<body style="margin:0;padding:0;background:' + C.bg + ';-webkit-text-size-adjust:100%;">' +
// Preheader (inbox preview text), hidden in the body.
'<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:' + C.bg + ';font-size:1px;line-height:1px;">' + esc(v.preheader(r)) + '&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.bg + ';"><tr><td align="center" style="padding:32px 14px;">' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">' +

  // Header: logo + wordmark
  '<tr><td align="center" style="padding:8px 0 28px;">' +
    '<img src="' + LOGO_URL + '" width="72" height="72" alt="AGS" style="display:block;width:72px;height:72px;border:0;border-radius:50%;">' +
    '<div style="font-family:' + SERIF + ';font-size:20px;letter-spacing:1px;color:' + C.white + ';padding-top:14px;">Amsterdam</div>' +
    '<div style="font-family:' + SANS + ';font-size:10px;letter-spacing:4px;text-transform:uppercase;color:' + C.gold + ';padding-top:4px;">Guestlist Service</div>' +
  '</td></tr>' +

  // Card
  '<tr><td style="background:' + C.card + ';border:1px solid ' + C.line + ';border-top:2px solid ' + C.gold + ';">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' +
    (flyer ? '<tr><td style="padding:0;line-height:0;font-size:0;"><img src="' + esc(flyer) + '" width="560" alt="' + esc(r.event_name) + '" style="display:block;width:100%;max-width:560px;height:auto;border:0;"></td></tr>' : '') +
    '<tr><td style="padding:36px 32px 8px;">' +
      '<div style="font-family:' + SANS + ';font-size:11px;letter-spacing:3px;text-transform:uppercase;color:' + C.gold + ';padding-bottom:14px;">' + esc(v.eyebrow) + '</div>' +
      '<h1 style="margin:0 0 18px;font-family:' + SERIF + ';font-size:30px;line-height:1.2;font-weight:normal;color:' + C.white + ';">' + esc(v.heading) + '</h1>' +
      pill +
      '<p style="margin:22px 0 0;font-family:' + SANS + ';font-size:15px;line-height:1.7;color:' + C.text + ';">' + esc(v.intro(firstName)) + '</p>' +
    '</td></tr>' +

    // Details panel
    '<tr><td style="padding:26px 32px 4px;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.panel + ';border:1px solid ' + C.line + ';">' +
        '<tr><td style="padding:6px 22px;">' +
          '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + details + '</table>' +
        '</td></tr>' +
      '</table>' +
    '</td></tr>' +

    // Quick actions: calendar (Apple/Outlook .ics + Google) and route
    (confirmed && ev ?
    '<tr><td style="padding:16px 28px 0;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
        smallButton(events.icsUrl(ev), 'Add to calendar') +
        smallButton(events.mapsUrl(r.event_venue || ev.venue), 'Route') +
      '</tr></table>' +
      '<div style="font-family:' + SANS + ';font-size:12px;color:' + C.muted + ';text-align:center;padding-top:10px;">Using Google Calendar? <a href="' + esc(events.googleCalendarUrl(ev)) + '" target="_blank" style="color:' + C.goldLight + ';text-decoration:underline;">Add it here</a></div>' +
    '</td></tr>' : '') +

    // Note
    '<tr><td style="padding:26px 32px 4px;">' +
      '<div style="font-family:' + SANS + ';font-size:11px;letter-spacing:2px;text-transform:uppercase;color:' + C.goldLight + ';padding-bottom:8px;">' + esc(v.noteTitle) + '</div>' +
      '<p style="margin:0;font-family:' + SANS + ';font-size:14px;line-height:1.7;color:' + C.text + ';">' + esc(v.note) + '</p>' +
    '</td></tr>' +

    // Button (bulletproof)
    '<tr><td align="center" style="padding:30px 32px 38px;">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="' + C.gold + '" style="background:' + C.gold + ';">' +
        '<a href="' + APP_URL + '" target="_blank" style="display:inline-block;padding:15px 38px;font-family:' + SANS + ';font-size:12px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#000000;text-decoration:none;">' + esc(v.cta) + '</a>' +
      '</td></tr></table>' +
      (cancelHref ? '<div style="font-family:' + SANS + ';font-size:13px;color:' + C.muted + ';padding-top:18px;">Can\u2019t make it? <a href="' + esc(cancelHref) + '" target="_blank" style="color:' + C.goldLight + ';text-decoration:underline;">Release your spot</a></div>' : '') +
    '</td></tr>' +
  '</table>' +
  '</td></tr>' +

  // Inner Circle
  '<tr><td style="padding:16px 0 0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:' + C.card + ';border:1px solid ' + C.line + ';">' +
      '<tr><td style="padding:24px 28px;" align="center">' +
        '<div style="font-family:' + SANS + ';font-size:11px;letter-spacing:3px;text-transform:uppercase;color:' + C.gold + ';padding-bottom:8px;">The Inner Circle</div>' +
        '<div style="font-family:' + SERIF + ';font-size:20px;color:' + C.white + ';padding-bottom:8px;">Hear about new parties first</div>' +
        '<p style="margin:0 0 16px;font-family:' + SANS + ';font-size:14px;line-height:1.6;color:' + C.text + ';">Join our WhatsApp group and be the first to know when new nights and discount tickets drop.</p>' +
        '<a href="' + INNER_CIRCLE_URL + '" target="_blank" style="display:inline-block;padding:12px 26px;border:1px solid ' + C.gold + ';color:' + C.goldLight + ';font-family:' + SANS + ';font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;text-decoration:none;">Join the Inner Circle</a>' +
      '</td></tr>' +
    '</table>' +
  '</td></tr>' +

  // Footer
  '<tr><td align="center" style="padding:28px 20px 8px;">' +
    '<div style="font-family:' + SERIF + ';font-style:italic;font-size:15px;color:' + C.text + ';padding-bottom:12px;">Access to Amsterdam’s finest nights.</div>' +
    '<div style="font-family:' + SANS + ';font-size:12px;line-height:1.7;color:' + C.muted + ';">' +
      '<a href="' + APP_URL + '" style="color:' + C.goldLight + ';text-decoration:none;">amsterdamguestlistservice.website</a>' +
      '<br>You’re receiving this email because you requested guestlist access through the AGS app.' +
      '<br>&copy; ' + new Date().getFullYear() + ' Amsterdam Guestlist Service' +
    '</div>' +
  '</td></tr>' +

'</table></td></tr></table></body></html>';

  const text = [
    'AMSTERDAM GUESTLIST SERVICE',
    '',
    v.heading.toUpperCase() + '  [' + v.status.label + ']',
    '',
    v.intro(firstName),
    '',
    'Event: ' + (r.event_name || ''),
    'Date: ' + prettyDate(r.event_date) + (ev && ev.time ? ', from ' + ev.time : ''),
    'Venue: ' + venue.name + ', ' + venue.city,
    (v.hideGuestRows ? '' : 'Name on the list: ' + fullName + '\nGuests: ' + partyLabel(r.total_guests)),
    '',
    v.noteTitle + ': ' + v.note,
    '',
    v.cta + ': ' + APP_URL,
    (confirmed && ev ? 'Add to calendar: ' + events.icsUrl(ev) + '\nRoute: ' + events.mapsUrl(r.event_venue || ev.venue) : ''),
    (cancelHref ? "Can't make it? Release your spot: " + cancelHref : ''),
    '',
    'Join the Inner Circle (WhatsApp): ' + INNER_CIRCLE_URL,
    '',
    'Access to Amsterdam’s finest nights.'
  ].join('\n');

  return { subject: v.subject(r), html: html, text: text };
}

// Sends one guest email. Needs RESEND_API_KEY + RESEND_GUEST_FROM. Never throws.
async function sendGuestEmail(type, record) {
  try {
    const from = process.env.RESEND_GUEST_FROM;
    if (!from || !process.env.RESEND_API_KEY || !record || !record.email || !VARIANTS[type]) return false;
    const ev = await events.findEvent(record.event_name, record.event_date).catch(function () { return null; });
    const mail = renderGuestEmail(type, record, ev);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign(
        { from: from, to: record.email, subject: mail.subject, html: mail.html, text: mail.text },
        // Replies from guests go to a real inbox (GUEST_REPLY_TO) — mail you can
        // reply to is trusted more by spam filters than a dead "noreply".
        process.env.GUEST_REPLY_TO ? { reply_to: process.env.GUEST_REPLY_TO } : {}
      ))
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

module.exports = { renderGuestEmail, sendGuestEmail };
