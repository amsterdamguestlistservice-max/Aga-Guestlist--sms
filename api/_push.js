// api/_push.js
//
// One send function for every kind of push subscription in
// push_subscriptions:
//   - web push (browsers / home-screen app): normal endpoint URL -> web-push
//   - iPhone App Store app: endpoint "apns:<device token>"      -> Apple APNs
//
// APNs needs these environment variables (from the Apple Developer account,
// Keys → "Apple Push Notifications service"):
//   APNS_KEY        contents of the .p8 key file
//   APNS_KEY_ID     the 10-character Key ID
//   APNS_TEAM_ID    the 10-character Team ID
//   APNS_BUNDLE_ID  the app's bundle id (default: website.amsterdamguestlistservice.app)
//   APNS_SANDBOX    "1" while testing with Xcode/TestFlight development builds
// Without them, native tokens are simply skipped (web push keeps working).
//
// Errors are thrown with statusCode 410 for dead tokens, so the existing
// "delete subscription on 404/410" cleanup in the callers keeps working.

const crypto = require('crypto');
const http2 = require('http2');

let cachedJwt = null, cachedAt = 0;

function apnsJwt() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedJwt && now - cachedAt < 40 * 60) return cachedJwt;
  const b64 = function (o) { return Buffer.from(JSON.stringify(o)).toString('base64url'); };
  const unsigned = b64({ alg: 'ES256', kid: process.env.APNS_KEY_ID }) + '.' + b64({ iss: process.env.APNS_TEAM_ID, iat: now });
  const key = String(process.env.APNS_KEY).replace(/\\n/g, '\n');
  const sig = crypto.sign('sha256', Buffer.from(unsigned), { key: key, dsaEncoding: 'ieee-p1363' }).toString('base64url');
  cachedJwt = unsigned + '.' + sig; cachedAt = now;
  return cachedJwt;
}

function apnsConfigured() {
  return !!(process.env.APNS_KEY && process.env.APNS_KEY_ID && process.env.APNS_TEAM_ID);
}

function sendApns(deviceToken, payloadString) {
  const p = JSON.parse(payloadString || '{}');
  const body = JSON.stringify({
    aps: { alert: { title: p.title || 'AGS', body: p.body || '' }, sound: 'default' },
    url: p.url || '',
    pid: p.pid || ''
  });
  const host = process.env.APNS_SANDBOX === '1' ? 'https://api.sandbox.push.apple.com' : 'https://api.push.apple.com';
  return new Promise(function (resolve, reject) {
    const client = http2.connect(host);
    client.on('error', function (e) { reject(e); });
    const req = client.request({
      ':method': 'POST',
      ':path': '/3/device/' + deviceToken,
      'authorization': 'bearer ' + apnsJwt(),
      'apns-topic': process.env.APNS_BUNDLE_ID || 'website.amsterdamguestlistservice.app',
      'apns-push-type': 'alert',
      'content-type': 'application/json'
    });
    let status = 0, data = '';
    req.on('response', function (h) { status = h[':status']; });
    req.on('data', function (c) { data += c; });
    req.on('end', function () {
      client.close();
      if (status === 200) return resolve();
      const reason = (function () { try { return JSON.parse(data).reason; } catch (e) { return ''; } })();
      const err = new Error('APNs ' + status + ' ' + reason);
      err.statusCode = (status === 410 || reason === 'BadDeviceToken' || reason === 'Unregistered') ? 410 : status;
      reject(err);
    });
    req.on('error', function (e) { client.close(); reject(e); });
    req.end(body);
  });
}

// Every push gets a "pid" (same for all recipients of one message: title +
// text + day), so taps can be counted per message in push_clicks.
function withPid(payloadString) {
  try {
    const p = JSON.parse(payloadString || '{}');
    if (!p.pid) {
      const day = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
      p.pid = crypto.createHash('sha1').update((p.title || '') + '|' + (p.body || '') + '|' + day).digest('hex').slice(0, 16);
    }
    return JSON.stringify(p);
  } catch (e) { return payloadString; }
}

// In-app inbox: every delivered push is also saved for that account
// (once per message, even with several devices). Never blocks a push.
let inboxClient = null;
function inboxDb() {
  if (inboxClient) return inboxClient;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const { createClient } = require('@supabase/supabase-js');
  inboxClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  return inboxClient;
}
async function logInbox(endpoint, payloadString) {
  try {
    const p = JSON.parse(payloadString || '{}');
    if (String(p.url || '').indexOf('/admin') === 0) return; // team-only alerts stay out of the inbox
    const db = inboxDb(); if (!db) return;
    await db.rpc('log_inbox', { p_endpoint: endpoint, p_pid: p.pid || '', p_title: p.title || '', p_body: p.body || '', p_url: p.url || '' });
  } catch (e) { /* optional */ }
}

// Save a personal message in someone's in-app inbox, also when they have no
// push turned on. Same pid as the push itself, so it's never there twice.
async function saveInbox(userId, payload) {
  try {
    if (!userId) return;
    const db = inboxDb(); if (!db) return;
    const p = JSON.parse(withPid(JSON.stringify(payload || {})));
    await db.from('inbox').upsert({ user_id: userId, pid: p.pid, title: p.title || '', body: p.body || '', url: p.url || './index.html' },
      { onConflict: 'user_id,pid', ignoreDuplicates: true });
  } catch (e) { /* optional */ }
}

async function sendPush(webpush, sub, payloadString) {
  payloadString = withPid(payloadString);
  const endpoint = String((sub && sub.endpoint) || '');
  let result;
  if (endpoint.indexOf('apns:') === 0) {
    if (!apnsConfigured()) { const e = new Error('APNs not configured'); e.statusCode = 0; throw e; }
    result = await sendApns(endpoint.slice(5), payloadString);
  } else {
    result = await webpush.sendNotification(sub, payloadString);
  }
  await logInbox(endpoint, payloadString);
  return result;
}

module.exports = { sendPush, saveInbox, withPid };
