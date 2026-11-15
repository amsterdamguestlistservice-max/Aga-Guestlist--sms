// api/cancel-request.js
//
// The "Can't make it?" link in guest emails.
//   GET  -> branded confirm page ("Cancel my spot" / "Keep my spot").
//           GET never changes anything, so email link scanners that open
//           links automatically can't cancel someone's spot by accident.
//   POST -> cancels the request (status 'Cancelled'), releases the claimed
//           spot so someone else can have it, shows a thank-you page.
// The link is HMAC-signed per request (see _cancel-token.js).

const { createClient } = require('@supabase/supabase-js');
const token = require('./_cancel-token');
const events = require('./_events');
const { notifyForEvent } = require('./waitlist-notify');

const LOGO_URL = require('./_logo');

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

function prettyDate(iso) {
  const d = new Date(String(iso).slice(0, 10) + 'T12:00:00Z');
  return isNaN(d) ? String(iso || '') : d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Amsterdam' });
}

function page(title, bodyHtml) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="robots" content="noindex,nofollow"><title>' + esc(title) + ' — AGS</title>' +
    '<style>' +
    'body{margin:0;background:#000;color:#F5F5F5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;box-sizing:border-box}' +
    '.card{max-width:440px;width:100%;background:#0B0B0B;border:1px solid #2A2418;border-top:2px solid #C9A24A;padding:36px 28px;text-align:center}' +
    'img{width:72px;height:72px;border-radius:50%;display:block;margin:0 auto}' +
    '.eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A24A;margin:22px 0 10px}' +
    'h1{font-family:Georgia,"Times New Roman",serif;font-weight:normal;font-size:27px;line-height:1.25;margin:0 0 14px}' +
    'p{color:#CFCFCF;line-height:1.65;font-size:15px;margin:0 0 22px}' +
    '.event{border:1px solid #2A2418;background:#121212;padding:16px;margin:0 0 26px;line-height:1.6}' +
    '.event strong{font-family:Georgia,serif;font-weight:normal;font-size:18px;color:#F5F5F5}' +
    '.event span{color:#8A8A8A;font-size:14px}' +
    'button,.btn{display:block;width:100%;box-sizing:border-box;padding:15px;font-size:12px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;text-decoration:none;cursor:pointer;border:0;margin-bottom:12px;font-family:inherit}' +
    'button{background:#C9A24A;color:#000}' +
    '.btn{background:transparent;color:#E6C875;border:1px solid #C9A24A}' +
    '</style></head><body><div class="card"><img src="' + LOGO_URL + '" alt="AGS">' + bodyHtml + '</div></body></html>';
}

function eventBox(r) {
  return '<div class="event"><strong>' + esc(r.event_name) + '</strong><br><span>' +
    esc(prettyDate(r.event_date)) + ' · ' + esc(events.venueParts(r.event_venue).name) + '</span></div>';
}

function send(res, status, title, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send(page(title, body));
}

module.exports = async function handler(req, res) {
  const id = String((req.query && req.query.id) || '');
  const t = String((req.query && req.query.t) || '');
  const appBtn = '<a class="btn" href="' + events.APP_URL + '">Open the app</a>';

  if (!/^[0-9a-f-]{36}$/i.test(id) || !token.verify(id, t)) {
    send(res, 400, 'Link not valid', '<div class="eyebrow">Guestlist</div><h1>This link isn’t valid</h1>' +
      '<p>Open the app to manage your guestlist requests.</p>' + appBtn);
    return;
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: r } = await supabase.from('guestlist_requests')
    .select('id, first_name, event_name, event_venue, event_date, status').eq('id', id).maybeSingle();
  if (!r) {
    send(res, 404, 'Not found', '<div class="eyebrow">Guestlist</div><h1>Request not found</h1><p>This request no longer exists.</p>' + appBtn);
    return;
  }

  const status = String(r.status || 'Pending').toLowerCase();
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });

  if (status === 'cancelled') {
    send(res, 200, 'Already cancelled', '<div class="eyebrow">Guestlist</div><h1>Your spot is already released</h1>' +
      eventBox(r) + '<p>Thanks for letting us know. We hope to see you at another night soon.</p>' + appBtn);
    return;
  }
  if (String(r.event_date) < today || (status !== 'pending' && status !== 'approved')) {
    send(res, 200, 'Can’t cancel', '<div class="eyebrow">Guestlist</div><h1>This request can’t be cancelled anymore</h1>' +
      eventBox(r) + appBtn);
    return;
  }

  if (req.method === 'POST') {
    const ev = await events.findEvent(r.event_name, r.event_date);
    const { data: result, error } = await supabase.rpc('cancel_guestlist_request_by_link', {
      p_request_id: id, p_event_id: ev ? ev.id : null
    });
    if (!error && result && result.success && result.released && ev) {
      try { await notifyForEvent(supabase, ev.id); } catch (e) { /* never block the guest */ }
    }
    if (error || !result || !result.success) {
      send(res, 500, 'Something went wrong', '<div class="eyebrow">Guestlist</div><h1>Something went wrong</h1>' +
        '<p>Your spot could not be cancelled. Please try again, or cancel it in the app.</p>' + appBtn);
      return;
    }
    send(res, 200, 'Spot released', '<div class="eyebrow">Spot released</div><h1>Thanks for letting us know</h1>' +
      eventBox(r) + '<p>Your guestlist spot has been released, so someone else can enjoy the night. ' +
      'No points have been deducted. See you at the next one.</p>' + appBtn);
    return;
  }

  const action = '/api/cancel-request?id=' + encodeURIComponent(id) + '&t=' + encodeURIComponent(t);
  send(res, 200, 'Can’t make it?', '<div class="eyebrow">Can’t make it?</div>' +
    '<h1>Release your guestlist spot?</h1>' + eventBox(r) +
    '<p>If you can’t make it, release your spot so someone else can go. You won’t lose any points.</p>' +
    '<form method="post" action="' + esc(action) + '"><button type="submit">Yes, release my spot</button></form>' +
    '<a class="btn" href="' + events.APP_URL + '">Keep my spot</a>');
};
