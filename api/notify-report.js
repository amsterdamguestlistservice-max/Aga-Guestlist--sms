// api/notify-report.js
//
// Called by a Supabase database webhook when a member files a Backroom
// report (insert on salon_reports). Emails AGS the report with the
// reported member's latest messages and two one-tap actions:
// "Remove from Backroom" and "No action needed" (see report-action.js).
// Apple requires reports in user-generated content to be acted on quickly.

const { createClient } = require('@supabase/supabase-js');
const token = require('./_report-token');

function esc(v) {
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  const expected = process.env.WEBHOOK_SECRET;
  if (expected && req.headers['x-webhook-secret'] !== expected) { res.status(401).json({ ok: false }); return; }

  const rec = (req.body && req.body.record) || {};
  if (!rec.id || !rec.reported_id) { res.status(400).json({ ok: false }); return; }
  const { RESEND_API_KEY, NOTIFY_EMAIL_TO } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL_TO) { res.status(200).json({ ok: true, result: 'skipped' }); return; }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const ids = [rec.reporter_id, rec.reported_id];
    const [{ data: members }, { data: dms }, { data: room }, { data: earlier }] = await Promise.all([
      supabase.from('salon_members').select('user_id, display_name').in('user_id', ids),
      supabase.from('salon_messages').select('body, created_at').eq('sender_id', rec.reported_id).eq('recipient_id', rec.reporter_id).order('created_at', { ascending: false }).limit(5),
      supabase.from('event_salon_messages').select('body, created_at, event_name').eq('sender_id', rec.reported_id).order('created_at', { ascending: false }).limit(5),
      supabase.from('salon_reports').select('id').eq('reported_id', rec.reported_id)
    ]);
    const name = function (id) {
      const m = (members || []).find(function (x) { return x.user_id === id; });
      return m ? m.display_name : 'Unknown member';
    };
    const reported = name(rec.reported_id), reporter = name(rec.reporter_id);
    const msgs = (dms || []).map(function (m) { return { where: 'Private chat', body: m.body, at: m.created_at }; })
      .concat((room || []).map(function (m) { return { where: m.event_name || 'Group chat', body: m.body, at: m.created_at }; }))
      .sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); }).slice(0, 6);
    const when = function (iso) { return new Date(iso).toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); };
    const count = (earlier || []).length;

    const btn = function (href, label, solid) {
      return href ? '<a href="' + esc(href) + '" style="display:inline-block;margin:0 8px 10px 0;padding:14px 22px;font:700 12px Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;text-decoration:none;' +
        (solid ? 'background:#6b1f2b;color:#fff;' : 'border:1px solid #C9A24A;color:#C9A24A;') + '">' + label + '</a>' : '';
    };
    const html =
      '<div style="background:#000;padding:24px 12px;font-family:Arial,Helvetica,sans-serif"><div style="max-width:560px;margin:0 auto;background:#0B0B0B;border:1px solid #2A2418;border-top:2px solid #C9A24A;padding:26px 22px;color:#EDEDED">' +
      '<div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#C9A24A">Backroom report</div>' +
      '<h1 style="font:normal 24px Georgia,serif;margin:10px 0 14px;color:#fff">' + esc(reported) + ' was reported</h1>' +
      '<p style="margin:0 0 6px;color:#CFCFCF">Reported by <strong style="color:#fff">' + esc(reporter) + '</strong>' + (count > 1 ? ' · <strong style="color:#ff9aa8">' + count + ' reports</strong> for this member so far' : '') + '</p>' +
      '<p style="margin:0 0 18px;color:#CFCFCF">Reason: <em>' + esc(rec.reason || 'No reason given') + '</em></p>' +
      '<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8A8A8A;margin-bottom:6px">Latest messages from ' + esc(reported) + '</div>' +
      (msgs.length ? msgs.map(function (m) {
        return '<div style="background:#121212;border:1px solid #2A2418;padding:10px 12px;margin-bottom:6px"><div style="font-size:11px;color:#8A8A8A">' + esc(m.where) + ' · ' + esc(when(m.at)) + '</div><div style="font-size:14px;color:#EDEDED;margin-top:3px">' + esc(m.body) + '</div></div>';
      }).join('') : '<p style="color:#8A8A8A">No messages found.</p>') +
      '<p style="margin:18px 0 8px;color:#CFCFCF">Apple expects reports to be handled within 24 hours.</p>' +
      btn(token.makeUrl(rec.id, 'remove'), 'Remove from Backroom', true) + btn(token.makeUrl(rec.id, 'dismiss'), 'No action needed', false) +
      '</div></div>';

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_ADMIN_FROM || 'AGS Admin <notifications@amsterdamguestlistservice.website>',
        to: [NOTIFY_EMAIL_TO],
        subject: 'Backroom report: ' + reported,
        html: html
      })
    });
    res.status(200).json({ ok: r.ok });
  } catch (err) {
    console.error('Report email failed:', err && err.message);
    res.status(200).json({ ok: false });
  }
};
