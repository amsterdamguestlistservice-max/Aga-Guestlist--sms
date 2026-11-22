// api/delete-account.js
//
// POST with "Authorization: Bearer <user access token>" — permanently
// deletes the signed-in user's account (App Store guideline 5.1.1(v), GDPR).
//
//   1. Upcoming guestlist requests are cancelled and their spots released
//      (so the waitlist gets them).
//   2. All of the user's guestlist requests are anonymised: names, phone,
//      email, Instagram and guests are removed. Only the event, date, party
//      size and status stay, as anonymous statistics.
//   3. Push subscriptions and link clicks are removed / unlinked.
//   4. The auth user is deleted; profile, points, waitlist, claims and all
//      Backroom data are removed by ON DELETE CASCADE.
//
// Only the account the token belongs to can be deleted.

const { createClient } = require('@supabase/supabase-js');
const events = require('./_events');
const { notifyForEvent } = require('./waitlist-notify');

module.exports = async function handler(req, res) {
  if (require('./_cors')(req, res)) return;
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  const auth = String(req.headers['authorization'] || '');
  const jwt = auth.indexOf('Bearer ') === 0 ? auth.slice(7).trim() : '';
  if (!jwt) { res.status(401).json({ ok: false, error: 'Not signed in' }); return; }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: who, error: authErr } = await supabase.auth.getUser(jwt);
  const user = who && who.user;
  if (authErr || !user) { res.status(401).json({ ok: false, error: 'Not signed in' }); return; }
  const uid = user.id;

  try {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });

    // 1. Release upcoming spots.
    const { data: upcoming } = await supabase.from('guestlist_requests')
      .select('id, event_name, event_date, status').eq('user_id', uid).gte('event_date', today);
    const touched = new Set();
    for (const r of upcoming || []) {
      const st = String(r.status || 'Pending').trim().toLowerCase();
      if (st !== 'pending' && st !== 'approved') continue;
      const ev = await events.findEvent(r.event_name, r.event_date);
      const { data: result } = await supabase.rpc('cancel_guestlist_request_by_link', {
        p_request_id: r.id, p_event_id: ev ? ev.id : null
      });
      if (result && result.released && ev) touched.add(ev.id);
    }

    // 2. Anonymise every request of this user.
    const { data: all } = await supabase.from('guestlist_requests').select('id, status').eq('user_id', uid);
    for (const r of all || []) {
      const st = String(r.status || 'Pending').trim().toLowerCase();
      const upd = { first_name: 'Deleted', last_name: 'account', age: null, instagram: null, phone: null, email: null, gender: null, additional_guests: [] };
      if (st === 'pending') upd.status = 'Cancelled';
      await supabase.from('guestlist_requests').update(upd).eq('id', r.id);
    }

    // 3. Unlink the rest.
    await supabase.from('push_subscriptions').delete().eq('user_id', uid);
    await supabase.from('link_clicks').update({ user_id: null }).eq('user_id', uid);
    // Social data: profile, photo, follows, views, ratings, member status.
    for (const t of ['member_profiles', 'venue_follows', 'event_views', 'party_ratings', 'member_overrides']) {
      try { await supabase.from(t).delete().eq('user_id', uid); } catch (e) { /* ignore */ }
    }
    try {
      const { data: files } = await supabase.storage.from('avatars').list(uid);
      if (files && files.length) await supabase.storage.from('avatars').remove(files.map(function (f) { return uid + '/' + f.name; }));
    } catch (e) { /* ignore */ }

    // 4. Delete the user (cascades profile, waitlist, claims, Backroom).
    const { error: delErr } = await supabase.auth.admin.deleteUser(uid);
    if (delErr) { res.status(500).json({ ok: false, error: 'Could not delete the account' }); return; }

    for (const id of touched) { try { await notifyForEvent(supabase, id); } catch (e) { /* ignore */ } }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Could not delete the account' });
  }
};
