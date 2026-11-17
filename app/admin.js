// app/admin.js — in-app admin page.
//
// Shown only when the logged-in account is an admin. The server decides
// that (ADMIN_EMAILS in Vercel, checked in api/_admin-auth.js); this file
// only draws the page and calls the admin endpoints with the user's own
// session token. Nobody else ever gets data from these endpoints.
(function(){
  'use strict';
  const BASE = (typeof API_BASE !== 'undefined') ? API_BASE : '';
  let isAdminUser = false;

  async function token(){
    try{
      const { data } = await supabaseClient.auth.getSession();
      return data && data.session ? data.session.access_token : null;
    } catch(e){ return null; }
  }
  async function api(path, opts){
    const t = await token();
    if(!t) throw new Error('Not logged in');
    opts = opts || {};
    const headers = Object.assign({ 'Authorization': 'Bearer ' + t }, opts.body ? { 'Content-Type': 'application/json' } : {});
    const res = await fetch(BASE + path, { method: opts.method || 'GET', headers: headers, body: opts.body ? JSON.stringify(opts.body) : undefined, cache: 'no-store' });
    const json = await res.json().catch(function(){ return {}; });
    if(!res.ok) throw new Error(json.error || ('Error ' + res.status));
    return json;
  }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  function day(iso){
    const d = new Date(String(iso).slice(0, 10) + 'T12:00:00');
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  // ---------- styles ----------
  const css = document.createElement('style');
  css.textContent = `
  .admin-open{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:50px;margin:0 0 16px;border:1px solid var(--gold);background:linear-gradient(180deg,rgba(201,162,74,.18),rgba(201,162,74,.06));color:var(--gold-light);font:700 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;border-radius:2px;cursor:pointer}
  .admin-open[hidden],.admin-open .dot[hidden]{display:none!important}
  .admin-open .dot{min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--gold);color:#000;font-size:11px;letter-spacing:0;display:inline-flex;align-items:center;justify-content:center}
  #adminSheet{position:fixed;inset:0;z-index:9000;background:var(--black);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px calc(env(safe-area-inset-bottom,0px) + 40px);display:none}
  #adminSheet.is-open{display:block}
  .adm-head{position:sticky;top:calc(env(safe-area-inset-top,0px)*-1);z-index:2;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0 14px;background:linear-gradient(180deg,var(--black) 80%,transparent)}
  .adm-title{font:600 34px/1 var(--serif);color:var(--white)}
  .adm-title small{display:block;font:700 10px/1 var(--sans);letter-spacing:.3em;color:var(--gold);text-transform:uppercase;margin-bottom:8px}
  .adm-btn{min-height:40px;padding:0 14px;border:1px solid var(--line);background:transparent;color:var(--white);font:600 12px/1 var(--sans);letter-spacing:.08em;border-radius:2px;cursor:pointer}
  .adm-sec{margin:22px 0 10px;font:700 11px/1 var(--sans);letter-spacing:.26em;color:var(--gold);text-transform:uppercase}
  .adm-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .adm-stat{border:1px solid var(--line);background:var(--charcoal);padding:14px}
  .adm-stat b{display:block;font:600 34px/1 var(--serif);color:var(--white)}
  .adm-stat span{display:block;margin-top:6px;font-size:12px;color:var(--muted)}
  .adm-stat.hot{border-color:var(--gold)} .adm-stat.hot b{color:var(--gold-light)}
  .adm-ev{border:1px solid var(--line);background:var(--charcoal);padding:12px 14px;margin-bottom:8px}
  .adm-ev__top{display:flex;justify-content:space-between;gap:10px;font-size:14px;color:var(--white)}
  .adm-ev__top i{font-style:normal;color:var(--muted);font-size:12px;white-space:nowrap}
  .adm-bar{height:6px;background:#222;margin:10px 0 6px;border-radius:3px;overflow:hidden}
  .adm-bar div{height:100%;background:linear-gradient(90deg,#9c7a2e,var(--gold-light))}
  .adm-ev__meta{font-size:12px;color:var(--muted)}
  .adm-req{border:1px solid var(--line);background:var(--charcoal);padding:14px;margin-bottom:10px}
  .adm-req h4{font:600 22px/1.1 var(--serif);color:var(--white);margin:0}
  .adm-req .ev{font-size:12px;color:var(--gold);letter-spacing:.06em;margin:6px 0 8px;text-transform:uppercase}
  .adm-req .meta{font-size:13px;color:var(--muted);line-height:1.5}
  .adm-req .meta a{color:var(--gold-light)}
  .adm-req .acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
  .adm-req .acts button{min-height:44px;border:1px solid var(--line);background:transparent;color:var(--white);font:700 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
  .adm-req .acts .ok{background:var(--gold);border-color:var(--gold);color:#000}
  .adm-chart{border:1px solid var(--line);background:var(--charcoal);padding:14px 12px 10px;display:flex;align-items:flex-end;gap:5px;height:150px}
  .adm-chart .c{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px}
  .adm-chart .c b{font:600 10px/1 var(--sans);color:var(--muted)}
  .adm-chart .c div{width:100%;background:linear-gradient(180deg,var(--gold-light),#9c7a2e);min-height:2px;border-radius:2px 2px 0 0}
  .adm-chart .c i{font-style:normal;font-size:9px;color:var(--muted)}
  .adm-chart .c.today div{background:var(--white)}
  .adm-top{display:flex;justify-content:space-between;gap:10px;padding:12px 14px;border:1px solid var(--line);background:var(--charcoal);margin-bottom:6px;font-size:14px;color:var(--white)}
  .adm-top span{color:var(--gold-light);white-space:nowrap}
  .adm-empty{padding:18px;border:1px dashed var(--line);color:var(--muted);font-size:13px;text-align:center}
  .adm-push input,.adm-push textarea{width:100%;background:var(--charcoal);border:1px solid var(--line);color:var(--white);padding:12px;font:15px var(--sans);margin-bottom:8px;border-radius:0}
  .adm-push textarea{min-height:90px;resize:vertical}
  .adm-push button{width:100%;min-height:48px;border:0;background:var(--gold);color:#000;font:700 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;cursor:pointer}
  .adm-push button.arm{background:#b3261e;color:#fff}
  .adm-note{font-size:12px;color:var(--muted);margin-top:8px;line-height:1.5}
  .adm-err{color:#ff8a80;font-size:13px;margin:10px 0}
  `;
  document.head.appendChild(css);

  // ---------- markup ----------
  const sheet = document.createElement('div');
  sheet.id = 'adminSheet';
  sheet.setAttribute('role', 'dialog');
  sheet.setAttribute('aria-label', 'Admin');
  sheet.innerHTML =
    '<div class="adm-head"><div class="adm-title"><small>AGS</small>Admin</div>' +
    '<div style="display:flex;gap:8px"><button type="button" class="adm-btn" id="admRefresh">↻</button><button type="button" class="adm-btn" id="admClose">Close</button></div></div>' +
    '<div id="admErr" class="adm-err" hidden></div>' +
    '<div class="adm-sec">Today</div><div class="adm-grid" id="admStats"></div>' +
    '<div class="adm-sec">Requests to review</div><div id="admReqs"></div>' +
    '<div class="adm-sec">All time</div><div class="adm-grid" id="admTotals"></div>' +
    '<div class="adm-sec">New accounts · last 14 days</div><div class="adm-chart" id="admChart"></div>' +
    '<div class="adm-sec">Most guests</div><div id="admTop"></div>' +
    '<div class="adm-sec">Guestlists</div><div id="admEvents"></div>' +
    '<div class="adm-sec">Send a notification</div>' +
    '<div class="adm-push"><input id="admPushTitle" maxlength="60" placeholder="Title (optional)">' +
    '<textarea id="admPushBody" maxlength="200" placeholder="Message to all members with notifications on"></textarea>' +
    '<button type="button" id="admPushSend">Send to everyone</button>' +
    '<div class="adm-note" id="admPushNote">Goes to every member who turned on notifications, on iPhone and web.</div></div>';
  document.body.appendChild(sheet);

  function showErr(msg){ const e = document.getElementById('admErr'); e.textContent = msg || ''; e.hidden = !msg; }

  function stat(n, label, hot){ return '<div class="adm-stat' + (hot ? ' hot' : '') + '"><b>' + esc(n) + '</b><span>' + esc(label) + '</span></div>'; }

  async function loadStats(){
    const s = await api('/api/admin-stats');
    document.getElementById('admStats').innerHTML =
      stat(s.pending, 'requests waiting', s.pending > 0) +
      stat(s.signupsToday, 'new members today · ' + s.signupsWeek + ' this week') +
      stat(s.pushIphoneToday, 'iPhone app installs today · ' + s.pushIphone + ' total') +
      stat(s.members, 'members in total');
    const pct = s.requestsTotal ? Math.round(s.approvedRequests / s.requestsTotal * 100) : 0;
    document.getElementById('admTotals').innerHTML =
      stat(s.accountsTotal, 'accounts created · ' + s.accountsMonth + ' this month', true) +
      stat(s.requestsTotal, 'guestlist requests · ' + pct + '% approved') +
      stat(s.approvedGuests, 'guests put on the list') +
      stat(s.noShows, 'no-shows · ' + s.declined + ' declined') +
      stat(s.referred, 'joined through a friend') +
      stat(s.pushIphone + s.pushWeb, 'notifications on · ' + s.pushIphone + ' iPhone, ' + s.pushWeb + ' web');
    const days = s.signups14 || [];
    const max = Math.max(1, ...days.map(function(d){ return d.n; }));
    document.getElementById('admChart').innerHTML = days.map(function(d, i){
      const dd = new Date(d.date + 'T12:00:00');
      return '<div class="c' + (i === days.length - 1 ? ' today' : '') + '"><b>' + (d.n || '') + '</b><div style="height:' + Math.round(d.n / max * 100) + '%"></div><i>' + dd.getDate() + '</i></div>';
    }).join('');
    const top = s.topEvents || [];
    document.getElementById('admTop').innerHTML = top.length ? top.map(function(t, i){
      return '<div class="adm-top">' + (i + 1) + '. ' + esc(t.name) + '<span>' + t.guests + ' guests</span></div>';
    }).join('') : '<div class="adm-empty">No approved guests yet.</div>';
    const evs = s.upcoming || [];
    document.getElementById('admEvents').innerHTML = evs.length ? evs.map(function(e){
      const pct = e.capacity ? Math.min(100, Math.round(e.claimed / e.capacity * 100)) : 0;
      return '<div class="adm-ev"><div class="adm-ev__top"><span>' + esc(e.name) + '</span><i>' + esc(day(e.date)) + '</i></div>' +
        '<div class="adm-bar"><div style="width:' + pct + '%"></div></div>' +
        '<div class="adm-ev__meta">' + e.claimed + ' / ' + e.capacity + ' spots claimed · ' + e.approved + ' approved (' + e.guests + ' guests) · ' + e.pending + ' pending' + (e.enabled ? '' : ' · closed') + '</div></div>';
    }).join('') : '<div class="adm-empty">No open guestlists.</div>';
    updateBadge(s.pending);
  }

  async function loadReqs(){
    const r = await api('/api/admin-requests');
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const pending = (r.requests || []).filter(function(x){ return String(x.status || 'pending').trim().toLowerCase() === 'pending' && String(x.event_date) >= today; });
    const box = document.getElementById('admReqs');
    if(!pending.length){ box.innerHTML = '<div class="adm-empty">All caught up. No requests waiting.</div>'; return; }
    box.innerHTML = pending.map(function(x){
      const ig = String(x.instagram || '').replace(/^@/, '');
      const extra = Array.isArray(x.additional_guests) && x.additional_guests.length
        ? '<br>+ ' + x.additional_guests.map(function(g){ return esc(((g.firstName || g.first_name || g.name || '') + ' ' + (g.lastName || g.last_name || '')).trim()); }).join(', ') : '';
      return '<div class="adm-req" data-id="' + esc(x.id) + '"><h4>' + esc((x.first_name || '') + ' ' + (x.last_name || '')) + '</h4>' +
        '<div class="ev">' + esc(x.event_name) + ' · ' + esc(day(x.event_date)) + '</div>' +
        '<div class="meta">' + (x.total_guests || 1) + ' guest' + ((x.total_guests || 1) > 1 ? 's' : '') +
        (x.age ? ' · ' + esc(x.age) + ' y' : '') + (x.gender ? ' · ' + esc(x.gender) : '') +
        (ig ? ' · <a href="https://instagram.com/' + encodeURIComponent(ig) + '" target="_blank" rel="noopener">@' + esc(ig) + '</a>' : '') + extra + '</div>' +
        '<div class="acts"><button type="button" data-act="Declined">Decline</button><button type="button" class="ok" data-act="Approved">Approve</button></div></div>';
    }).join('');
  }

  async function act(card, status){
    const btns = card.querySelectorAll('button');
    btns.forEach(function(b){ b.disabled = true; });
    try{
      await api('/api/admin-requests', { method: 'POST', body: { id: card.getAttribute('data-id'), status: status } });
      card.style.opacity = '.35';
      card.querySelector('.acts').innerHTML = '<div class="adm-note" style="grid-column:1/-1;text-align:center">' + (status === 'Approved' ? 'Approved ✓ guest is notified' : 'Declined') + '</div>';
      loadStats().catch(function(){});
    } catch(e){ btns.forEach(function(b){ b.disabled = false; }); showErr(e.message); }
  }

  async function refresh(){
    showErr('');
    try{ await Promise.all([loadStats(), loadReqs()]); }
    catch(e){ showErr(e.message === 'Unauthorized' ? 'This account has no admin access.' : e.message); }
  }

  // two-tap send so a broadcast never goes out by accident
  let armed = null;
  async function sendPush(){
    const btn = document.getElementById('admPushSend');
    const body = document.getElementById('admPushBody').value.trim();
    const title = document.getElementById('admPushTitle').value.trim();
    if(!body){ showErr('Write a message first.'); return; }
    if(!armed){
      btn.classList.add('arm'); btn.textContent = 'Tap again to send to everyone';
      armed = setTimeout(function(){ armed = null; btn.classList.remove('arm'); btn.textContent = 'Send to everyone'; }, 4000);
      return;
    }
    clearTimeout(armed); armed = null;
    btn.disabled = true; btn.textContent = 'Sending…';
    try{
      const r = await api('/api/send-notification', { method: 'POST', body: { title: title || 'Amsterdam Guestlist Service', body: body, url: './index.html' } });
      document.getElementById('admPushNote').textContent = 'Sent ✓' + (r && (r.sent != null) ? ' to ' + r.sent + ' devices' : '');
      document.getElementById('admPushBody').value = ''; document.getElementById('admPushTitle').value = '';
    } catch(e){ showErr(e.message); }
    btn.disabled = false; btn.classList.remove('arm'); btn.textContent = 'Send to everyone';
  }

  function open(){ sheet.classList.add('is-open'); document.body.style.overflow = 'hidden'; refresh(); }
  function close(){ sheet.classList.remove('is-open'); document.body.style.overflow = ''; }

  document.getElementById('admClose').addEventListener('click', close);
  document.getElementById('admRefresh').addEventListener('click', refresh);
  document.getElementById('admPushSend').addEventListener('click', sendPush);
  sheet.addEventListener('click', function(e){
    const b = e.target.closest('.adm-req button[data-act]');
    if(b) act(b.closest('.adm-req'), b.getAttribute('data-act'));
  });

  // ---------- entry button in Account ----------
  function button(){
    let b = document.getElementById('adminOpenBtn');
    if(!b){
      const panel = document.getElementById('accountPanel');
      if(!panel) return null;
      b = document.createElement('button');
      b.type = 'button'; b.id = 'adminOpenBtn'; b.className = 'admin-open'; b.hidden = true;
      b.innerHTML = '⚙︎ Admin dashboard <span class="dot" id="adminDot" hidden>0</span>';
      b.addEventListener('click', open);
      panel.insertBefore(b, panel.firstChild);
    }
    return b;
  }
  function updateBadge(n){
    const d = document.getElementById('adminDot');
    if(d){ d.textContent = n; d.hidden = !n; }
  }

  // Called after login. The server answers 401 for everyone who isn't an admin.
  window.agsAdminCheck = async function(){
    const b = button(); if(!b) return;
    try{
      const s = await api('/api/admin-stats');
      isAdminUser = true; b.hidden = false; updateBadge(s.pending);
    } catch(e){ isAdminUser = false; b.hidden = true; }
  };
  // app.js may have shown the account before this file loaded
  setTimeout(function(){ const p = document.getElementById('accountPanel'); if(p && p.style.display === 'block') window.agsAdminCheck(); }, 0);
  window.agsAdminHide = function(){ const b = document.getElementById('adminOpenBtn'); if(b) b.hidden = true; close(); };
})();
