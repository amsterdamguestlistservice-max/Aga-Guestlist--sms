// api/_cancel-token.js
// Signs/verifies the "Can't make it" link in guest emails, so only the
// guest who got the email can cancel that one request. Key: CANCEL_LINK_SECRET
// if set, otherwise the existing WEBHOOK_SECRET (server-side only).

const crypto = require('crypto');
const SITE = 'https://www.amsterdamguestlistservice.website';

function key() {
  return process.env.CANCEL_LINK_SECRET || process.env.WEBHOOK_SECRET || '';
}

function sign(requestId) {
  if (!key() || !requestId) return '';
  return crypto.createHmac('sha256', key()).update('cancel:' + requestId).digest('hex').slice(0, 32);
}

function verify(requestId, token) {
  const expected = sign(requestId);
  if (!expected || !token || String(token).length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(token)));
}

function cancelUrl(requestId) {
  const t = sign(requestId);
  return t ? SITE + '/api/cancel-request?id=' + encodeURIComponent(requestId) + '&t=' + t : '';
}

module.exports = { sign, verify, cancelUrl };
