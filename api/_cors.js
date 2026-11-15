// api/_cors.js
// The App Store build serves the app from capacitor://localhost, so the few
// endpoints the app calls directly need CORS for that origin. Returns true
// when the request was a preflight that has been answered.

const ALLOWED = ['capacitor://localhost', 'ionic://localhost', 'https://localhost', 'http://localhost'];

module.exports = function cors(req, res) {
  const origin = req.headers && req.headers.origin;
  if (origin && ALLOWED.indexOf(origin) >= 0) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
};
