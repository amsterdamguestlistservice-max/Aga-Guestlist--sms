// api/_request-change-push.js
//
// Tells the AGS team (admin push) when a guest cancels a guestlist request
// or edits one (adds/removes a guest, changes names or details).
// Called from notify-points-awarded.js, which already receives every UPDATE
// on guestlist_requests with record + old_record. Never throws.

const { pushToAdmins } = require('./_admin-push');
const { createClient } = require('@supabase/supabase-js');

// Every cancel/edit is also logged in request_changes, so the admin
// dashboard can show what changed (not only the push).
async function logChange(record, kind, summary, before, after) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !record.id) return;
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    await sb.from('request_changes').insert({ request_id: record.id, user_id: record.user_id || null, kind: kind, summary: summary, size_before: before, size_after: after });
  } catch (e) { /* the log is optional */ }
}

// Fields a guest can change in the app's "Edit request" sheet. Gender is
// left out on purpose: the admin dashboard sets it in bulk.
const GUEST_FIELDS = ['first_name', 'last_name', 'age', 'instagram', 'phone', 'email', 'additional_guests', 'total_guests'];
const LABELS = { first_name: 'name', last_name: 'name', age: 'age', instagram: 'Instagram', phone: 'phone', email: 'email' };

function st(r) { return String((r && r.status) || 'pending').trim().toLowerCase(); }
function nameOf(r) { return [r.first_name, r.last_name].filter(Boolean).join(' ') || 'A guest'; }
function guestKey(g) { return [g && g.firstName, g && g.lastName].map(function (s) { return String(s || '').trim().toLowerCase(); }).join(' '); }
function guestName(g) { return [g && g.firstName, g && g.lastName].filter(Boolean).join(' ').trim(); }
function list(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') { try { const p = JSON.parse(v); return Array.isArray(p) ? p : []; } catch (e) { return []; } }
  return [];
}
function same(a, b) { return JSON.stringify(a === undefined ? null : a) === JSON.stringify(b === undefined ? null : b); }
function shortDate(iso) {
  if (!iso) return '';
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(String(iso) + 'T00:00:00Z');
  return isNaN(d) ? String(iso) : d.getUTCDate() + ' ' + m[d.getUTCMonth()];
}

function describeEdit(record, old) {
  const parts = [];
  const before = list(old.additional_guests), after = list(record.additional_guests);
  const beforeKeys = new Set(before.map(guestKey)), afterKeys = new Set(after.map(guestKey));
  const added = after.filter(function (g) { return !beforeKeys.has(guestKey(g)); }).map(guestName).filter(Boolean);
  const removed = before.filter(function (g) { return !afterKeys.has(guestKey(g)); }).map(guestName).filter(Boolean);
  if (added.length) parts.push('added ' + added.join(', '));
  if (removed.length) parts.push('removed ' + removed.join(', '));
  if (!added.length && !removed.length && !same(record.additional_guests, old.additional_guests)) parts.push('guest details changed');
  const changed = [];
  Object.keys(LABELS).forEach(function (f) {
    if (!same(record[f], old[f]) && changed.indexOf(LABELS[f]) < 0) changed.push(LABELS[f]);
  });
  if (changed.length) parts.push(changed.join(', ') + ' changed');
  return parts;
}

async function notifyRequestChange(record, old) {
  try {
    if (!record || !old || !old.status && !old.id) return { skipped: 'no_old_record' };
    const was = st(old), now = st(record);
    const event = record.event_name || 'an event';
    const when = shortDate(record.event_date);
    const size = Number(record.total_guests) || 1;

    if (now === 'cancelled' && was !== 'cancelled') {
      await logChange(record, 'cancelled', was === 'approved' ? 'Cancelled (was on the list)' : 'Cancelled (was pending)', size, size);
      const pushed = await pushToAdmins({
        title: '❌ Cancelled — ' + event,
        body: nameOf(record) + (size > 1 ? ' +' + (size - 1) : '') + (when ? ' · ' + when : '') +
          (was === 'approved' ? ' · was on the list' : ' · was pending'),
        url: '/admin/requests.html'
      });
      return { cancelled: true, pushed: pushed };
    }

    if (now !== was || (now !== 'pending' && now !== 'approved')) return { skipped: 'no_guest_edit' };
    const touched = GUEST_FIELDS.some(function (f) { return !same(record[f], old[f]); });
    if (!touched) return { skipped: 'no_guest_edit' };

    const parts = describeEdit(record, old);
    const oldSize = Number(old.total_guests) || 1;
    const sizeNote = size !== oldSize ? ' (' + oldSize + ' → ' + size + ' people)' : '';
    await logChange(record, 'edited', (parts.join('; ') || 'details changed') + sizeNote, oldSize, size);
    const pushed = await pushToAdmins({
      title: '✏️ Request edited — ' + event,
      body: nameOf(record) + (when ? ' · ' + when : '') + ': ' + (parts.join('; ') || 'details changed') + sizeNote,
      url: '/admin/requests.html'
    });
    return { edited: true, pushed: pushed };
  } catch (e) {
    return { error: (e && e.message) || 'failed' };
  }
}

module.exports = { notifyRequestChange };
