// api/quick-review.js
//
// Approve / Decline a guestlist request straight from the admin email.
//   GET  -> confirm page with the guest's details and one big button.
//           GET never changes anything (mail link scanners open links).
//   POST -> sets the status, but only while the request is still Pending,
//           so an old email can never overwrite a later decision. The
//           existing database webhook then does the rest (points, guest
//           email "You're on the list", push).
// Links are HMAC-signed per request + action and expire (_review-token.js).

const { createClient } = require('@supabase/supabase-js');
const token = require('./_review-token');
const LOGO = require('./_logo');

const DASHBOARD = 'https://www.amsterdamguestlistservice.website/admin/requests.html';

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}
function prettyDate(iso) {
  const d = new Date(String(iso).slice(0, 10) + 'T12:00:00Z');
  return isNaN(d) ? String(iso || '') : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Amsterdam' });
}

function page(title, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow"><title>' + esc(title) + ' — AGS Admin</title><style>' +
    'body{margin:0;background:#000;color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;box-sizing:border-box}' +
    '.card{max-width:440px;width:100%;background:#0B0B0B;border:1px solid #2A2418;border-top:2px solid #C9A24A;padding:30px 24px;text-align:center}' +
    'img{width:58px;height:58px;border-radius:50%;display:block;margin:0 auto}' +
    '.eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A24A;margin:18px 0 8px}' +
    'h1{font-family:Georgia,serif;font-weight:normal;font-size:26px;margin:0 0 16px}' +
    'table{width:100%;border-collapse:collapse;background:#121212;border:1px solid #2A2418;margin:0 0 22px;text-align:left}' +
    'td{padding:10px 12px;border-bottom:1px solid #2A2418;font-size:14px}td:first-child{color:#8A8A8A;font-size:11px;letter-spacing:1px;text-transform:uppercase;width:38%}' +
    'tr:last-child td{border-bottom:0}' +
    'button,.btn{display:block;width:100%;box-sizing:border-box;padding:16px;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border:0;cursor:pointer;margin-bottom:10px;text-decoration:none;font-family:inherit}' +
    '.approve{background:#C9A24A;color:#000}.decline{background:#3a1218;color:#ff9aa8;border:1px solid #6b2230}' +
    '.btn{background:transparent;color:#E6C875;border:1px solid #C9A24A}' +
    'p{color:#CFCFCF;line-height:1.6;font-size:15px;margin:0 0 20px}.ok{color:#E6C875}' +
    '</style></head><body><div class="card"><img src="' + LOGO + '" alt="AGS">' + body + '</div></body></html>';
}
function send(res, status, title, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send(page(title, body));
}
const dash = '<a class="btn" href="' + DASHBOARD + '">Open dashboard</a>';

module.exports = async function handler(req, res) {
  const q = req.query || {};
  const id = String(q.id || ''), action = String(q.a || ''), exp = String(q.e || ''), t = String(q.t || '');
  if (!token.verify(id, action, exp, t)) {
    send(res, 400, 'Link expired', '<div class="eyebrow">Admin</div><h1>This link is no longer valid</h1><p>It may have expired. Review the request in the dashboard.</p>' + dash);
    return;
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: r } = await supabase.from('guestlist_requests')
    .select('id, first_name, last_name, age, instagram, event_name, event_date, total_guests, status').eq('id', id).maybeSingle();
  if (!r) { send(res, 404, 'Not found', '<div class="eyebrow">Admin</div><h1>Request not found</h1>' + dash); return; }

  const name = [r.first_name, r.last_name].filter(Boolean).join(' ');
  const details = '<table>' +
    '<tr><td>Guest</td><td>' + esc(name) + (r.age ? ' (' + esc(r.age) + ')' : '') + '</td></tr>' +
    (r.instagram && r.instagram !== 'None' ? '<tr><td>Instagram</td><td>' + esc(r.instagram) + '</td></tr>' : '') +
    '<tr><td>Event</td><td>' + esc(r.event_name) + '<br><span style="color:#8A8A8A;font-size:13px">' + esc(prettyDate(r.event_date)) + '</span></td></tr>' +
    '<tr><td>Party</td><td>' + esc(r.total_guests || 1) + (Number(r.total_guests) > 1 ? ' people' : ' person') + '</td></tr>' +
    '</table>';
  const status = String(r.status || 'Pending').trim().toLowerCase();
  const target = action === 'approve' ? 'Approved' : 'Declined';

  if (status !== 'pending') {
    send(res, 200, 'Already reviewed', '<div class="eyebrow">Already reviewed</div><h1>This request is ' + esc(r.status) + '</h1>' + details +
      '<p>Nothing was changed. Use the dashboard to change it.</p>' + dash);
    return;
  }

  if (req.method === 'POST') {
    const { data: upd, error } = await supabase.from('guestlist_requests')
      .update({ status: target }).eq('id', id).eq('status', r.status || 'Pending').select('id');
    if (error || !upd || !upd.length) {
      send(res, 409, 'Not changed', '<div class="eyebrow">Admin</div><h1>Could not update</h1><p>The request changed in the meantime. Check it in the dashboard.</p>' + dash);
      return;
    }
    send(res, 200, target, '<div class="eyebrow">' + (target === 'Approved' ? 'Approved' : 'Declined') + '</div>' +
      '<h1 class="ok">' + (target === 'Approved' ? esc(r.first_name || 'Guest') + ' is on the list ✓' : 'Request declined') + '</h1>' + details +
      '<p>' + (target === 'Approved' ? 'The guest gets their confirmation email and notification automatically.' : 'The request has been declined.') + '</p>' + dash);
    return;
  }

  const action_url = '/api/quick-review?id=' + encodeURIComponent(id) + '&a=' + action + '&e=' + encodeURIComponent(exp) + '&t=' + encodeURIComponent(t);
  const other = token.makeUrl(id, action === 'approve' ? 'decline' : 'approve');
  send(res, 200, action === 'approve' ? 'Approve' : 'Decline',
    '<div class="eyebrow">Guestlist request</div><h1>' + (action === 'approve' ? 'Approve this guest?' : 'Decline this request?') + '</h1>' + details +
    '<form method="post" action="' + esc(action_url) + '"><button type="submit" class="' + (action === 'approve' ? 'approve' : 'decline') + '">' +
    (action === 'approve' ? 'Yes, approve' : 'Yes, decline') + '</button></form>' +
    (other ? '<a class="btn" href="' + esc(other.replace('https://www.amsterdamguestlistservice.website', '')) + '">' + (action === 'approve' ? 'Decline instead' : 'Approve instead') + '</a>' : ''));
};
