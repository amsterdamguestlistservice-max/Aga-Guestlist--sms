/* ================================================================
   THE SALON — members-only 1-to-1 chat between AGS members.
   Needs the salon_* tables in Supabase (see README). If they are not
   there yet, the Salon card on the Account tab stays hidden.
   All user-provided text is rendered with textContent (never innerHTML).
   ================================================================ */
(function(){
  'use strict';

  const sb = (typeof supabaseClient !== 'undefined') ? supabaseClient : null;
  let me = null;            // signed-in auth user
  let available = false;    // salon tables exist
  let member = null;        // my salon_members row, or null
  let members = [];         // all salon members (visible to members only)
  let blocked = new Set();  // ids I blocked
  let messages = [];        // all my messages (sent + received), newest first
  let tab = 'convos';
  let chatWith = null;      // member object while a chat is open
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
  function memberById(id){
    for(let i = 0; i < members.length; i++){ if(members[i].user_id === id) return members[i]; }
    return null;
  }
  function nameOf(id){ const m = memberById(id); return m ? m.display_name : 'Former member'; }
  function avatar(name, size){
    const a = el('div', 'salon-avatar' + (size === 'sm' ? ' salon-avatar--sm' : ''), initials(name));
    return a;
  }

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
    $('salonCardBtn').textContent = member ? 'Enter the Salon' : 'Join the Salon';
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
    if(!member){ showView('join'); prefillName(); return; }
    showView('main');
    loadAll().then(function(){ renderMain(); startLive(); });
  }
  function closeSalon(){
    $('salonOverlay').classList.remove('is-open');
    document.body.style.overflow = '';
    stopLive();
    chatWith = null;
    refreshUnreadBadge();
  }
  function showView(name){
    ['join', 'main', 'chat'].forEach(function(v){
      $('salonView-' + v).style.display = v === name ? 'flex' : 'none';
    });
  }

  /* ---------- join / leave ---------- */
  function prefillName(){
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
    if(!$('salonJoinRules').checked){ err.textContent = 'Please agree to the Salon rules.'; err.style.display = 'block'; return; }
    err.style.display = 'none';
    const btn = $('salonJoinBtn'); btn.disabled = true;
    const res = await sb.from('salon_members').insert({ user_id: me.id, display_name: name }).select().single();
    btn.disabled = false;
    if(res.error){ err.textContent = 'Could not join right now. Please try again.'; err.style.display = 'block'; return; }
    member = res.data;
    renderCard();
    showView('main');
    await loadAll(); renderMain(); startLive();
  }
  async function leave(){
    if(!window.confirm('Leave the Salon? Your conversations will be deleted for everyone and you will disappear from the member list.')) return;
    const res = await sb.rpc('leave_salon');
    if(res.error){ window.alert('Could not leave right now. Please try again.'); return; }
    member = null; members = []; messages = [];
    closeSalon();
    renderCard();
  }

  /* ---------- data ---------- */
  async function loadAll(){
    const results = await Promise.all([
      sb.from('salon_members').select('user_id,display_name,joined_at').order('joined_at', { ascending: true }),
      sb.from('salon_blocks').select('blocked_id'),
      sb.from('salon_messages').select('id,sender_id,recipient_id,body,created_at,read_at').order('created_at', { ascending: false }).limit(600)
    ]);
    members = (results[0].data || []);
    blocked = new Set((results[1].data || []).map(function(r){ return r.blocked_id; }));
    messages = (results[2].data || []);
  }
  async function reloadMessages(){
    const res = await sb.from('salon_messages').select('id,sender_id,recipient_id,body,created_at,read_at').order('created_at', { ascending: false }).limit(600);
    if(res.error || !res.data) return;
    const changed = res.data.length !== messages.length || (res.data[0] && messages[0] && res.data[0].id !== messages[0].id);
    messages = res.data;
    if(changed || true){ if(chatWith){ renderChat(true); markRead(chatWith.user_id); } else { renderMain(); } }
  }
  function startLive(){
    stopLive();
    try{
      channel = sb.channel('salon-' + me.id)
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'salon_messages', filter: 'recipient_id=eq.' + me.id }, function(){ reloadMessages(); })
        .subscribe();
    } catch(e){}
    pollTimer = setInterval(reloadMessages, 8000); // fallback if realtime is unavailable
  }
  function stopLive(){
    if(channel){ try{ sb.removeChannel(channel); }catch(e){} channel = null; }
    if(pollTimer){ clearInterval(pollTimer); pollTimer = null; }
  }

  /* ---------- main view ---------- */
  function setTab(t){
    tab = t;
    $('salonTabConvos').classList.toggle('is-active', t === 'convos');
    $('salonTabMembers').classList.toggle('is-active', t === 'members');
    renderMain();
  }
  function renderMain(){
    $('salonTabMembers').textContent = 'Members (' + members.length + ')';
    const list = $('salonList');
    clear(list);
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
    // conversations: group by the other person, newest first
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

  /* ---------- chat view ---------- */
  function openChat(m){
    chatWith = m;
    $('salonChatName').textContent = m.display_name;
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
  async function send(){
    const input = $('salonChatInput');
    const body = input.value.trim();
    if(!body || !chatWith) return;
    const err = $('salonChatErr');
    err.style.display = 'none';
    const btn = $('salonSendBtn'); btn.disabled = true;
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
    chatWith = null;
    showView('main');
    renderMain();
  }

  /* ---------- block / report ---------- */
  async function blockCurrent(){
    if(!chatWith) return;
    if(!window.confirm('Block ' + chatWith.display_name + '? You will no longer see each other in the Salon.')) return;
    const res = await sb.from('salon_blocks').insert({ blocker_id: me.id, blocked_id: chatWith.user_id });
    if(res.error){ window.alert('Could not block right now. Please try again.'); return; }
    blocked.add(chatWith.user_id);
    backFromChat();
  }
  async function reportCurrent(){
    if(!chatWith) return;
    const reason = window.prompt('Why are you reporting ' + chatWith.display_name + '? (optional)');
    if(reason === null) return;
    const res = await sb.from('salon_reports').insert({ reporter_id: me.id, reported_id: chatWith.user_id, reason: String(reason).trim().slice(0, 500) || null });
    window.alert(res.error ? 'Could not send the report. Please try again.' : 'Thanks — we will look into it. You can also block this member.');
    $('salonMenu').style.display = 'none';
  }

  /* ---------- wire up ---------- */
  function wire(){
    if(!$('salonOverlay')) return;
    $('salonCardBtn').addEventListener('click', openSalon);
    $('salonBackBtn').addEventListener('click', closeSalon);
    $('salonJoinBack').addEventListener('click', closeSalon);
    $('salonJoinBtn').addEventListener('click', join);
    $('salonTabConvos').addEventListener('click', function(){ setTab('convos'); });
    $('salonTabMembers').addEventListener('click', function(){ setTab('members'); });
    $('salonNewBtn').addEventListener('click', function(){ setTab('members'); });
    $('salonLeaveBtn').addEventListener('click', leave);
    $('salonChatBack').addEventListener('click', backFromChat);
    $('salonSendBtn').addEventListener('click', send);
    $('salonChatInput').addEventListener('keydown', function(e){
      if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(); }
    });
    $('salonMenuBtn').addEventListener('click', function(){
      const m = $('salonMenu'); m.style.display = m.style.display === 'block' ? 'none' : 'block';
    });
    $('salonBlockBtn').addEventListener('click', blockCurrent);
    $('salonReportBtn').addEventListener('click', reportCurrent);
  }
  wire();

  window.salonInit = init;
  window.salonStop = function(){
    stopLive(); me = null; member = null; available = false; members = []; messages = [];
    const o = $('salonOverlay'); if(o) o.classList.remove('is-open');
    document.body.style.overflow = '';
    const c = $('salonCard'); if(c) c.style.display = 'none';
  };
})();
