// api/calendar.js
//
// GET /api/calendar?e=<event id>  ->  .ics file for that event, so the
// "Add to calendar" button in guest emails opens straight in Apple
// Calendar / Outlook. Public on purpose: it only contains public event
// info (name, time, venue) — never anything about the guest.

const ev = require('./_events');

function icsEscape(s) {
  return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

module.exports = async function handler(req, res) {
  const id = String((req.query && req.query.e) || '');
  const event = id ? await ev.findEventById(id) : null;
  if (!event) {
    res.status(404).send('Event not found');
    return;
  }
  const t = ev.eventTimes(event);
  const v = ev.venueParts(event.venue);
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amsterdam Guestlist Service//Guestlist//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + icsEscape(event.id) + '@amsterdamguestlistservice.website',
    'DTSTAMP:' + ev.utcStamp(new Date()),
    'DTSTART:' + ev.utcStamp(t.start),
    'DTEND:' + ev.utcStamp(t.end),
    'SUMMARY:' + icsEscape(event.name + ' — on the guestlist'),
    'LOCATION:' + icsEscape(v.name + ', ' + v.city),
    'DESCRIPTION:' + icsEscape("You're on the AGS guestlist. Arrive on time and bring a valid photo ID.\n" + ev.APP_URL),
    'URL:' + ev.APP_URL,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    'DESCRIPTION:' + icsEscape('Tonight: ' + event.name + ' — you are on the guestlist'),
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline; filename="' + event.id + '.ics"');
  res.setHeader('Cache-Control', 'public, max-age=600');
  res.status(200).send(ics);
};
