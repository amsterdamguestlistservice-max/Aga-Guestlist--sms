// api/_report-token.js
// Signed, expiring action links for Backroom reports in the admin email
// ("Remove from Backroom" / "No action needed"). Key never leaves the server.

const crypto = require('crypto');
const SITE = 'https://www.amsterdamguestlistservice.website';
const VALID_DAYS = 14;
const ACTIONS = /^(remove|dismiss)$/;

function key() { return process.env.ADMIN_KEY || process.env.WEBHOOK_SECRET || ''; }

function sign(id, action, exp) {
  if (!key()) return '';
  return crypto.createHmac('sha256', key()).update('report:' + id + ':' + action + ':' + exp).digest('hex').slice(0, 40);
}

function makeUrl(id, action) {
  const exp = Math.floor(Date.now() / 1000) + VALID_DAYS * 86400;
  const t = sign(id, action, exp);
  return t ? SITE + '/api/report-action?id=' + encodeURIComponent(id) + '&a=' + action + '&e=' + exp + '&t=' + t : '';
}

function verify(id, action, exp, token) {
  if (!ACTIONS.test(action || '')) return false;
  if (!exp || Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(id, action, exp);
  if (!expected || !token || String(token).length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(token)));
}

module.exports = { makeUrl, verify };
