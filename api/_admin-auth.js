// api/_admin-auth.js
//
// Who may use the admin endpoints:
//   1. the dashboard password (x-notify-secret = NOTIFY_ADMIN_SECRET), or
//   2. a logged-in app user (Authorization: Bearer <supabase access token>)
//      whose email is listed in ADMIN_EMAILS (comma separated, Vercel env).
// The email list lives in Vercel, not in this public repo.

const { createClient } = require('@supabase/supabase-js');

function adminEmails() {
  return String(process.env.ADMIN_EMAILS || '')
    .split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
}

async function isAdmin(req) {
  const secret = String(req.headers['x-notify-secret'] || '').trim();
  const expected = String(process.env.NOTIFY_ADMIN_SECRET || '').trim();
  if (secret && expected && secret === expected) return { ok: true, via: 'secret' };

  const auth = String(req.headers.authorization || '');
  const token = auth.toLowerCase().indexOf('bearer ') === 0 ? auth.slice(7).trim() : '';
  if (!token) return { ok: false };
  const list = adminEmails();
  if (!list.length || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return { ok: false };
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase.auth.getUser(token);
    const email = data && data.user && data.user.email ? data.user.email.toLowerCase() : '';
    if (error || !email) return { ok: false };
    return list.indexOf(email) >= 0 ? { ok: true, via: 'account', email: email } : { ok: false };
  } catch (e) {
    return { ok: false };
  }
}

module.exports = { isAdmin };
