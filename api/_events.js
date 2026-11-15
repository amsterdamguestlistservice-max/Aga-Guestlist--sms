// api/_events.js
//
// Server-side access to the app's event list (the EVENTS array in
// app/app.js), so emails and the calendar endpoint can show the flyer,
// start time and venue. It reads the live, public app.js from our own
// site — the single source of truth — and caches it for 10 minutes.
// Files starting with "_" inside /api are not exposed as endpoints.

const vm = require('vm');

const SITE = 'https://www.amsterdamguestlistservice.website';
const APP_URL = SITE + '/app/';
let cache = { at: 0, events: [] };

async function loadEvents() {
  if (Date.now() - cache.at < 10 * 60 * 1000 && cache.events.length) return cache.events;
  try {
    const res = await fetch(SITE + '/app/app.js', { headers: { 'Cache-Control': 'no-cache' } });
    if (!res.ok) return cache.events;
    const src = await res.text();
    const start = src.indexOf('const EVENTS = [');
    const end = src.indexOf('\n];', start);
    if (start < 0 || end < 0) return cache.events;
    const literal = src.slice(start + 'const EVENTS = '.length, end + 2);
    const events = vm.runInNewContext('(' + literal + ')', {}, { timeout: 500 });
    if (Array.isArray(events)) cache = { at: Date.now(), events: events };
  } catch (e) { /* keep last good copy */ }
  return cache.events;
}

// Requests store event_name + event_date (not the id), so match on those.
async function findEvent(name, date) {
  const events = await loadEvents();
  const d = String(date || '').slice(0, 10);
  return events.find(function (e) { return e.name === name && e.date === d; }) || null;
}

async function findEventById(id) {
  const events = await loadEvents();
  return events.find(function (e) { return e.id === id; }) || null;
}

// Absolute flyer URL, or '' when the event has no usable image.
function flyerUrl(ev) {
  if (!ev || !ev.image || /^data:/.test(ev.image)) return '';
  if (/^https?:\/\//.test(ev.image)) return ev.image;
  return APP_URL + String(ev.image).replace(/^\.?\//, '');
}

// "YYYY-MM-DD" + "HH:MM" in Amsterdam time -> Date (UTC instant).
function amsterdamToDate(date, time) {
  const t = /^\d{1,2}:\d{2}$/.test(time || '') ? time : '23:00';
  const guess = new Date(date + 'T' + (t.length === 4 ? '0' + t : t) + ':00Z');
  // Find Amsterdam's UTC offset on that day (CET +1 / CEST +2).
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hourCycle: 'h23' }).formatToParts(guess);
  const amsHour = Number(parts.find(function (p) { return p.type === 'hour'; }).value);
  let offset = amsHour - guess.getUTCHours();
  if (offset < -12) offset += 24;
  if (offset > 12) offset -= 24;
  return new Date(guess.getTime() - offset * 3600 * 1000);
}

function eventTimes(ev) {
  const start = amsterdamToDate(ev.date, ev.time);
  const end = new Date(start.getTime() + 5 * 3600 * 1000); // default 5h night
  return { start: start, end: end };
}

function venueParts(venue) {
  const parts = String(venue || '').split(' · ');
  return { name: parts[0] || '', city: parts[1] || 'Amsterdam' };
}

function mapsUrl(venue) {
  const v = venueParts(venue);
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(v.name + ', ' + v.city);
}

function utcStamp(d) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function googleCalendarUrl(ev) {
  const t = eventTimes(ev);
  const v = venueParts(ev.venue);
  return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' + encodeURIComponent(ev.name + ' — on the guestlist') +
    '&dates=' + utcStamp(t.start) + '/' + utcStamp(t.end) +
    '&location=' + encodeURIComponent(v.name + ', ' + v.city) +
    '&details=' + encodeURIComponent("You're on the AGS guestlist. Arrive on time and bring a valid photo ID.\n" + APP_URL);
}

function icsUrl(ev) {
  return SITE + '/api/calendar?e=' + encodeURIComponent(ev.id);
}

module.exports = { SITE, APP_URL, loadEvents, findEvent, findEventById, flyerUrl, eventTimes, venueParts, mapsUrl, utcStamp, googleCalendarUrl, icsUrl };
