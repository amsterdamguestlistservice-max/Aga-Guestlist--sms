// api/_wallet.js
//
// Apple Wallet pass for an approved guestlist spot.
//
//   GET  /api/ags?fn=wallet-status          -> { enabled } (are the certificates set?)
//   POST /api/ags?fn=wallet-link  (Bearer)  -> { url } signed download link, owner only
//   GET  /api/ags?fn=wallet&r=<id>&t=<sig>  -> the .pkpass file (opens "Add to Wallet")
//
// The pass shows the party, date, venue, name and party size, and appears on
// the lock screen on the night itself (relevantDate).
//
// Needs these Vercel environment variables (set by AGS, never in the repo):
//   PASS_TYPE_ID          e.g. pass.website.amsterdamguestlistservice.guestlist
//   APPLE_TEAM_ID         the 10-character Team ID of the Apple developer account
//   PASS_CERT_P12_BASE64  the Pass Type ID certificate + private key (.p12), base64
//   PASS_CERT_PASSWORD    the password of that .p12 (may be empty)
// Optional: PASS_WWDR_PEM (Apple WWDR G4 certificate); otherwise it is
// downloaded from apple.com once per cold start.

const crypto = require('crypto');
const forge = require('node-forge');
const { createClient } = require('@supabase/supabase-js');
const events = require('./_events');
const ASSETS = require('./_wallet-assets');

// The pass link lives on the apex domain, so the iPhone app (which runs on
// www) hands it to Safari, and Safari opens "Add to Apple Wallet".
const PASS_HOST = 'https://amsterdamguestlistservice.website';
const WWDR_URL = 'https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer';

function configured() {
  return !!(process.env.PASS_TYPE_ID && process.env.APPLE_TEAM_ID && process.env.PASS_CERT_P12_BASE64);
}

function sign(id) {
  const key = process.env.CANCEL_LINK_SECRET || process.env.WEBHOOK_SECRET || '';
  return key ? crypto.createHmac('sha256', key).update('wallet:' + id).digest('hex').slice(0, 32) : '';
}
function verify(id, t) {
  const e = sign(id);
  return !!(e && t && String(t).length === e.length && crypto.timingSafeEqual(Buffer.from(e), Buffer.from(String(t))));
}
function db() { return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); }
function isApproved(r) { return String((r && r.status) || '').trim().toLowerCase() === 'approved'; }

// ---------- certificates ----------
let wwdrCache = null;
async function wwdrCert() {
  if (wwdrCache) return wwdrCache;
  if (process.env.PASS_WWDR_PEM) { wwdrCache = forge.pki.certificateFromPem(process.env.PASS_WWDR_PEM); return wwdrCache; }
  const res = await fetch(WWDR_URL);
  if (!res.ok) throw new Error('Could not load Apple WWDR certificate');
  const der = Buffer.from(await res.arrayBuffer()).toString('binary');
  wwdrCache = forge.pki.certificateFromAsn1(forge.asn1.fromDer(der));
  return wwdrCache;
}
function passIdentity() {
  const p12Der = Buffer.from(process.env.PASS_CERT_P12_BASE64, 'base64').toString('binary');
  const p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(p12Der), false, process.env.PASS_CERT_PASSWORD || '');
  const certBag = (p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag] || [])[0];
  const keyBag = (p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag] || [])[0] ||
    (p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag] || [])[0];
  if (!certBag || !keyBag) throw new Error('Pass certificate (.p12) is missing the certificate or key');
  return { cert: certBag.cert, key: keyBag.key };
}
async function signManifest(manifest) {
  const id = passIdentity();
  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifest, 'raw');
  p7.addCertificate(id.cert);
  p7.addCertificate(await wwdrCert());
  p7.addSigner({
    key: id.key, certificate: id.cert, digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date() }
    ]
  });
  p7.sign({ detached: true });
  return Buffer.from(forge.asn1.toDer(p7.toAsn1()).getBytes(), 'binary');
}

