/* ================================================================
   THE SALON
   1) Party Backrooms — one group chat per party, open only to guests whose
      guestlist request for that party is Approved (enforced in the database).
   2) Private chats — opt-in 1-to-1 chat between AGS members.
   All user-provided text is rendered with textContent (never innerHTML).
   ================================================================ */
(function(){
  'use strict';

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : null;
  let me = null;            // signed-in auth user
  let available = false;    // salon tables exist
  let member = null;        // my salon_members row (private chats), or null
  let members = [];         // all salon members (visible to members only)
  let blocked = new Set();  // ids I blocked
  let messages = [];        // my private messages, newest first
  let parties = [];         // my requests for upcoming parties
  let tab = 'parties';
  let chatWith = null;      // member object while a private chat is open
  let room = null;          // { name, date, venue } while a party Backroom is open
  let roomPeople = {};      // user_id -> display name (approved guests)
  let roomMessages = [];    // party messages, oldest first
  let channel = null;
  let pollTimer = null;

  const $ = function(id){ return document.getElementById(id); };
  function el(tag, cls, text){
    const n = document.createElement(tag);
    if(cls) n.className = cls;
    if(text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function clear(n){ while(n.firstChild) n.removeChild(n.firstChild); }
  function initials(name){
    const parts = String(name || '?').trim().split(/\s+/);
    return ((parts[0] || '?').charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : '')).toUpperCase();
  }
  function timeLabel(iso){
    const d = new Date(iso), now = new Date();
    const hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    if(d.toDateString() === now.toDateString()) return hm;
    return d.getDate() + '/' + (d.getMonth() + 1) + ' ' + hm;
  }
  function dateLabel(isoDate){
    const d = new Date(isoDate + 'T12:00:00');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
  }
  function memberById(id){
    for(let i = 0; i < members.length; i++){ if(members[i].user_id === id) return members[i]; }
    return null;
  }
  function nameOf(id){ const m = memberById(id); return m ? m.display_name : 'Former member'; }
  function avatar(name){ return el('div', 'salon-avatar', initials(name)); }
  function isApproved(p){ return String(p.status || '').trim().toLowerCase() === 'approved'; }

  /* ---------- availability + entry card ---------- */
  async function init(user){
    me = user;
    available = false; member = null;
    const card = $('salonCard');
    if(!sb || !user){ if(card) card.style.display = 'none'; return; }
    try{
      const res = await sb.from('salon_members').select('user_id,display_name,joined_at').eq('user_id', user.id).maybeSingle();
      if(res.error){ if(card) card.style.display = 'none'; return; } // tables not created yet
      available = true;
      member = res.data || null;
    } catch(e){ if(card) card.style.display = 'none'; return; }
    renderCard();
    if(member){ refreshUnreadBadge(); }
  }

  function renderCard(){
    const card = $('salonCard');
    if(!card) return;
    card.style.display = 'block';
    $('salonCardBtn').textContent = 'Enter the Backroom';
  }

  async function refreshUnreadBadge(){
    if(!member) return;
    try{
      const res = await sb.from('salon_messages').select('id', { count: 'exact', head: true })
        .eq('recipient_id', me.id).is('read_at', null);
      const n = res.count || 0;
      const b = $('salonCardBadge');
      b.textContent = String(n);
      b.style.display = n > 0 ? 'inline-flex' : 'none';
    } catch(e){}
  }

  /* ---------- open / close ---------- */
  function openSalon(){
    if(!available || !me) return;
    $('salonOverlay').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    tab = 'parties';
    room = null; chatWith = null;
    showView('main');
    syncTabs();
    renderMain();
    loadAll().then(function(){ renderMain(); startLive(); });
  }
  function closeSalon(){
    $('salonOverlay').classList.remove('is-open');
    document.body.style.overflow = '';
    stopLive();
    chatWith = null; room = null;
    refreshUnreadBadge();
  }
  function showView(name){
    ['join', 'main', 'chat'].forEach(function(v){
      $('salonView-' + v).style.display = v === name ? 'flex' : 'none';
    });
  }

  /* ---------- join / leave (private chats) ---------- */
  function openJoin(){
    showView('join');
    const meta = (me && me.user_metadata) || {};
    const first = (meta.first_name || '').trim();
    const last = (meta.last_name || '').trim();
    $('salonJoinName').value = (first + (last ? ' ' + last.charAt(0) + '.' : '')).trim();
    $('salonJoinErr').style.display = 'none';
  }
  async function join(){
    const name = $('salonJoinName').value.trim();
    const err = $('salonJoinErr');
    if(name.length < 2 || name.length > 30){ err.textContent = 'Choose a name of 2–30 characters.'; err.style.display = 'block'; return; }
    if(!$('salonJoinRules').checked){ err.textContent = 'Please agree to the Backroom rules.'; err.style.display = 'block'; return; }
    err.style.display = 'none';
    const btn = $('salonJoinBtn'); btn.disabled = true;
    const res = await sb.from('salon_members').insert({ user_id: me.id, display_name: name }).select().single();
    btn.disabled = false;
    if(res.error){ err.textContent = 'Could not join right now. Please try again.'; err.style.display = 'block'; return; }
    member = res.data;
    tab = 'convos';
    showView('main'); syncTabs();
    await loadAll(); renderMain(); startLive();
  }
  async function leave(){
    if(!window.confirm('Leave the private chats? Your private conversations will be deleted for everyone and you will disappear from the member list. Your party Backrooms are not affected.')) return;
    const res = await sb.rpc('leave_salon');
    if(res.error){ window.alert('Could not leave right now. Please try again.'); return; }
    member = null; members = []; messages = [];
    tab = 'parties'; syncTabs(); renderMain();
  }

  /* ---------- data ---------- */
  async function loadAll(){
    const today = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
    const jobs = [
      sb.from('salon_blocks').select('blocked_id'),
      sb.from('guestlist_requests').select('id,event_name,event_date,event_venue,status').gte('event_date', today).order('event_date', { ascending: true })
    ];
    if(member){
      jobs.push(sb.from('salon_members').select('user_id,display_name,joined_at').order('joined_at', { ascending: true }));
      jobs.push(sb.from('salon_messages').select('id,sender_id,recipient_id,body,created_at,read_at').order('created_at', { ascending: false }).limit(600));
    }
    const r = await Promise.all(jobs);
    blocked = new Set((r[0].data || []).map(function(x){ return x.blocked_id; }));
    // one row per party; an approved request wins over a pending one
    const byKey = {};
    (r[1].data || []).forEach(function(p){
      const k = p.event_date + '|' + p.event_name;
      if(!byKey[k] || (isApproved(p) && !isApproved(byKey[k]))) byKey[k] = p;
    });
    parties = Object.keys(byKey).map(function(k){ return byKey[k]; })
      .filter(function(p){ const s = String(p.status || 'Pending').trim().toLowerCase(); return s === 'approved' || s === 'pending'; })
      .sort(function(a, b){ return a.event_date < b.event_date ? -1 : 1; });
    if(member){
      members = r[2].data || [];
      messages = r[3].data || [];
    }
  }
  async function reloadMessages(){
    if(room){ return reloadRoom(); }
    if(!member) return;
    const res = await sb.from('salon_messages').select('id,sender_id,recipient_id,body,created_at,read_at').order('created_at', { ascending: false }).limit(600);
    if(res.error || !res.data) return;
    messages = res.data;
    if(chatWith){ renderChat(true); markRead(chatWith.user_id); } else if($('salonView-main').style.display !== 'none'){ renderMain(); }
  }
  function startLive(){
    stopLive();
    try{
      channel = sb.channel('salon-' + me.id)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'salon_messages', filter: 'recipient_id=eq.' + me.id }, function(){ reloadMessages(); })
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'event_salon_messages' }, function(){ if(room) reloadRoom(); })
        .subscribe();
    } catch(e){}
    pollTimer = setInterval(reloadMessages, 6000); // fallback if realtime is unavailable
  }
  function stopLive(){
    if(channel){ try{ sb.removeChannel(channel); }catch(e){} channel = null; }
    if(pollTimer){ clearInterval(pollTimer); pollTimer = null; }
  }

  /* ---------- main view ---------- */
  function syncTabs(){
    $('salonTabParties').classList.toggle('is-active', tab === 'parties');
    $('salonTabConvos').classList.toggle('is-active', tab === 'convos');
    $('salonTabMembers').classList.toggle('is-active', tab === 'members');
  }
  function setTab(t){
    tab = t; syncTabs(); renderMain();
  }
  function joinPrompt(list){
    const box = el('div', 'salon-empty');
    box.appendChild(el('p', null, 'Join the private chats to message other AGS members one-to-one.'));
    const b = el('button', 'btn btn--solid', 'Join the Backroom');
    b.type = 'button';
    b.style.marginTop = '14px';
    b.addEventListener('click', openJoin);
    box.appendChild(b);
    list.appendChild(box);
  }
  function renderMain(){
    $('salonTabMembers').textContent = member ? 'Members (' + members.length + ')' : 'Members';
    $('salonLeaveBtn').style.display = member ? 'block' : 'none';
    const list = $('salonList');
    clear(list);

    if(tab === 'parties'){
      if(!parties.length){
        list.appendChild(el('p', 'salon-empty', 'Every party has its own Backroom. Request a guestlist spot — once you are approved, the Backroom for that party opens here.'));
        return;
      }
      parties.forEach(function(p){
        const ok = isApproved(p);
        const row = el('button', 'salon-row' + (ok ? '' : ' is-locked'));
        row.type = 'button';
        row.appendChild(avatar(p.event_name));
        const mid = el('div', 'salon-row__mid');
        mid.appendChild(el('div', 'salon-row__name', p.event_name));
        mid.appendChild(el('div', 'salon-row__sub', ok ? 'Group chat · tap to open' : '🔒 Opens when you are approved'));
        row.appendChild(mid);
        row.appendChild(el('div', 'salon-row__time', dateLabel(p.event_date)));
        row.addEventListener('click', function(){
          if(ok) openRoom(p);
          else window.alert('The Backroom for ' + p.event_name + ' opens as soon as your guestlist request is approved.');
        });
        list.appendChild(row);
      });
      return;
    }

    if(!member){ joinPrompt(list); return; }

    if(tab === 'members'){
      const others = members.filter(function(m){ return m.user_id !== me.id && !blocked.has(m.user_id); });
      if(!others.length){ list.appendChild(el('p', 'salon-empty', 'No other members yet. Be the first to say hi when someone joins.')); }
      others.forEach(function(m){
        const row = el('button', 'salon-row');
        row.type = 'button';
        row.appendChild(avatar(m.display_name));
        const mid = el('div', 'salon-row__mid');
        mid.appendChild(el('div', 'salon-row__name', m.display_name));
        mid.appendChild(el('div', 'salon-row__sub', 'Tap to start a conversation'));
        row.appendChild(mid);
        row.addEventListener('click', function(){ openChat(m); });
        list.appendChild(row);
      });
      return;
    }
    // private conversations: group by the other person, newest first
    const seen = {}, convos = [];
    messages.forEach(function(msg){
      const other = msg.sender_id === me.id ? msg.recipient_id : msg.sender_id;
      if(blocked.has(other)) return;
      if(!seen[other]){ seen[other] = { id: other, last: msg, unread: 0 }; convos.push(seen[other]); }
      if(msg.recipient_id === me.id && !msg.read_at) seen[other].unread++;
    });
    if(!convos.length){ list.appendChild(el('p', 'salon-empty', 'No conversations yet. Tap + to find a member and say hi.')); }
    convos.forEach(function(c){
      const row = el('button', 'salon-row');
      row.type = 'button';
      row.appendChild(avatar(nameOf(c.id)));
      const mid = el('div', 'salon-row__mid');
      mid.appendChild(el('div', 'salon-row__name', nameOf(c.id)));
      mid.appendChild(el('div', 'salon-row__sub' + (c.unread ? ' is-unread' : ''), (c.last.sender_id === me.id ? 'You: ' : '') + c.last.body));
      row.appendChild(mid);
      const right = el('div', 'salon-row__right');
      right.appendChild(el('div', 'salon-row__time', timeLabel(c.last.created_at)));
      if(c.unread) right.appendChild(el('span', 'salon-dot', String(c.unread)));
      row.appendChild(right);
      const m = memberById(c.id);
      row.addEventListener('click', function(){ if(m) openChat(m); });
      list.appendChild(row);
    });
  }

  /* ---------- private chat view ---------- */
  function openChat(m){
    room = null;
    chatWith = m;
    $('salonChatName').textContent = m.display_name;
    $('salonMenuBtn').style.display = '';
    $('salonMenu').style.display = 'none';
    showView('chat');
    renderChat(false);
    markRead(m.user_id);
    setTimeout(function(){ $('salonChatInput').focus(); }, 50);
  }
  function renderChat(keepScroll){
    const wrap = $('salonMessages');
    const nearBottom = wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight < 80;
    clear(wrap);
    const thread = messages.filter(function(x){
      return (x.sender_id === me.id && x.recipient_id === chatWith.user_id) || (x.sender_id === chatWith.user_id && x.recipient_id === me.id);
    }).slice().reverse();
    if(!thread.length){ wrap.appendChild(el('p', 'salon-empty', 'Say hi to ' + chatWith.display_name + '.')); }
    thread.forEach(function(x){
      const mine = x.sender_id === me.id;
      const b = el('div', 'salon-bubble ' + (mine ? 'is-mine' : 'is-theirs'));
      b.appendChild(el('div', 'salon-bubble__text', x.body));
      b.appendChild(el('div', 'salon-bubble__time', timeLabel(x.created_at)));
      wrap.appendChild(b);
    });
    if(!keepScroll || nearBottom) wrap.scrollTop = wrap.scrollHeight;
  }
  async function markRead(otherId){
    const unread = messages.some(function(x){ return x.sender_id === otherId && x.recipient_id === me.id && !x.read_at; });
    if(!unread) return;
    const now = new Date().toISOString();
    messages.forEach(function(x){ if(x.sender_id === otherId && x.recipient_id === me.id && !x.read_at) x.read_at = now; });
    await sb.from('salon_messages').update({ read_at: now }).eq('sender_id', otherId).eq('recipient_id', me.id).is('read_at', null);
  }

  /* ---------- party Backroom (group chat) ---------- */
  async function openRoom(p){
    room = { name: p.event_name, date: p.event_date, venue: p.event_venue };
    chatWith = null;
    roomPeople = {}; roomMessages = [];
    $('salonChatName').textContent = p.event_name;
    $('salonMenuBtn').style.display = 'none';
    $('salonMenu').style.display = 'none';
    $('salonChatErr').style.display = 'none';
    showView('chat');
    renderRoom(false);
    await reloadRoom(true);
    setTimeout(function(){ $('salonChatInput').focus(); }, 50);
  }
  async function reloadRoom(first){
    if(!room) return;
    const cur = room;
    const res = await Promise.all([
      sb.from('event_salon_messages').select('id,sender_id,body,created_at').eq('event_name', cur.name).eq('event_date', cur.date).order('created_at', { ascending: true }).limit(300),
      sb.rpc('event_salon_people', { p_name: cur.name, p_date: cur.date })
    ]);
    if(room !== cur) return; // user moved on
    if(res[0].error){
      if(first){ const e = $('salonChatErr'); e.textContent = 'This Backroom is only open to approved guests.'; e.style.display = 'block'; }
      return;
    }
    roomMessages = res[0].data || [];
    roomPeople = {};
    (res[1].data || []).forEach(function(x){ roomPeople[x.user_id] = x.display_name; });
    renderRoom(!first);
  }
  function renderRoom(keepScroll){
    const wrap = $('salonMessages');
    const nearBottom = wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight < 80;
    clear(wrap);
    const head = el('p', 'salon-roominfo', 'Group chat for approved guests of ' + room.name + ' · ' + dateLabel(room.date) + '. Be respectful.');
    wrap.appendChild(head);
    const visible = roomMessages.filter(function(x){ return !blocked.has(x.sender_id); });
    if(!visible.length){ wrap.appendChild(el('p', 'salon-empty', 'No messages yet. Say hi to the other guests.')); }
    visible.forEach(function(x){
      const mine = x.sender_id === me.id;
      const b = el('div', 'salon-bubble ' + (mine ? 'is-mine' : 'is-theirs'));
      if(!mine) b.appendChild(el('div', 'salon-bubble__who', roomPeople[x.sender_id] || 'Guest'));
      b.appendChild(el('div', 'salon-bubble__text', x.body));
      const foot = el('div', 'salon-bubble__time', timeLabel(x.created_at));
      b.appendChild(foot);
      if(!mine){
        const acts = el('div', 'salon-bubble__acts');
        const rep = el('button', null, 'Report'); rep.type = 'button';
        rep.addEventListener('click', function(){ reportUser(x.sender_id, roomPeople[x.sender_id] || 'this guest'); });
        const blk = el('button', null, 'Block'); blk.type = 'button';
        blk.addEventListener('click', function(){ blockUser(x.sender_id, roomPeople[x.sender_id] || 'this guest', true); });
        acts.appendChild(rep); acts.appendChild(blk);
        b.appendChild(acts);
      } else {
        const acts = el('div', 'salon-bubble__acts');
        const del = el('button', null, 'Delete'); del.type = 'button';
        del.addEventListener('click', async function(){
          if(!window.confirm('Delete this message?')) return;
          await sb.from('event_salon_messages').delete().eq('id', x.id);
          reloadRoom();
        });
        acts.appendChild(del);
        b.appendChild(acts);
      }
      wrap.appendChild(b);
    });
    if(!keepScroll || nearBottom) wrap.scrollTop = wrap.scrollHeight;
  }

  /* ---------- sending ---------- */
  async function send(){
    const input = $('salonChatInput');
    const body = input.value.trim();
    if(!body) return;
    const err = $('salonChatErr');
    err.style.display = 'none';
    const btn = $('salonSendBtn'); btn.disabled = true;
    if(room){
      const res = await sb.from('event_salon_messages')
        .insert({ event_name: room.name, event_date: room.date, sender_id: me.id, body: body.slice(0, 1000) })
        .select('id,sender_id,body,created_at').single();
      btn.disabled = false;
      if(res.error || !res.data){
        err.textContent = 'Message not sent. This Backroom is only open to approved guests.';
        err.style.display = 'block';
        return;
      }
      input.value = '';
      roomMessages.push(res.data);
      renderRoom(false);
      return;
    }
    if(!chatWith){ btn.disabled = false; return; }
    const res = await sb.from('salon_messages')
      .insert({ sender_id: me.id, recipient_id: chatWith.user_id, body: body.slice(0, 1000) })
      .select('id,sender_id,recipient_id,body,created_at,read_at').single();
    btn.disabled = false;
    if(res.error || !res.data){
      err.textContent = 'Message not sent. This member may have left or blocked you.';
      err.style.display = 'block';
      return;
    }
    input.value = '';
    messages.unshift(res.data);
    renderChat(false);
  }
  function backFromChat(){
    const wasRoom = !!room;
    chatWith = null; room = null;
    $('salonChatErr').style.display = 'none';
    tab = wasRoom ? 'parties' : (tab === 'parties' ? 'convos' : tab);
    showView('main'); syncTabs();
    renderMain();
  }

  /* ---------- block / report ---------- */
  async function blockUser(id, name, fromRoom){
    if(!window.confirm('Block ' + name + '? You will no longer see their messages.')) return;
    const res = await sb.from('salon_blocks').insert({ blocker_id: me.id, blocked_id: id });
    if(res.error){ window.alert('Could not block right now. Please try again.'); return; }
    blocked.add(id);
    if(fromRoom){ renderRoom(true); } else { backFromChat(); }
  }
  async function reportUser(id, name){
    const reason = window.prompt('Why are you reporting ' + name + '? (optional)');
    if(reason === null) return;
    const res = await sb.from('salon_reports').insert({ reporter_id: me.id, reported_id: id, reason: String(reason).trim().slice(0, 500) || null });
    window.alert(res.error ? 'Could not send the report. Please try again.' : 'Thanks — we will look into it. You can also block this guest.');
    $('salonMenu').style.display = 'none';
  }

  /* ---------- wire up ---------- */
  function wire(){
    if(!$('salonOverlay')) return;
    $('salonCardBtn').addEventListener('click', openSalon);
    const homeBtn = $('backroomHomeBtn');
    if(homeBtn) homeBtn.addEventListener('click', function(){
      if(!me){ if(typeof switchTab === 'function') switchTab('account'); return; }
      if(!available){ window.alert('The Backroom is not available right now. Please try again later.'); return; }
      openSalon();
    });
    $('salonBackBtn').addEventListener('click', closeSalon);
    $('salonJoinBack').addEventListener('click', function(){ showView('main'); });
    $('salonJoinBtn').addEventListener('click', join);
    $('salonTabParties').addEventListener('click', function(){ setTab('parties'); });
    $('salonTabConvos').addEventListener('click', function(){ setTab('convos'); });
    $('salonTabMembers').addEventListener('click', function(){ setTab('members'); });
    $('salonNewBtn').addEventListener('click', function(){ if(member){ setTab('members'); } else { openJoin(); } });
    $('salonLeaveBtn').addEventListener('click', leave);
    $('salonChatBack').addEventListener('click', backFromChat);
    $('salonSendBtn').addEventListener('click', send);
    $('salonChatInput').addEventListener('keydown', function(e){
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(); }
    });
    $('salonMenuBtn').addEventListener('click', function(){
      const m = $('salonMenu'); m.style.display = m.style.display === 'block' ? 'none' : 'block';
    });
    $('salonBlockBtn').addEventListener('click', function(){ if(chatWith) blockUser(chatWith.user_id, chatWith.display_name, false); });
    $('salonReportBtn').addEventListener('click', function(){ if(chatWith) reportUser(chatWith.user_id, chatWith.display_name); });
  }
  wire();

  window.salonInit = init;
  window.salonStop = function(){
    stopLive(); me = null; member = null; available = false; members = []; messages = []; parties = []; room = null; chatWith = null;
    const o = $('salonOverlay'); if(o) o.classList.remove('is-open');
    document.body.style.overflow = '';
    const c = $('salonCard'); if(c) c.style.display = 'none';
  };
})();
