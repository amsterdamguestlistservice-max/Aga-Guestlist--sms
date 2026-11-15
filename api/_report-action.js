// api/report-action.js
//
// One-tap handling of a Backroom report from the admin email.
//   GET  -> confirm page (GET never changes anything; mail scanners open links)
//   POST remove  -> bans the member from the Backroom, deletes their
//                   messages and membership, marks all their reports handled
//   POST dismiss -> marks this report handled
// Links are HMAC-signed and expire (see _report-token.js).

const { createClient } = require('@supabase/supabase-js');
const token = require('./_report-token');
const LOGO = require('./_logo');

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function send(res, status, title, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>' + esc(title) + ' — AGS Admin</title><style>' +
    'body{margin:0;background:#000;color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;box-sizing:border-box}' +
    '.card{max-width:440px;width:100%;background:#0B0B0B;border:1px solid #2A2418;border-top:2px solid #C9A24A;padding:30px 24px;text-align:center}' +
    'img{width:58px;height:58px;border-radius:50%}.eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A24A;margin:18px 0 8px}' +
    'h1{font-family:Georgia,serif;font-weight:normal;font-size:25px;margin:0 0 14px}p{color:#CFCFCF;line-height:1.6;font-size:15px;margin:0 0 20px}' +
    'button{display:block;width:100%;padding:16px;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border:0;cursor:pointer;font-family:inherit}' +
    '.danger{background:#6b1f2b;color:#fff}.gold{background:#C9A24A;color:#000}' +
    '</style></head><body><div class="card"><img src="' + LOGO + '" alt="AGS">' + body + '</div></body></html>');
}

module.exports = async function handler(req, res) {
  const q = req.query || {};
  const id = String(q.id || ''), action = String(q.a || ''), exp = String(q.e || ''), t = String(q.t || '');
  if (!token.verify(id, action, exp, t)) {
    send(res, 400, 'Link expired', '<div class="eyebrow">Admin</div><h1>This link is no longer valid</h1><p>It may have expired.</p>');
    return;
  }
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: rep } = await supabase.from('salon_reports').select('id, reported_id, reason, handled_at').eq('id', id).maybeSingle();
  if (!rep) { send(res, 404, 'Not found', '<div class="eyebrow">Admin</div><h1>Report not found</h1><p>The member or reporter may have deleted their account.</p>'); return; }
  const { data: mem } = await supabase.from('salon_members').select('display_name').eq('user_id', rep.reported_id).maybeSingle();
  const name = (mem && mem.display_name) || 'This member';

  if (req.method === 'POST') {
    const now = new Date().toISOString();
    if (action === 'remove') {
      await supabase.from('salon_bans').upsert({ user_id: rep.reported_id, reason: rep.reason || 'Reported in the Backroom' });
      await supabase.from('salon_messages').delete().eq('sender_id', rep.reported_id);
      await supabase.from('event_salon_messages').delete().eq('sender_id', rep.reported_id);
      await supabase.from('salon_members').delete().eq('user_id', rep.reported_id);
      await supabase.from('salon_reports').update({ handled_at: now }).eq('reported_id', rep.reported_id).is('handled_at', null);
      send(res, 200, 'Removed', '<div class="eyebrow">Done</div><h1>' + esc(name) + ' is removed</h1><p>Their messages are deleted and they can no longer join or post in the Backroom.</p>');
    } else {
      await supabase.from('salon_reports').update({ handled_at: now }).eq('id', id);
      send(res, 200, 'Handled', '<div class="eyebrow">Done</div><h1>Report closed</h1><p>No action was taken against ' + esc(name) + '.</p>');
    }
    return;
  }

  const handled = rep.handled_at ? '<p>This report was already handled on ' + esc(new Date(rep.handled_at).toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam' })) + '.</p>' : '';
  const post = '/api/report-action?id=' + encodeURIComponent(id) + '&a=' + action + '&e=' + encodeURIComponent(exp) + '&t=' + encodeURIComponent(t);
  send(res, 200, 'Backroom report',
    '<div class="eyebrow">Backroom report</div>' +
    (action === 'remove'
      ? '<h1>Remove ' + esc(name) + ' from the Backroom?</h1><p>Their messages are deleted and they can’t join or post again. Their AGS account itself stays.</p>' + handled +
        '<form method="post" action="' + esc(post) + '"><button class="danger" type="submit">Yes, remove</button></form>'
      : '<h1>Close this report?</h1><p>No action is taken against ' + esc(name) + '.</p>' + handled +
        '<form method="post" action="' + esc(post) + '"><button class="gold" type="submit">Close report</button></form>'));
};