// ---------- tiny zip writer (stored, no compression) ----------
const CRC = (function () { const t = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(buf) { let c = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function zip(files) {
  const locals = [], centrals = []; let offset = 0;
  Object.keys(files).forEach(function (name) {
    const data = files[name], nameBuf = Buffer.from(name), crc = crc32(data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0, 6); lh.writeUInt16LE(0, 8);
    lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x21, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nameBuf.length, 26); lh.writeUInt16LE(0, 28);
    locals.push(lh, nameBuf, data);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0, 8); ch.writeUInt16LE(0, 10);
    ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0x21, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(data.length, 24);
    ch.writeUInt16LE(nameBuf.length, 28); ch.writeUInt32LE(offset, 42);
    centrals.push(ch, nameBuf);
    offset += 30 + nameBuf.length + data.length;
  });
  const cd = Buffer.concat(centrals), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(Object.keys(files).length, 8); end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat(locals.concat([cd, end]));
}

// ---------- pass content ----------
function guestNames(r) {
  const extra = Array.isArray(r.additional_guests) ? r.additional_guests : [];
  return [[r.first_name, r.last_name].filter(Boolean).join(' ')]
    .concat(extra.map(function (g) { return [g && (g.firstName || g.first_name), g && (g.lastName || g.last_name)].filter(Boolean).join(' '); }))
    .filter(Boolean);
}
function passJson(r, ev) {
  const date = String(r.event_date).slice(0, 10);
  const start = events.eventTimes({ date: date, time: ev && ev.time }).start;
  const venue = events.venueParts(r.event_venue || (ev && ev.venue));
  const n = Number(r.total_guests) || 1;
  const day = new Date(date + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
  const names = guestNames(r);
  return {
    formatVersion: 1,
    passTypeIdentifier: process.env.PASS_TYPE_ID,
    teamIdentifier: process.env.APPLE_TEAM_ID,
    serialNumber: String(r.id),
    organizationName: 'Amsterdam Guestlist Service',
    description: 'AGS guestlist · ' + r.event_name,
    logoText: 'Amsterdam Guestlist',
    foregroundColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgb(8, 8, 8)',
    labelColor: 'rgb(212, 175, 55)',
    relevantDate: start.toISOString(),
    expirationDate: new Date(start.getTime() + 12 * 3600 * 1000).toISOString(),
    eventTicket: {
      headerFields: [{ key: 'party', label: 'PARTY', value: n === 1 ? 'Just you' : n + ' people' }],
      primaryFields: [{ key: 'event', label: 'ON THE GUESTLIST', value: r.event_name }],
      secondaryFields: [
        { key: 'date', label: 'DATE', value: day + (ev && ev.time ? ' · ' + ev.time : '') },
        { key: 'venue', label: 'VENUE', value: venue.name, textAlignment: 'PKTextAlignmentRight' }
      ],
      auxiliaryFields: [{ key: 'name', label: 'NAME ON THE LIST', value: names[0] || 'Guest' }],
      backFields: [
        { key: 'guests', label: 'On the list', value: names.join('\n') },
        { key: 'door', label: 'At the door', value: 'Bring a valid photo ID for everyone in your group and arrive on time.' },
        { key: 'cancel', label: 'Can’t make it?', value: 'Cancel in the AGS app, so your spot goes to someone else. No-shows cost points.' },
        { key: 'app', label: 'AGS app', value: events.APP_URL },
        { key: 'support', label: 'Questions', value: 'amsterdamguestlistservice@gmail.com' }
      ]
    }
  };
}
async function buildPass(r, ev) {
  const files = {};
  files['pass.json'] = Buffer.from(JSON.stringify(passJson(r, ev)));
  Object.keys(ASSETS).forEach(function (k) { files[k] = Buffer.from(ASSETS[k], 'base64'); });
  const manifest = {};
  Object.keys(files).forEach(function (k) { manifest[k] = crypto.createHash('sha1').update(files[k]).digest('hex'); });
  files['manifest.json'] = Buffer.from(JSON.stringify(manifest));
  files['signature'] = await signManifest(files['manifest.json'].toString('binary'));
  return zip(files);
}

// ---------- handlers ----------
async function status(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json({ enabled: configured() });
}

async function link(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }
  if (!configured()) { res.status(200).json({ ok: false, reason: 'not_configured' }); return; }
  const jwt = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const id = String((req.body && req.body.id) || '');
  if (!jwt || !id) { res.status(400).json({ error: 'Missing request' }); return; }
  const sb = db();
  const { data: who } = await sb.auth.getUser(jwt);
  const uid = who && who.user && who.user.id;
  if (!uid) { res.status(401).json({ error: 'Unauthorized' }); return; }
  const { data: r } = await sb.from('guestlist_requests').select('id, user_id, status').eq('id', id).maybeSingle();
  if (!r || r.user_id !== uid) { res.status(404).json({ error: 'Not found' }); return; }
  if (!isApproved(r)) { res.status(200).json({ ok: false, reason: 'not_approved' }); return; }
  res.status(200).json({ ok: true, url: PASS_HOST + '/api/ags?fn=wallet&r=' + encodeURIComponent(id) + '&t=' + sign(id) });
}

async function pass(req, res) {
  const id = String((req.query && req.query.r) || ''), t = String((req.query && req.query.t) || '');
  if (!id || !verify(id, t)) { res.status(403).send('This link is not valid.'); return; }
  if (!configured()) { res.status(503).send('Apple Wallet passes are not available yet.'); return; }
  try {
    const { data: r } = await db().from('guestlist_requests')
      .select('id, status, event_name, event_venue, event_date, first_name, last_name, total_guests, additional_guests').eq('id', id).maybeSingle();
    if (!r || !isApproved(r)) { res.status(404).send('This guestlist spot is not confirmed (anymore). Check the AGS app.'); return; }
    const ev = await events.findEvent(r.event_name, r.event_date);
    const buf = await buildPass(r, ev);
    res.setHeader('Content-Type', 'application/vnd.apple.pkpass');
    res.setHeader('Content-Disposition', 'attachment; filename="ags-guestlist.pkpass"');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(buf);
  } catch (e) {
    res.status(500).send('Could not create the pass right now.');
  }
}

module.exports = { status, link, pass, _buildPass: buildPass, _passJson: passJson };
