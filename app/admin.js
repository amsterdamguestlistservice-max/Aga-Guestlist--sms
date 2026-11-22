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
  .adm-req,.adm-ev{cursor:pointer}
  .adm-filter{display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:2px 0 4px;scrollbar-width:none}
  .adm-filter::-webkit-scrollbar{display:none}
  .adm-filter button{flex:0 0 auto;min-height:36px;padding:0 14px;border:1px solid var(--line);background:transparent;color:var(--muted);font:600 12px/1 var(--sans);border-radius:999px;cursor:pointer;white-space:nowrap}
  .adm-filter button.on{border-color:var(--gold);color:#000;background:var(--gold)}
  .adm-partial{display:flex;gap:8px}
  .adm-partial select{flex:1;min-height:44px;background:var(--charcoal);color:var(--white);border:1px solid var(--line);padding:0 10px;font-size:14px}
  .adm-row .adm-ns{min-height:34px;padding:0 10px;margin-left:8px;border:1px solid #7a3b36;background:transparent;color:#ff9a8f;font:700 10px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap}
  .adm-row .adm-ns.sure{background:#7a3b36;color:#fff}
  .adm-ig-search{width:100%;min-height:42px;margin:0 0 10px;padding:0 12px;background:var(--charcoal);color:var(--white);border:1px solid var(--line);font-size:14px;box-sizing:border-box}
  .adm-ig{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--line);background:var(--charcoal);margin-bottom:6px}
  .adm-ig > div{flex:1;min-width:0}
  .adm-ig a{color:var(--gold-light);font-weight:600;text-decoration:none;word-break:break-all}
  .adm-ig small{display:block;color:var(--muted);font-size:12px;margin-top:3px}
  .adm-ig .g{display:flex;gap:4px}
  .adm-ig .g button{min-width:34px;min-height:32px;border:1px solid var(--line);background:transparent;color:var(--muted);font:700 11px/1 var(--sans);cursor:pointer}
  .adm-ig .g button.on{border-color:var(--gold);background:var(--gold);color:#000}
  .adm-ig-more{display:block;width:100%;min-height:40px;margin-top:4px;border:1px solid var(--line);background:transparent;color:var(--white);font:600 12px/1 var(--sans);cursor:pointer}
  .adm-ev__more{font-size:11px;color:var(--gold);letter-spacing:.14em;text-transform:uppercase;margin-top:8px}
  .adm-layer{position:fixed;inset:0;z-index:9100;background:var(--black);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px calc(env(safe-area-inset-bottom,0px) + 40px);display:none}
  .adm-layer.is-open{display:block}
  #admDetail{z-index:9200}
  .adm-pill{display:inline-block;padding:6px 10px;font:700 10px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;border:1px solid var(--line);color:var(--muted)}
  .adm-pill.approved{border-color:#3f8f5a;color:#7fd39a}.adm-pill.pending{border-color:var(--gold);color:var(--gold-light)}
  .adm-pill.declined,.adm-pill.no-show,.adm-pill.cancelled{border-color:#7a3b36;color:#ff9a8f}
  .adm-dl{border:1px solid var(--line);background:var(--charcoal);margin-top:12px}
  .adm-dl div{display:flex;justify-content:space-between;gap:14px;padding:12px 14px;border-bottom:1px solid rgba(201,162,74,.12);font-size:14px}
  .adm-dl div:last-child{border-bottom:0}
  .adm-dl dt,.adm-dl span.k{color:var(--muted)}
  .adm-dl b{font-weight:500;color:var(--white);text-align:right;word-break:break-word}
  .adm-dl a{color:var(--gold-light)}
  .adm-contact{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
  .adm-contact a{display:flex;align-items:center;justify-content:center;min-height:44px;border:1px solid var(--line);color:var(--white);text-decoration:none;font:600 12px/1 var(--sans);letter-spacing:.06em}
  .adm-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px}
  .adm-acts button{min-height:50px;border:1px solid var(--line);background:transparent;color:var(--white);font:700 11px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;cursor:pointer}
  .adm-acts .ok{background:var(--gold);border-color:var(--gold);color:#000}
  .adm-acts .bad{border-color:#7a3b36;color:#ff9a8f}
  .adm-row{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:13px 14px;border:1px solid var(--line);background:var(--charcoal);margin-bottom:6px;cursor:pointer}
  .adm-row b{font-weight:500;font-size:15px;color:var(--white)}
  .adm-row small{display:block;font-size:12px;color:var(--muted);margin-top:3px}
  .adm-tabs{display:flex;gap:6px;margin:6px 0 12px;flex-wrap:wrap}
  .adm-tabs button{min-height:36px;padding:0 12px;border:1px solid var(--line);background:transparent;color:var(--muted);font:600 12px/1 var(--sans);cursor:pointer}
  .adm-tabs button.on{border-color:var(--gold);color:var(--gold-light)}
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
    '<div class="adm-sec">Filter by party</div><div class="adm-filter" id="admFilter"></div>' +
    '<div class="adm-sec">Requests to review</div><div id="admReqs"></div>' +
    '<div class="adm-sec">All time</div><div class="adm-grid" id="admTotals"></div>' +
    '<div class="adm-sec">New accounts · last 14 days</div><div class="adm-chart" id="admChart"></div>' +
    '<div class="adm-sec">Most guests</div><div id="admTop"></div>' +
    '<div class="adm-sec">Party ratings</div><div id="admRatings"></div>' +
    '<div class="adm-sec">Instagram</div><div class="adm-tabs" id="admIgTabs"></div>' +
    '<input type="search" id="admIgSearch" class="adm-ig-search" placeholder="Search name or @handle" autocomplete="off">' +
    '<div id="admIg"></div>' +
    '<div class="adm-sec">Guestlists</div><div class="adm-tabs" id="admWhen"></div><div id="admEvents"></div>' +
    '<div class="adm-sec">New parties</div>' +
    '<div class="adm-push"><div class="adm-note" id="admNewNote" style="margin:0 0 10px">New parties are announced automatically at 16:00 and 20:00. Just added one? Announce it now.</div>' +
    '<button type="button" id="admNewBtn">Check for new parties</button></div>' +
    '<div class="adm-sec">Send a notification</div>' +
    '<div class="adm-push"><input id="admPushTitle" maxlength="60" placeholder="Title (optional)">' +
    '<textarea id="admPushBody" maxlength="200" placeholder="Message to all members with notifications on"></textarea>' +
    '<button type="button" id="admPushSend">Send to everyone</button>' +
    '<div class="adm-note" id="admPushNote">Goes to every member who turned on notifications, on iPhone and web.</div></div>';
  document.body.appendChild(sheet);
  const listLayer = document.createElement('div'); listLayer.id = 'admList'; listLayer.className = 'adm-layer'; document.body.appendChild(listLayer);
  const detailLayer = document.createElement('div'); detailLayer.id = 'admDetail'; detailLayer.className = 'adm-layer'; document.body.appendChild(detailLayer);
  let REQS = [];
  let listCtx = null; // { name, date, filter }

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
    const rt = s.ratings || [];
    document.getElementById('admRatings').innerHTML = rt.length ? rt.map(function(r){
      const d = new Date(r.date + 'T12:00:00');
      return '<div class="adm-top">' + esc(r.name) + ' · ' + d.getDate() + '/' + (d.getMonth() + 1) +
        '<span>' + '★'.repeat(Math.round(r.avg)) + ' ' + r.avg + ' (' + r.count + ')</span></div>' +
        (r.comments || []).map(function(c){ return '<div class="adm-note" style="margin:2px 0 8px 12px">' + '★'.repeat(c.rating) + ' “' + esc(c.text) + '”</div>'; }).join('');
    }).join('') : '<div class="adm-empty">No ratings yet. Guests are asked the day after a party.</div>';
    EVS = s.upcoming || [];
    renderEvents();
    renderFilter();
    updateBadge(s.pending);
  }

  // ---------- filter by party (sorted by name) ----------
  let EVS = [], PENDING = [], PARTY = '', WHEN = 'upcoming';
  try { localStorage.removeItem('ags_admin_party'); WHEN = localStorage.getItem('ags_admin_when') || 'upcoming'; } catch (e) {}
  // Parties that already happened, built from all requests (also older parties without a guestlist limit).
  function pastEvents(){
    const by = {};
    (REQS || []).forEach(function(r){
      if(!isOver(r.event_name, r.event_date)) return;
      const k = r.event_name + '|' + r.event_date;
      const o = by[k] || (by[k] = { name: r.event_name, date: String(r.event_date), approved: 0, guests: 0, noshow: 0, missing: 0, declined: 0 });
      const t = st(r);
      if(t === 'approved'){ o.approved++; o.guests += Number(r.total_guests) || 1; o.missing += Number(r.missing_guests) || 0; }
      if(t === 'no-show'){ o.noshow++; }
      if(t === 'declined') o.declined++;
    });
    return Object.keys(by).map(function(k){ return by[k]; });
  }
  // A party moves to Past once it has ended: its endTime (default 05:00 the next morning), Amsterdam time.
  function nowAms(){ return new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Amsterdam' }).slice(0, 16); }
  function isOver(name, date){
    const d = String(date).slice(0, 10);
    let ev = null;
    try { if(typeof EVENTS !== 'undefined') ev = EVENTS.find(function(e){ return e.name === baseName(name) && e.date === d; }) || null; } catch (e) {}
    const start = (ev && ev.time) || '23:00', end = (ev && ev.endTime) || '05:00';
    let endDay = d;
    if(end <= start){ const t = new Date(d + 'T12:00:00Z'); t.setUTCDate(t.getUTCDate() + 1); endDay = t.toISOString().slice(0, 10); }
    return nowAms() >= endDay + ' ' + end;
  }
  function setWhen(w){ WHEN = w; try { localStorage.setItem('ags_admin_when', w); } catch (e) {} renderEvents(); }
  function baseName(n){ return String(n || '').replace(/ \(Age OK\)$/, ''); }
  function byName(a, b){ const x = baseName(a.name || a.event_name).toLowerCase(), y = baseName(b.name || b.event_name).toLowerCase(); if(x !== y) return x < y ? -1 : 1; const d1 = String(a.date || a.event_date), d2 = String(b.date || b.event_date); if(d1 !== d2) return d1 < d2 ? -1 : 1; return String(a.name || '').length - String(b.name || '').length; }
  function renderFilter(){
    const names = Array.from(new Set(EVS.map(function(e){ return baseName(e.name); }).concat(PENDING.map(function(r){ return r.event_name; })).concat(pastEvents().map(function(e){ return e.name; })))).filter(Boolean)
      .sort(function(a, b){ return a.toLowerCase() < b.toLowerCase() ? -1 : 1; });
    if(PARTY && names.indexOf(PARTY) < 0) PARTY = '';
    const box = document.getElementById('admFilter');
    if(!box) return;
    box.innerHTML = ['<button type="button" data-party="" class="' + (PARTY ? '' : 'on') + '">All parties</button>'].concat(names.map(function(n){
      return '<button type="button" data-party="' + esc(n) + '" class="' + (PARTY === n ? 'on' : '') + '">' + esc(n) + '</button>';
    })).join('');
  }
  function setParty(n){ PARTY = n; renderFilter(); renderEvents(); renderReqs(); }
  function renderEvents(){
    const past = pastEvents();
    const upcomingEvs = EVS.filter(function(e){ return !isOver(e.name, e.date); });
    const wb = document.getElementById('admWhen');
    if(wb) wb.innerHTML = '<button type="button" data-when="upcoming" class="' + (WHEN === 'upcoming' ? 'on' : '') + '">Upcoming (' + upcomingEvs.filter(function(e){ return !PARTY || baseName(e.name) === PARTY; }).length + ')</button>' +
      '<button type="button" data-when="past" class="' + (WHEN === 'past' ? 'on' : '') + '">Past (' + past.filter(function(e){ return !PARTY || e.name === PARTY; }).length + ')</button>';
    if(WHEN === 'past'){
      const list = past.filter(function(e){ return !PARTY || e.name === PARTY; }).sort(function(a, b){ return a.date > b.date ? -1 : a.date < b.date ? 1 : (a.name < b.name ? -1 : 1); });
      document.getElementById('admEvents').innerHTML = list.length ? list.map(function(e){
        const bits = [e.approved + ' approved (' + e.guests + ' guests)'];
        if(e.noshow) bits.push(e.noshow + ' no-show' + (e.noshow > 1 ? 's' : ''));
        if(e.missing) bits.push(e.missing + ' missing from groups');
        return '<div class="adm-ev" data-name="' + esc(e.name) + '" data-date="' + esc(e.date) + '"><div class="adm-ev__top"><span>' + esc(e.name) + '</span><i>' + esc(day(e.date)) + '</i></div>' +
          '<div class="adm-ev__meta" style="margin-top:6px">' + bits.join(' · ') + '</div><div class="adm-ev__more">Open guestlist · mark no-shows ›</div></div>';
      }).join('') : '<div class="adm-empty">No past parties' + (PARTY ? ' for ' + esc(PARTY) : '') + '.</div>';
      return;
    }
    const evs = upcomingEvs.filter(function(e){ return !PARTY || baseName(e.name) === PARTY; }).slice().sort(byName);
    document.getElementById('admEvents').innerHTML = evs.length ? evs.map(function(e){
      const pct = e.capacity ? Math.min(100, Math.round(e.claimed / e.capacity * 100)) : 0;
      return '<div class="adm-ev" data-name="' + esc(e.name) + '" data-date="' + esc(e.date) + '"><div class="adm-ev__top"><span>' + esc(e.name) + '</span><i>' + esc(day(e.date)) + '</i></div>' +
        '<div class="adm-bar"><div style="width:' + pct + '%"></div></div>' +
        '<div class="adm-ev__meta">' + e.claimed + ' / ' + e.capacity + ' people on the list · ' + e.approved + ' approved (' + e.guests + ' guests) · ' + e.pending + ' pending' + (e.enabled ? '' : ' · closed') + '</div><div class="adm-ev__more">' + (String(e.date) <= todayAms() ? 'Open guestlist · mark no-shows ›' : 'Open guestlist ›') + '</div></div>';
    }).join('') : '<div class="adm-empty">No open guestlists' + (PARTY ? ' for ' + esc(PARTY) : '') + '.</div>';
  }

  // ---------- Instagram list (men / women) ----------
  let IG_TAB = 'all', IG_Q = '', IG_SHOW = 40;
  function igHandle(v){ return String(v || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[\/?#].*$/, '').toLowerCase(); }
  function igPeople(){
    const by = {};
    REQS.slice().sort(function(a, b){ return String(a.created_at) < String(b.created_at) ? -1 : 1; }).forEach(function(r){
      const h = igHandle(r.instagram); if(!h) return;
      const o = by[h] || (by[h] = { handle: h, name: '', gender: '', parties: {}, requests: 0, last: '' });
      o.name = fullName(r); o.requests++;
      if(r.gender === 'man' || r.gender === 'woman') o.gender = r.gender;
      o.parties[r.event_name] = 1; if(String(r.event_date) > o.last) o.last = String(r.event_date);
    });
    return Object.keys(by).map(function(k){ return by[k]; }).sort(function(a, b){ return a.last < b.last ? 1 : a.last > b.last ? -1 : 0; });
  }
  function renderIg(){
    const box = document.getElementById('admIg'); if(!box) return;
    const all = igPeople();
    const n = function(t){ return all.filter(function(p){ return t === 'all' ? true : t === 'unknown' ? !p.gender : p.gender === t; }).length; };
    const tab = function(t, label){ return '<button type="button" data-igtab="' + t + '" class="' + (IG_TAB === t ? 'on' : '') + '">' + label + ' (' + n(t) + ')</button>'; };
    document.getElementById('admIgTabs').innerHTML = tab('all', 'All') + tab('man', 'Men') + tab('woman', 'Women') + tab('unknown', 'Unknown');
    const q = IG_Q.trim().toLowerCase().replace(/^@/, '');
    const list = all.filter(function(p){ return (IG_TAB === 'all' ? true : IG_TAB === 'unknown' ? !p.gender : p.gender === IG_TAB) && (!q || p.handle.indexOf(q) >= 0 || p.name.toLowerCase().indexOf(q) >= 0); });
    if(!list.length){ box.innerHTML = '<div class="adm-empty">Nobody here.</div>'; return; }
    box.innerHTML = list.slice(0, IG_SHOW).map(function(p){
      const parties = Object.keys(p.parties);
      return '<div class="adm-ig"><div><a href="https://instagram.com/' + encodeURIComponent(p.handle) + '" target="_blank" rel="noopener">@' + esc(p.handle) + '</a>' +
        '<small>' + esc(p.name) + ' · ' + p.requests + ' request' + (p.requests > 1 ? 's' : '') + ' · ' + esc(parties.slice(0, 2).join(', ')) + (parties.length > 2 ? ' +' + (parties.length - 2) : '') + '</small></div>' +
        '<div class="g" data-ig="' + esc(p.handle) + '"><button type="button" data-g="man" class="' + (p.gender === 'man' ? 'on' : '') + '" aria-label="Man">M</button><button type="button" data-g="woman" class="' + (p.gender === 'woman' ? 'on' : '') + '" aria-label="Woman">V</button></div></div>';
    }).join('') + (list.length > IG_SHOW ? '<button type="button" class="adm-ig-more" id="admIgMore">Show more (' + (list.length - IG_SHOW) + ')</button>' : '') +
      '<button type="button" class="adm-ig-more" id="admIgCopy">Copy these ' + list.length + ' handles</button><div class="adm-note" id="admIgNote"></div>';
  }
  async function setIgGender(btn){
    const wrap = btn.closest('[data-ig]'); const h = wrap.getAttribute('data-ig');
    const g = btn.classList.contains('on') ? null : btn.getAttribute('data-g');
    wrap.querySelectorAll('button').forEach(function(b){ b.disabled = true; });
    try{
      await api('/api/admin-requests', { method: 'POST', body: { instagram: h, gender: g } });
      REQS.forEach(function(r){ if(igHandle(r.instagram) === h) r.gender = g; });
      renderIg();
    } catch(e){ wrap.querySelectorAll('button').forEach(function(b){ b.disabled = false; }); showErr(e.message); }
  }
  function copyIg(){
    const all = igPeople(), q = IG_Q.trim().toLowerCase().replace(/^@/, '');
    const list = all.filter(function(p){ return (IG_TAB === 'all' ? true : IG_TAB === 'unknown' ? !p.gender : p.gender === IG_TAB) && (!q || p.handle.indexOf(q) >= 0 || p.name.toLowerCase().indexOf(q) >= 0); });
    const text = list.map(function(p){ return '@' + p.handle; }).join('\n');
    const done = function(){ document.getElementById('admIgNote').textContent = 'Copied ✓ ' + list.length + ' handles'; };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function(){ prompt('Copy:', text); });
    else prompt('Copy:', text);
  }

  async function loadReqs(){
    const r = await api('/api/admin-requests');
    REQS = r.requests || [];
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    PENDING = (r.requests || []).filter(function(x){ return String(x.status || 'pending').trim().toLowerCase() === 'pending' && String(x.event_date) >= today; });
    renderFilter();
    renderReqs();
    renderEvents();
    renderIg();
  }
  function renderReqs(){
    const pending = PENDING.filter(function(x){ return !PARTY || x.event_name === PARTY; }).slice().sort(byName);
    const box = document.getElementById('admReqs');
    if(!pending.length){ box.innerHTML = '<div class="adm-empty">' + (PARTY ? 'No requests waiting for ' + esc(PARTY) + '.' : 'All caught up. No requests waiting.') + '</div>'; return; }
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
      const rid = card.getAttribute('data-id');
      PENDING = PENDING.filter(function(x){ return String(x.id) !== String(rid); });
      const rx = REQS.find(function(x){ return String(x.id) === String(rid); }); if(rx) rx.status = status;
      card.style.opacity = '.35';
      card.querySelector('.acts').innerHTML = '<div class="adm-note" style="grid-column:1/-1;text-align:center">' + (status === 'Approved' ? 'Approved ✓ guest is notified' : 'Declined') + '</div>';
      loadStats().catch(function(){});
    } catch(e){ btns.forEach(function(b){ b.disabled = false; }); showErr(e.message); }
  }

  const todayAms = function(){ return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
  async function quickNoShow(btn){
    if(!btn.classList.contains('sure')){ btn.classList.add('sure'); btn.textContent = 'Sure?'; setTimeout(function(){ if(btn.isConnected && !btn.disabled){ btn.classList.remove('sure'); btn.textContent = 'No-show'; } }, 4000); return; }
    btn.disabled = true; btn.textContent = '…';
    const id = btn.getAttribute('data-noshow');
    try{
      await api('/api/admin-requests', { method: 'POST', body: { id: id, status: 'No-Show' } });
      const x = REQS.find(function(r){ return String(r.id) === String(id); }); if(x) x.status = 'No-Show';
      renderList(); renderEvents(); loadStats().catch(function(){});
    } catch(e){ btn.disabled = false; btn.classList.remove('sure'); btn.textContent = 'No-show'; showErr(e.message); }
  }
  async function saveMissing(btn){
    const box = btn.closest('.adm-partial'); const id = box.getAttribute('data-id');
    const n = Number(document.getElementById('admMissing').value);
    btn.disabled = true;
    try{
      await api('/api/admin-requests', { method: 'POST', body: { id: id, missing_guests: n } });
      const x = REQS.find(function(r){ return String(r.id) === String(id); }); if(x) x.missing_guests = n;
      document.getElementById('admMissingNote').textContent = 'Saved ✓ the guest is notified.';
      if(listCtx) renderList(); renderEvents();
    } catch(e){ document.getElementById('admMissingNote').textContent = e.message; }
    btn.disabled = false;
  }
  const st = function(x){ return String(x.status || 'pending').trim().toLowerCase(); };
  const fullName = function(x){ return ((x.first_name || '') + ' ' + (x.last_name || '')).trim() || 'Guest'; };
  const gName = function(g){ return ((g.firstName || g.first_name || g.name || '') + ' ' + (g.lastName || g.last_name || '')).trim(); };
  function dl(rows){ return '<dl class="adm-dl">' + rows.filter(function(r){ return r[1] !== '' && r[1] != null; }).map(function(r){ return '<div><span class="k">' + esc(r[0]) + '</span><b>' + r[1] + '</b></div>'; }).join('') + '</dl>'; }
  function waNumber(p){ let n = String(p || '').replace(/[^0-9+]/g, ''); if(n.indexOf('+') === 0) n = n.slice(1); else if(n.indexOf('00') === 0) n = n.slice(2); else if(n.indexOf('06') === 0) n = '31' + n.slice(1); return n; }

  function openDetail(id){
    const x = REQS.find(function(r){ return String(r.id) === String(id); });
    if(!x){ return; }
    const s = st(x), ig = String(x.instagram || '').replace(/^@/, '');
    const guests = Array.isArray(x.additional_guests) ? x.additional_guests : [];
    const created = x.created_at ? new Date(x.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    let html = '<div class="adm-head"><div class="adm-title"><small>' + esc(x.event_name) + ' · ' + esc(day(x.event_date)) + '</small>' + esc(fullName(x)) + '</div>' +
      '<button type="button" class="adm-btn" data-close="admDetail">Back</button></div>' +
      '<span class="adm-pill ' + esc(s) + '">' + esc(x.status || 'Pending') + '</span>' +
      dl([
        ['Party', (x.total_guests || 1) + ' person' + ((x.total_guests || 1) > 1 ? 's' : '') + (x.missing_guests ? ' · ' + x.missing_guests + ' missing' : '')],
        ['Age', x.age ? esc(x.age) : ''],
        ['Gender', x.gender ? esc(x.gender) : ''],
        ['Instagram', ig ? '<a href="https://instagram.com/' + encodeURIComponent(ig) + '" target="_blank" rel="noopener">@' + esc(ig) + '</a>' : ''],
        ['Phone', x.phone ? '<a href="tel:' + esc(x.phone) + '">' + esc(x.phone) + '</a>' : ''],
        ['Email', x.email ? '<a href="mailto:' + esc(x.email) + '">' + esc(x.email) + '</a>' : ''],
        ['Requested', esc(created)]
      ]);
    const c = [];
    if(x.phone) c.push('<a href="https://wa.me/' + waNumber(x.phone) + '" target="_blank" rel="noopener">WhatsApp</a>');
    if(x.phone) c.push('<a href="tel:' + esc(x.phone) + '">Call</a>');
    if(ig) c.push('<a href="https://ig.me/m/' + encodeURIComponent(ig) + '" target="_blank" rel="noopener">DM</a>');
    if(c.length) html += '<div class="adm-contact">' + c.join('') + '</div>';
    if(guests.length){
      html += '<div class="adm-sec">Guests (' + guests.length + ')</div>' + guests.map(function(g, i){
        return dl([
          ['Guest ' + (i + 2), esc(gName(g) || '—')],
          ['Age', g.age ? esc(g.age) : ''],
          ['Gender', g.gender ? esc(g.gender) : ''],
          ['Email', g.email ? '<a href="mailto:' + esc(g.email) + '">' + esc(g.email) + '</a>' : '']
        ]);
      }).join('');
    }
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const past = String(x.event_date) <= today; // the party night itself counts too
    const total = Number(x.total_guests) || 1;
    if(s === 'approved' && past && total > 1){
      const miss = Number(x.missing_guests) || 0;
      let opts = '';
      for(let i = 0; i < total; i++) opts += '<option value="' + i + '"' + (i === miss ? ' selected' : '') + '>' + (i === 0 ? 'Everyone came' : i + ' of ' + total + ' didn\'t come') + '</option>';
      html += '<div class="adm-sec">Part of the group didn\'t come?</div><div class="adm-partial" data-id="' + esc(x.id) + '"><select id="admMissing">' + opts + '</select><button type="button" class="adm-btn" id="admMissingSave">Save</button></div>' +
        '<div class="adm-note" id="admMissingNote">The guest gets a notification. -2 points per missing person.</div>';
    }
    let acts = '';
    if(s === 'pending') acts = '<button type="button" data-set="Declined" class="bad">Decline</button><button type="button" data-set="Approved" class="ok">Approve</button>';
    else if(s === 'approved') acts = past ? '<button type="button" data-set="No-Show" class="bad">No-show</button><button type="button" data-set="Approved" disabled>Approved ✓</button>' : '<button type="button" data-set="Declined" class="bad">Remove from list</button><button type="button" data-set="Approved" disabled>Approved ✓</button>';
    else if(s === 'declined' || s === 'no-show') acts = '<button type="button" data-set="Pending">Back to pending</button><button type="button" data-set="Approved" class="ok">Approve</button>';
    if(acts) html += '<div class="adm-acts" data-id="' + esc(x.id) + '">' + acts + '</div>';
    html += '<div class="adm-err" id="admDetailErr" hidden></div>';
    detailLayer.innerHTML = html;
    detailLayer.classList.add('is-open'); detailLayer.scrollTop = 0;
  }

  async function setStatus(id, status, btn){
    const box = btn.closest('.adm-acts'); box.querySelectorAll('button').forEach(function(b){ b.disabled = true; });
    try{
      await api('/api/admin-requests', { method: 'POST', body: { id: id, status: status } });
      const x = REQS.find(function(r){ return String(r.id) === String(id); }); if(x) x.status = status;
      openDetail(id);
      loadReqs().catch(function(){}); loadStats().catch(function(){});
      if(listCtx) renderList();
    } catch(e){
      box.querySelectorAll('button').forEach(function(b){ b.disabled = false; });
      const er = document.getElementById('admDetailErr'); er.textContent = e.message; er.hidden = false;
    }
  }

  function openList(name, date){ listCtx = { name: name, date: date, filter: 'all' }; renderList(); listLayer.classList.add('is-open'); listLayer.scrollTop = 0; }
  function renderList(){
    const rows = REQS.filter(function(r){ return r.event_name === listCtx.name && String(r.event_date) === listCtx.date; });
    const count = function(f){ return rows.filter(function(r){ return f === 'all' ? true : st(r) === f; }).length; };
    const shown = rows.filter(function(r){ return listCtx.filter === 'all' ? true : st(r) === listCtx.filter; });
    const approved = rows.filter(function(r){ return st(r) === 'approved'; });
    const guestTotal = approved.reduce(function(n, r){ return n + (Number(r.total_guests) || 1); }, 0);
    const tab = function(f, label){ return '<button type="button" data-filter="' + f + '" class="' + (listCtx.filter === f ? 'on' : '') + '">' + label + ' (' + count(f) + ')</button>'; };
    listLayer.innerHTML =
      '<div class="adm-head"><div class="adm-title"><small>' + esc(day(listCtx.date)) + ' · ' + guestTotal + ' guests on the list</small>' + esc(listCtx.name) + '</div>' +
      '<button type="button" class="adm-btn" data-close="admList">Back</button></div>' +
      '<div class="adm-tabs">' + tab('all', 'All') + tab('approved', 'Approved') + tab('pending', 'Pending') + tab('declined', 'Declined') + '</div>' +
      (shown.length ? shown.map(function(r){
        const nsBtn = (st(r) === 'approved' && String(r.event_date) <= todayAms()) ? '<button type="button" class="adm-ns" data-noshow="' + esc(r.id) + '">No-show</button>' : '';
        return '<div class="adm-row" data-open="' + esc(r.id) + '"><div><b>' + esc(fullName(r)) + '</b><small>' + (r.total_guests || 1) + ' guest' + ((r.total_guests || 1) > 1 ? 's' : '') + (Number(r.missing_guests) ? ' · ' + r.missing_guests + ' didn\'t come' : '') + (r.instagram ? ' · @' + esc(String(r.instagram).replace(/^@/, '')) : '') + '</small></div><div style="display:flex;align-items:center"><span class="adm-pill ' + esc(st(r)) + '">' + esc(r.status || 'Pending') + '</span>' + nsBtn + '</div></div>';
      }).join('') : '<div class="adm-empty">No requests here.</div>') +
      (approved.length ? '<div class="adm-push" style="margin-top:16px"><button type="button" id="admCopyNames">Copy guestlist names</button><div class="adm-note" id="admCopyNote">Copies every approved name (incl. their guests) to send to the door.</div></div>' : '');
  }
  function copyNames(){
    const rows = REQS.filter(function(r){ return r.event_name === listCtx.name && String(r.event_date) === listCtx.date && st(r) === 'approved'; });
    const names = [];
    rows.forEach(function(r){ names.push(fullName(r)); (Array.isArray(r.additional_guests) ? r.additional_guests : []).forEach(function(g){ const n = gName(g); if(n) names.push(n); }); });
    const text = listCtx.name + ' · ' + day(listCtx.date) + ' (' + names.length + ')\n' + names.map(function(n, i){ return (i + 1) + '. ' + n; }).join('\n');
    const done = function(){ document.getElementById('admCopyNote').textContent = 'Copied ✓ ' + names.length + ' names'; };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function(){ prompt('Copy the list:', text); });
    else prompt('Copy the list:', text);
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

  // New parties: first tap = preview, second tap = send.
  let newArmed = false;
  async function announceNew(){
    const btn = document.getElementById('admNewBtn'), note = document.getElementById('admNewNote');
    btn.disabled = true;
    try{
      if(!newArmed){
        const r = await api('/api/announce-new');
        if(r.dryRun){
          note.innerHTML = '<b style="color:var(--white)">' + esc(r.title) + '</b><br>' + esc(r.body) + '<br><span style="color:var(--gold)">Goes to ' + r.recipients + ' devices.</span>';
          btn.textContent = 'Send this to everyone'; btn.classList.add('arm'); newArmed = true;
        } else if(r.initialised){
          note.textContent = 'All current parties are now marked as known. From now on new ones are announced.'; btn.textContent = 'Check for new parties';
        } else {
          note.textContent = 'No new parties since the last announcement.'; btn.textContent = 'Check for new parties';
        }
      } else {
        const r = await api('/api/announce-new', { method: 'POST', body: {} });
        note.textContent = r.sent ? 'Sent ✓ to ' + r.pushed + ' devices' : 'Nothing sent (' + (r.skipped || r.error || 'no new parties') + ').';
        btn.textContent = 'Check for new parties'; btn.classList.remove('arm'); newArmed = false;
      }
    } catch(e){ showErr(e.message); newArmed = false; btn.classList.remove('arm'); btn.textContent = 'Check for new parties'; }
    btn.disabled = false;
  }

  function open(){ PARTY = ''; sheet.classList.add('is-open'); document.body.style.overflow = 'hidden'; refresh(); }
  function close(){ sheet.classList.remove('is-open'); listLayer.classList.remove('is-open'); detailLayer.classList.remove('is-open'); listCtx = null; document.body.style.overflow = ''; }

  document.getElementById('admClose').addEventListener('click', close);
  document.getElementById('admRefresh').addEventListener('click', refresh);
  document.getElementById('admPushSend').addEventListener('click', sendPush);
  document.getElementById('admNewBtn').addEventListener('click', announceNew);
  sheet.addEventListener('input', function(e){ if(e.target && e.target.id === 'admIgSearch'){ IG_Q = e.target.value; IG_SHOW = 40; renderIg(); } });
  sheet.addEventListener('click', function(e){
    const it = e.target.closest('#admIgTabs button[data-igtab]');
    if(it){ IG_TAB = it.getAttribute('data-igtab'); IG_SHOW = 40; renderIg(); return; }
    const ig = e.target.closest('[data-ig] button[data-g]');
    if(ig){ if(!ig.disabled) setIgGender(ig); return; }
    if(e.target.closest('#admIgMore')){ IG_SHOW += 40; renderIg(); return; }
    if(e.target.closest('#admIgCopy')){ copyIg(); return; }
    const wf = e.target.closest('#admWhen button[data-when]');
    if(wf){ setWhen(wf.getAttribute('data-when')); return; }
    const pf = e.target.closest('#admFilter button[data-party]');
    if(pf){ setParty(pf.getAttribute('data-party')); return; }
    const b = e.target.closest('.adm-req button[data-act]');
    if(b){ act(b.closest('.adm-req'), b.getAttribute('data-act')); return; }
    if(e.target.closest('a')) return;
    const card = e.target.closest('.adm-req[data-id]');
    if(card){ openDetail(card.getAttribute('data-id')); return; }
    const ev = e.target.closest('.adm-ev[data-name]');
    if(ev) openList(ev.getAttribute('data-name'), ev.getAttribute('data-date'));
  });
  [listLayer, detailLayer].forEach(function(layer){
    layer.addEventListener('click', function(e){
      const c = e.target.closest('[data-close]');
      if(c){ document.getElementById(c.getAttribute('data-close')).classList.remove('is-open'); if(c.getAttribute('data-close') === 'admList') listCtx = null; return; }
      const f = e.target.closest('[data-filter]');
      if(f){ listCtx.filter = f.getAttribute('data-filter'); renderList(); return; }
      const ns = e.target.closest('button[data-noshow]');
      if(ns){ if(!ns.disabled) quickNoShow(ns); return; }
      if(e.target.closest('#admMissingSave')){ saveMissing(e.target.closest('#admMissingSave')); return; }
      if(e.target.closest('#admMissing')) return;
      const o = e.target.closest('[data-open]');
      if(o){ openDetail(o.getAttribute('data-open')); return; }
      if(e.target.closest('#admCopyNames')){ copyNames(); return; }
      const s2 = e.target.closest('.adm-acts button[data-set]');
      if(s2 && !s2.disabled) setStatus(s2.closest('.adm-acts').getAttribute('data-id'), s2.getAttribute('data-set'), s2);
    });
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
