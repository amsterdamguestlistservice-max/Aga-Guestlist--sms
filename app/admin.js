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
  .adm-live{width:100%;display:flex;align-items:center;gap:12px;margin:6px 0 4px;padding:14px 16px;border-radius:16px;border:1px solid rgba(61,220,132,.35);background:rgba(61,220,132,.06);color:#fff;font:inherit;text-align:left;cursor:pointer}
  .adm-live__dot{flex:none;width:12px;height:12px;border-radius:50%;background:#3ddc84;box-shadow:0 0 0 0 rgba(61,220,132,.6);animation:admPulse 1.6s infinite}
  @keyframes admPulse{70%{box-shadow:0 0 0 10px rgba(61,220,132,0)}100%{box-shadow:0 0 0 0 rgba(61,220,132,0)}}
  .adm-live__tx{flex:1}.adm-live__tx b{display:block;font-size:16px}.adm-live__tx em{display:block;font-style:normal;font-size:12px;color:var(--muted);margin-top:2px}
  .adm-live__go{color:var(--muted);font-size:20px}
  .adm-live__list{padding:4px 4px 10px}
  .adm-live__p{display:flex;align-items:center;gap:8px;padding:6px 0;font-size:14px;border-bottom:1px solid rgba(255,255,255,.06)}
  .adm-live__p span{width:7px;height:7px;border-radius:50%;background:#3ddc84}.adm-live__p em{font-style:normal;color:var(--muted);font-size:12px;margin-left:auto}
  .adm-drop{padding:12px 14px;margin-bottom:8px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);font-size:13px;display:flex;flex-direction:column;gap:8px}
  .adm-drop.is-edit{border-color:var(--gold)}
  .adm-drop__top{display:flex;justify-content:space-between;gap:10px}.adm-drop__top span{color:var(--muted);font-size:12px}
  .adm-drop__what{font-size:14px;color:#fff}.adm-drop__auto{font-size:10px;padding:2px 6px;border-radius:999px;border:1px solid rgba(255,255,255,.2);color:var(--muted);margin-left:4px;vertical-align:middle}
  .adm-drop__who{font-size:12px;color:#7ee3a6}
  .adm-drop__nums{display:flex;gap:10px}.adm-drop__nums label{flex:1;display:flex;flex-direction:column;gap:4px;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}
  .adm-drop__nums input{padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:#0b0a08;color:#fff;font:15px var(--sans)}
  .adm-drop__body{width:100%;min-height:60px;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:#0b0a08;color:#fff;font:14px/1.4 var(--sans)}
  .adm-drop__act{display:flex;flex-wrap:wrap;gap:8px}
  .adm-dropchip{display:inline-block;margin-left:6px;padding:2px 7px;border-radius:999px;background:rgba(255,211,107,.18);color:#ffd36b;font-size:10px;font-weight:700;letter-spacing:.06em;vertical-align:middle}
  .adm-cc{padding:12px 14px;margin-bottom:8px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);font-size:13px;line-height:1.45}
  .adm-cc.is-q{border-color:var(--gold)}
  .adm-cc__top{display:flex;justify-content:space-between;gap:10px}.adm-cc__top span{color:var(--muted);font-size:12px}
  .adm-cc__sum{color:#fff;margin-top:2px}.adm-cc__picks{color:var(--muted);font-size:12px}.adm-cc__chosen{color:#7ee3a6;font-size:12px}
  .adm-cc__q{margin-top:8px;padding:10px 12px;border-radius:12px;background:rgba(212,175,55,.1);color:#f6ecd0;font-size:14px}
  .adm-cc__a{margin-top:8px;color:var(--muted);font-size:12px}
  .adm-cc__reply{display:flex;flex-direction:column;gap:8px;margin-top:8px}
  .adm-cc__tpl{display:flex;flex-wrap:wrap;gap:6px}
  .adm-cc__tpl button{padding:6px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:none;color:#fff;font:600 12px/1 var(--sans);cursor:pointer}
  .adm-cc__tpl button.on{background:var(--gold);color:#000;border-color:var(--gold)}
  .adm-btn--gold{background:var(--gold);color:#000;border-color:var(--gold)}
  .adm-cc__reply textarea{width:100%;min-height:104px;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.15);background:#0b0a08;color:#fff;font:14px/1.4 var(--sans);resize:vertical}
  .adm-cclive{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
  .adm-cclive__row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;border:1px solid rgba(61,220,132,.35);background:rgba(61,220,132,.06);font-size:13px}
  .adm-cclive__row i{width:8px;height:8px;border-radius:50%;background:#3ddc84;box-shadow:0 0 0 0 rgba(61,220,132,.6);animation:admPulse 1.6s infinite}
  @keyframes admPulse{70%{box-shadow:0 0 0 8px rgba(61,220,132,0)}100%{box-shadow:0 0 0 0 rgba(61,220,132,0)}}
  .adm-cclive__row b{flex:1}.adm-cclive__row em{font-style:normal;color:var(--muted);font-size:12px}
  .adm-ccchat{display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;margin-bottom:6px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#fff;font:inherit;font-size:13px;text-align:left;cursor:pointer}
  .adm-ccchat.is-wait{border-color:var(--gold)}
  .adm-ccchat span{flex:1;min-width:0}.adm-ccchat b{display:block}.adm-ccchat small{display:block;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .adm-ccchat em{font-style:normal;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;background:var(--gold);color:#000}
  .adm-chat{display:flex;flex-direction:column;min-height:100%}
  .adm-chat__head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
  .adm-chat__head b{display:block;font-size:17px}.adm-chat__head small{font-size:12px;color:var(--muted)}.adm-chat__head small.on{color:#3ddc84}
  .adm-chat__list{flex:1;display:flex;flex-direction:column;gap:8px;padding-bottom:12px}
  .adm-chat__m{max-width:82%;padding:9px 12px;border-radius:16px;font-size:14px;line-height:1.4}
  .adm-chat__m small{display:block;font-size:10px;opacity:.6;margin-top:3px}
  .adm-chat__m.g{align-self:flex-start;background:#1b1813;border:1px solid rgba(255,255,255,.1);border-bottom-left-radius:5px}
  .adm-chat__m.k{align-self:flex-end;background:var(--gold);color:#000;border-bottom-right-radius:5px}
  .adm-chat__empty{color:var(--muted);font-size:13px;text-align:center;padding:30px 0}
  .adm-chat__foot{position:sticky;bottom:0;background:var(--black);padding-top:8px;display:flex;flex-direction:column;gap:8px}
  .adm-chat__row{display:flex;gap:8px;align-items:flex-end}
  .adm-chat__row textarea{flex:1;min-height:46px;max-height:140px;padding:11px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.18);background:#0b0a08;color:#fff;font:15px/1.35 var(--sans);resize:none}
  .adm-acc-open{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-radius:14px;border:1px solid rgba(212,175,55,.35);background:rgba(212,175,55,.06);color:#fff;font:inherit;text-align:left;cursor:pointer}
  .adm-acc-open b{display:block;font-size:15px}.adm-acc-open em{display:block;font-style:normal;font-size:12px;color:var(--muted);margin-top:2px}
  .adm-acc-filters{display:flex;gap:6px;overflow-x:auto;margin:10px 0 12px;scrollbar-width:none}
  .adm-acc-filters button{flex:none;padding:7px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:none;color:#fff;font:600 12px/1 var(--sans);cursor:pointer}
  .adm-acc-filters button.on{background:var(--gold);color:#000;border-color:var(--gold)}
  .adm-acc{display:flex;gap:12px;align-items:center;padding:11px 4px;border-bottom:1px solid rgba(255,255,255,.07);cursor:pointer}
  .adm-acc__no{flex:none;width:46px;font:700 11px/1 var(--sans);color:var(--gold);letter-spacing:.04em}
  .adm-acc__tx{flex:1;min-width:0}.adm-acc__tx b{display:block;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .adm-acc__tx em{display:block;font-style:normal;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .adm-acc__r{flex:none;text-align:right;font-size:12px;color:var(--muted)}.adm-acc__r b{display:block;color:#fff;font-size:13px}
  .adm-layer{position:fixed;inset:0;z-index:9100;background:var(--black);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:calc(env(safe-area-inset-top,0px) + 14px) 16px calc(env(safe-area-inset-bottom,0px) + 40px);display:none}
  .adm-layer.is-open{display:block}
  #admDetail{z-index:9200}
  .adm-pill{display:inline-block;padding:6px 10px;font:700 10px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;border:1px solid var(--line);color:var(--muted)}
  .adm-of{display:grid;grid-template-columns:1fr 1fr;gap:10px}.adm-of__item{border:1px solid rgba(255,255,255,.1);border-radius:12px;overflow:hidden;padding-bottom:8px}.adm-of__img{display:block;aspect-ratio:3/4;background:#111 center/cover}.adm-of__who{font-size:12px;font-weight:700;padding:6px 8px 0}.adm-of__cap{font-size:11px;opacity:.7;padding:2px 8px}.adm-of__item .acts{padding:6px 8px 0}.adm-act__nums{display:flex;gap:10px;margin-bottom:10px}.adm-act__nums div{flex:1;text-align:center;padding:10px 4px;border:1px solid rgba(201,162,74,.3);border-radius:12px}.adm-act__nums b{display:block;font-size:22px;color:#f1dc9c}.adm-act__nums span{font-size:10px;letter-spacing:.1em;text-transform:uppercase;opacity:.6}.adm-act__bars{display:flex;align-items:flex-end;gap:3px;height:110px}.adm-act__bar{flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}.adm-act__bar i{display:block;width:100%;min-height:2px;border-radius:3px 3px 0 0;background:linear-gradient(#e9d18b,#8a6a24)}.adm-act__bar.is-we i{background:linear-gradient(#fff3cf,#c9a24a)}.adm-act__bar span{font-size:8px;opacity:.5;margin-top:3px}.adm-tier{font-size:10px;font-weight:800;letter-spacing:.08em;padding:2px 7px;border-radius:999px;border:1px solid #c7cbd1;color:#e4e7ea;vertical-align:middle}.adm-tier--gold{border-color:#e6c875;color:#f1dc9c}.adm-tier--vip{border-color:#d9a6f5;color:#e9c8fb}.adm-pill.approved{border-color:#3f8f5a;color:#7fd39a}.adm-pill.pending{border-color:var(--gold);color:var(--gold-light)}
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
  .adm-chg{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;margin-bottom:8px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(255,255,255,.03);cursor:pointer}
  .adm-chg__ic{font-size:18px;line-height:1.2}
  .adm-chg__tx{flex:1;min-width:0;font-size:13px;line-height:1.45}
  .adm-chg__tx b{display:block;font-size:14px}
  .adm-chg__tx em{display:block;font-style:normal;color:var(--muted);font-size:12px}
  .adm-chg.is-new{border-color:var(--gold)}
  .adm-edited{display:inline-block;margin-left:6px;padding:2px 7px;border-radius:999px;background:rgba(212,175,55,.15);color:var(--gold);font-size:10px;font-weight:700;letter-spacing:.06em;vertical-align:middle}
  .adm-verified{display:inline-block;margin-left:6px;padding:2px 7px;border-radius:999px;background:rgba(61,220,132,.16);color:#7ee3a6;font-size:10px;font-weight:700;letter-spacing:.06em;vertical-align:middle}
  .adm-hist{margin:14px 0;padding:12px 14px;border-radius:14px;background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.25);font-size:13px;line-height:1.5}
  .adm-hist div+div{margin-top:6px}
  .adm-hist small{color:var(--muted)}
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
    '<button type="button" class="adm-live" id="admLive"><span class="adm-live__dot"></span><span class="adm-live__tx"><b id="admLiveNow">…</b><em id="admLiveSub">people in the app right now</em></span><span class="adm-live__go">›</span></button><div class="adm-live__list" id="admLiveList" hidden></div>' +
    '<div class="adm-sec">Today</div><div class="adm-grid" id="admStats"></div>' +
    '<div class="adm-sec">Filter by party</div><div class="adm-filter" id="admFilter"></div>' +
    '<div class="adm-sec">Requests to review</div><div id="admReqs"></div>' +
    '<div class="adm-sec">Changed by guests</div><div id="admChanges"></div>' +
    '<div class="adm-sec">All time</div><div class="adm-grid" id="admTotals"></div>' +
    '<div class="adm-sec">New accounts · last 14 days</div><div class="adm-chart" id="admChart"></div>' +
    '<div class="adm-sec">Most guests</div><div id="admTop"></div>' +
    '<div class="adm-sec">The drop · Mon, Wed, Fri 16:00</div><div id="admDrops"></div>' +
    '<div class="adm-sec" id="admConciergeSec">Concierge</div><div id="admConcierge"></div>' +
    '<div class="adm-sec">Outfit check</div><div id="admOutfits"></div>' +
    '<div class="adm-sec">People in the app per day</div><div id="admActives"></div>' +
    '<div class="adm-sec">Party ratings</div><div id="admRatings"></div>' +
    '<div class="adm-sec">Accounts</div><button type="button" class="adm-acc-open" id="admAccOpen"><span><b id="admAccCount">All accounts</b><em>Search everyone, see points, requests and no-shows</em></span><span>→</span></button>' +
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
  const accLayer = document.createElement('div'); accLayer.id = 'admAccounts'; accLayer.className = 'adm-layer'; document.body.appendChild(accLayer);
  const chatLayer = document.createElement('div'); chatLayer.id = 'admChat'; chatLayer.className = 'adm-layer'; document.body.appendChild(chatLayer);
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
    loadOutfitsAdmin();
    const ac = s.actives || [];
    const acEl = document.getElementById('admActives');
    if(acEl){
      const max = Math.max(1, ...ac.map(function(d){ return d.total; }));
      const today = ac[ac.length - 1] || { total: 0, members: 0 };
      const week = ac.slice(-7).reduce(function(n, d){ return n + d.total; }, 0);
      acEl.innerHTML = ac.length ? '<div class="adm-act__nums"><div><b>' + today.total + '</b><span>today</span></div><div><b>' + today.members + '</b><span>logged in</span></div><div><b>' + Math.round(week / 7) + '</b><span>avg / day (7d)</span></div></div>' +
        '<div class="adm-act__bars">' + ac.map(function(d){
          const dt = new Date(d.day + 'T12:00:00'), wd = ['S','M','T','W','T','F','S'][dt.getDay()];
          return '<div class="adm-act__bar' + (dt.getDay() === 5 || dt.getDay() === 6 ? ' is-we' : '') + '" title="' + d.day + ': ' + d.total + '"><i style="height:' + Math.round(d.total / max * 100) + '%"></i><span>' + wd + '</span></div>';
        }).join('') + '</div><div class="adm-note" style="margin-top:6px">Counted from 23 Nov. Each person counts once per day.</div>' : '<div class="adm-empty">No data yet.</div>';
    }
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
  function setParty(n){ PARTY = n; renderFilter(); renderEvents(); renderReqs(); renderChanges(); }
  // ---------- the drop ----------
  let DROPS = [], DROP_EDIT = null;
  const DROP_KINDS = [
    ['points', '★ Bonus points', function(f){ return '+' + (f.points || 10) + ' bonus points'; }, function(f){ return 'For the first ' + f.max + ' who claim it. Points move you up to Silver, Gold and VIP.'; }],
    ['priority', '⚡ Priority', function(f){ return 'Priority for ' + (f.ev || 'the party'); }, function(f){ return 'First ' + f.max + ' jump the queue: your request for ' + (f.ev || 'the party') + ' gets reviewed first.'; }],
    ['plusone', '+1 Free plus-one', function(f){ return 'Free +1 for ' + (f.ev || 'the party'); }, function(f){ return 'First ' + f.max + ' can bring one extra friend on the guestlist for ' + (f.ev || 'the party') + '.'; }],
    ['custom', '🎁 Own perk', function(){ return ''; }, function(){ return ''; }]
  ];
  async function loadDropsAdmin(){
    const box = document.getElementById('admDrops'); if(!box) return;
    try{ DROPS = (await api('/api/ags?fn=drops-admin')).days || []; } catch(e){ box.innerHTML = '<div class="adm-err">' + esc(e.message) + '</div>'; return; }
    renderDropsAdmin();
  }
  function dropParties(){
    try{
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
      return EVENTS.filter(function(e){ return e.date >= today && e.guestlistStatus !== 'none'; }).sort(function(a, b){ return a.date < b.date ? -1 : 1; }).slice(0, 12);
    } catch(e){ return []; }
  }
  function renderDropsAdmin(){
    const box = document.getElementById('admDrops'); if(!box) return;
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    box.innerHTML = DROPS.map(function(x){
      const d = x.drop, label = (x.date === today ? 'Today · ' : '') + new Date(x.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
      if(DROP_EDIT && DROP_EDIT.date === x.date) return dropForm(x, label);
      const what = d ? esc(d.title) + (d.auto ? ' <span class="adm-drop__auto">auto</span>' : '') : '<span style="color:var(--muted)">Automatic drop</span>';
      return '<div class="adm-drop"><div class="adm-drop__top"><b>' + esc(label) + '</b>' + (d ? '<span>' + x.claims.length + ' / ' + d.max_claims + ' claimed</span>' : '') + '</div>' +
        '<div class="adm-drop__what">' + what + '</div>' +
        (x.claims.length ? '<div class="adm-drop__who">' + x.claims.map(function(c){ return esc(c.name); }).join(', ') + '</div>' : '') +
        (!x.claims.length ? '<button type="button" class="adm-btn" data-dropedit="' + x.date + '">' + (d && !d.auto ? 'Change drop' : 'Set your own drop') + '</button>' : '') +
        '</div>';
    }).join('');
  }
  function dropForm(x, label){
    const f = DROP_EDIT;
    const parties = dropParties();
    const k = DROP_KINDS.find(function(t){ return t[0] === f.kind; });
    return '<div class="adm-drop is-edit"><div class="adm-drop__top"><b>' + esc(label) + '</b></div>' +
      '<div class="adm-cc__tpl">' + DROP_KINDS.map(function(t){ return '<button type="button" data-dropkind="' + t[0] + '" class="' + (t[0] === f.kind ? 'on' : '') + '">' + esc(t[1]) + '</button>'; }).join('') + '</div>' +
      ((f.kind === 'priority' || f.kind === 'plusone') ? '<select id="admDropEv" class="adm-ig-search">' + parties.map(function(e){ const v = e.name + '|' + e.date; return '<option value="' + esc(v) + '"' + (f.evKey === v ? ' selected' : '') + '>' + esc(e.name + ' · ' + day(e.date)) + '</option>'; }).join('') + '</select>' : '') +
      '<div class="adm-drop__nums"><label>How many<input type="number" id="admDropMax" min="1" max="500" value="' + f.max + '"></label>' +
      (f.kind === 'points' ? '<label>Points<input type="number" id="admDropPts" min="1" max="100" value="' + (f.points || 10) + '"></label>' : '') + '</div>' +
      '<input type="text" id="admDropTitle" class="adm-ig-search" maxlength="80" placeholder="Title (what they get)" value="' + esc(f.title != null ? f.title : k[2](f)) + '">' +
      '<textarea id="admDropBody" class="adm-drop__body" maxlength="200" placeholder="One line of detail">' + esc(f.body != null ? f.body : k[3](f)) + '</textarea>' +
      '<div class="adm-drop__act"><button type="button" class="adm-btn adm-btn--gold" data-dropsave="' + x.date + '">Save drop</button>' +
      (x.drop && !x.drop.auto ? '<button type="button" class="adm-btn" data-dropreset="' + x.date + '">Back to automatic</button>' : '') +
      '<button type="button" class="adm-btn" data-dropcancel="1">Cancel</button></div></div>';
  }
  function readDropForm(){
    const f = DROP_EDIT; if(!f) return;
    const ev = document.getElementById('admDropEv'); if(ev){ f.evKey = ev.value; f.ev = ev.value.split('|')[0]; }
    const mx = document.getElementById('admDropMax'); if(mx) f.max = Number(mx.value) || f.max;
    const pt = document.getElementById('admDropPts'); if(pt) f.points = Number(pt.value) || f.points;
  }
  async function saveDrop(date, btn){
    readDropForm();
    const f = DROP_EDIT;
    const body = { date: date, kind: f.kind, title: document.getElementById('admDropTitle').value, body: document.getElementById('admDropBody').value, max_claims: f.max, points: f.points };
    if(f.evKey && (f.kind === 'priority' || f.kind === 'plusone')){ body.event_name = f.evKey.split('|')[0]; body.event_date = f.evKey.split('|')[1]; }
    btn.disabled = true; btn.textContent = 'Saving…';
    try{ await api('/api/ags?fn=drops-admin', { method: 'POST', body: body }); DROP_EDIT = null; await loadDropsAdmin(); }
    catch(e){ btn.disabled = false; btn.textContent = 'Save drop'; showErr(e.message); }
  }

  // ---------- concierge ----------
  let CC = [], CC_SHOW = 8;
  // One-tap answers. The best one is filled in already, so most of the time
  // you only tap "Send answer". Everything stays editable.
  const CC_TPL = [
    ['table', 'Table', 'Hi {n}! Love it. For a table at {e}, send us your group size and budget on WhatsApp (+31 6 44948562) and we\u2019ll sort it out for you.'],
    ['bday', 'Birthday', 'Hi {n}, happy early birthday! 🎂 Request access for {e} with your whole group in the app and let us know it\u2019s your birthday. We\u2019ll take care of you.'],
    ['group', 'Big group', 'Hi {n}! Groups are welcome. Request access for {e} with everyone\u2019s names in the app and we\u2019ll review it personally.'],
    ['dress', 'Dress code', 'Hi {n}! Dress to impress: smart and stylish, no sportswear or caps. When in doubt, go black.'],
    ['age', 'Age', 'Hi {n}! The minimum age is on every party page in the app. Bring a valid photo ID, the door checks everyone.'],
    ['yes', 'You\u2019re in', 'Hi {n}! Yes, that works. Request access for {e} in the app and we\u2019ll make sure you\u2019re on the list.'],
    ['full', 'Full', 'Hi {n}, sorry, the guestlist for {e} is full. Discounted tickets are still available in the app.'],
    ['thanks', 'Thanks', 'Hi {n}! Thanks for your message. We\u2019ll get back to you shortly.']
  ];
  function ccGuess(q){
    q = String(q || '').toLowerCase();
    if(/table|tafel|bottle|vip/.test(q)) return 'table';
    if(/birthday|bday|verjaardag|jarig/.test(q)) return 'bday';
    if(/dress|outfit|wear|kleding|sneaker/.test(q)) return 'dress';
    if(/age|old|leeftijd|18|21|\bid\b/.test(q)) return 'age';
    if(/group|friends|girls|guys|people|groep|\b[4-9]\b|\b1[0-9]\b/.test(q)) return 'group';
    return 'yes';
  }
  function ccFill(c, key){
    const t = CC_TPL.find(function(x){ return x[0] === key; }) || CC_TPL[0];
    const first = String(c.name || '').split(' ')[0] || 'there';
    const ev = (String(c.message || '').match(/behind closed doors|bcd|house of zenda|zenda|roza|amajoyo|huisfissa|club fair|nema|nye|new year/i) || [])[0] ||
      ((c.picks && c.picks[0]) ? String(c.picks[0]).replace(/\s*\(.*\)$/, '') : 'the party');
    const evName = /^bcd$/i.test(ev) ? 'Behind Closed Doors' : /^zenda$/i.test(ev) ? 'House of Zenda' : /^(nye|new year)$/i.test(ev) ? 'New Year\u2019s Eve' : ev.replace(/\b\w/g, function(m){ return m.toUpperCase(); });
    return t[2].replace('{n}', first).replace(/\{e\}/g, evName);
  }
  let CC_LIVE = [], CC_CHATS = [];
  async function loadConciergeAdmin(){
    const box = document.getElementById('admConcierge'); if(!box) return;
    try{ const d = await api('/api/ags?fn=concierge-admin'); CC = d.sessions || []; CC_LIVE = d.live || []; CC_CHATS = d.chats || []; } catch(e){ box.innerHTML = '<div class="adm-err">' + esc(e.message) + '</div>'; return; }
    renderConcierge();
  }
  function renderConcierge(){
    const box = document.getElementById('admConcierge'); if(!box) return;
    const liveHtml = CC_LIVE.length ? '<div class="adm-cclive">' + CC_LIVE.map(function(l){ return '<div class="adm-cclive__row"><i></i><b>' + esc(l.name || 'Guest') + '</b><em>in the concierge now</em><button type="button" class="adm-btn adm-btn--gold" data-ccchat="' + esc(l.user_id) + '">Take over</button></div>'; }).join('') + '</div>' : '';
    const chatsHtml = CC_CHATS.length ? CC_CHATS.slice(0, 8).map(function(c){ return '<button type="button" class="adm-ccchat' + (c.last_sender === 'guest' ? ' is-wait' : '') + '" data-ccchat="' + esc(c.user_id) + '"><span><b>' + (c.live ? '🟢 ' : '') + esc(c.name || 'Guest') + '</b><small>' + (c.last_sender === 'keurten' ? 'You: ' : '') + esc(c.last) + '</small></span>' + (c.last_sender === 'guest' ? '<em>' + c.waiting + ' new</em>' : '') + '</button>'; }).join('') : '';
    if(!CC.length && !liveHtml && !chatsHtml){ box.innerHTML = '<div class="adm-empty">Nobody used the concierge yet.</div>'; return; }
    box.dataset.top = liveHtml + chatsHtml;
    const ago = function(iso){ const m = Math.round((Date.now() - Date.parse(iso)) / 6e4); return m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + 'h ago' : new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); };
    const open = CC.filter(function(c){ return c.message && !c.reply; }).length;
    box.innerHTML = (box.dataset.top || '') + (open ? '<div class="adm-note" style="color:var(--gold)">' + open + ' question' + (open > 1 ? 's' : '') + ' waiting for your answer</div>' : '') +
      CC.slice(0, CC_SHOW).map(function(c){
        return '<div class="adm-cc' + (c.message && !c.reply ? ' is-q' : '') + '"><div class="adm-cc__top"><b>' + esc(c.name || 'Guest') + '</b><span>' + esc(ago(c.created_at)) + '</span></div>' +
          '<div class="adm-cc__sum">' + esc(c.summary) + '</div>' +
          (c.picks && c.picks.length ? '<div class="adm-cc__picks">Shown: ' + esc(c.picks.join(', ')) + '</div>' : '<div class="adm-cc__picks">Nothing matched</div>') +
          (c.chosen ? '<div class="adm-cc__chosen">✓ Tapped request: ' + esc(c.chosen) + '</div>' : '') +
          '<button type="button" class="adm-btn" style="margin-top:8px" data-ccchat="' + esc(c.user_id) + '">💬 Chat with ' + esc(String(c.name || 'guest').split(' ')[0]) + '</button>' +
          (c.message ? '<div class="adm-cc__q">“' + esc(c.message) + '”</div>' : '') +
          (c.reply ? '<div class="adm-cc__a">You: ' + esc(c.reply) + '</div>'
            : c.message ? (function(){
                const g = ccGuess(c.message);
                return '<div class="adm-cc__reply" data-ccid="' + c.id + '" id="admCc' + c.id + '">' +
                  '<div class="adm-cc__tpl">' + CC_TPL.map(function(t){ return '<button type="button" data-cctpl="' + t[0] + '" data-ccfor="' + c.id + '" class="' + (t[0] === g ? 'on' : '') + '">' + esc(t[1]) + '</button>'; }).join('') + '</div>' +
                  '<textarea maxlength="600">' + esc(ccFill(c, g)) + '</textarea>' +
                  '<button type="button" class="adm-btn adm-btn--gold" data-ccsend="' + c.id + '">Send answer</button>' +
                  ((c.phone || c.ig) ? '<div class="adm-contact">' + (c.phone ? '<a href="https://wa.me/' + waNumber(c.phone) + '?text=' + encodeURIComponent(ccFill(c, g)) + '" target="_blank" rel="noopener">WhatsApp</a>' : '') + (c.ig ? '<a href="https://ig.me/m/' + encodeURIComponent(c.ig) + '" target="_blank" rel="noopener">DM</a>' : '') + '</div>' : '') +
                  '</div>';
              })() : '') +
          '</div>';
      }).join('') + (CC.length > CC_SHOW ? '<button type="button" class="adm-btn" id="admCcMore" style="width:100%">Show more (' + (CC.length - CC_SHOW) + ')</button>' : '');
  }
  async function sendConciergeReply(btn){
    const id = btn.getAttribute('data-ccsend');
    const ta = btn.parentNode.querySelector('textarea'); const reply = (ta.value || '').trim();
    if(!reply) return;
    btn.disabled = true; btn.textContent = 'Sending…';
    try{
      await api('/api/ags?fn=concierge-admin', { method: 'POST', body: { id: Number(id), reply: reply } });
      const c = CC.find(function(x){ return String(x.id) === String(id); }); if(c){ c.reply = reply; }
      renderConcierge();
    } catch(e){ btn.disabled = false; btn.textContent = 'Send answer'; showErr(e.message); }
  }
  // ---------- live concierge chat: take over at any moment ----------
  let CHAT = null, CHAT_T = null;
  async function openChat(uid){
    CHAT = { uid: uid, name: '', messages: [], here: false, online: false };
    chatLayer.classList.add('is-open');
    chatLayer.innerHTML = '<div class="adm-empty">Loading chat…</div>';
    await loadChat(true);
    clearInterval(CHAT_T); CHAT_T = setInterval(function(){ if(chatLayer.classList.contains('is-open') && !document.hidden) loadChat(false); }, 4000);
  }
  function closeChat(){ clearInterval(CHAT_T); CHAT = null; chatLayer.classList.remove('is-open'); loadConciergeAdmin(); }
  async function loadChat(first){
    if(!CHAT) return;
    let d; try{ d = await api('/api/ags?fn=concierge-admin&chat=' + encodeURIComponent(CHAT.uid)); } catch(e){ if(first) chatLayer.innerHTML = '<div class="adm-err">' + esc(e.message) + '</div>'; return; }
    const changed = first || d.messages.length !== CHAT.messages.length || d.here !== CHAT.here || d.online !== CHAT.online;
    CHAT.name = d.name; CHAT.messages = d.messages || []; CHAT.here = d.here; CHAT.online = d.online;
    if(changed) renderChat(first);
  }
  function chatCtx(){
    const s = CC.find(function(x){ return x.user_id === CHAT.uid; }) || {};
    const all = CHAT.messages.filter(function(m){ return m.sender === 'guest'; }).map(function(m){ return m.body; }).join(' ') + ' ' + (s.message || '');
    return { name: CHAT.name, message: all, picks: s.picks || [] };
  }
  function renderChat(first){
    const ta = document.getElementById('admChatTa'), draft = ta ? ta.value : null, focus = ta && document.activeElement === ta;
    const t = function(iso){ return new Date(iso).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', timeZone: 'Europe/Amsterdam' }); };
    const st = CHAT.here ? '<small class="on">● In the concierge now, sees your message live</small>' : CHAT.online ? '<small class="on">● In the app now</small>' : '<small>Not in the app · gets a notification</small>';
    const g = ccGuess(chatCtx().message);
    chatLayer.innerHTML = '<div class="adm-chat"><div class="adm-chat__head"><button type="button" class="adm-btn" data-chatclose>← Back</button><span><b>' + esc(CHAT.name || 'Guest') + '</b>' + st + '</span></div>' +
      '<div class="adm-chat__list">' + (CHAT.messages.length ? CHAT.messages.map(function(m){ return '<div class="adm-chat__m ' + (m.sender === 'guest' ? 'g' : 'k') + '">' + esc(m.body).replace(/\n/g, '<br>') + '<small>' + (m.sender === 'keurten' ? 'You · ' : '') + t(m.created_at) + (m.sender === 'keurten' && m.read_at ? ' · seen' : '') + '</small></div>'; }).join('') : '<div class="adm-chat__empty">No messages yet. Write the first one: it appears in their concierge as “Keurten joined the chat”.</div>') + '</div>' +
      '<div class="adm-chat__foot"><div class="adm-cc__tpl">' + CC_TPL.map(function(x){ return '<button type="button" data-chattpl="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="adm-chat__row"><textarea id="admChatTa" maxlength="600" placeholder="Message ' + esc(String(CHAT.name || '').split(' ')[0] || 'guest') + '…"></textarea><button type="button" class="adm-btn adm-btn--gold" data-chatsend>Send</button></div></div></div>';
    const nta = document.getElementById('admChatTa');
    if(draft !== null) nta.value = draft; else if(first && CHAT.messages.length && CHAT.messages[CHAT.messages.length - 1].sender === 'guest') nta.value = ccFill(chatCtx(), g);
    if(focus) nta.focus();
    chatLayer.scrollTop = chatLayer.scrollHeight;
  }
  async function sendChat(btn){
    const ta = document.getElementById('admChatTa'); const body = (ta.value || '').trim();
    if(!body || !CHAT) return;
    btn.disabled = true; btn.textContent = 'Sending…';
    try{
      await api('/api/ags?fn=concierge-admin', { method: 'POST', body: { user_id: CHAT.uid, body: body } });
      ta.value = '';
      CHAT.messages.push({ sender: 'keurten', body: body, created_at: new Date().toISOString() });
      renderChat(false); document.getElementById('admChatTa').value = '';
    } catch(e){ showErr(e.message); }
    const b = chatLayer.querySelector('[data-chatsend]'); if(b){ b.disabled = false; b.textContent = 'Send'; }
  }
  chatLayer.addEventListener('click', function(e){
    if(e.target.closest('[data-chatclose]')) return closeChat();
    const sb = e.target.closest('[data-chatsend]'); if(sb){ if(!sb.disabled) sendChat(sb); return; }
    const tp = e.target.closest('[data-chattpl]');
    if(tp){ const ta = document.getElementById('admChatTa'); ta.value = ccFill(chatCtx(), tp.getAttribute('data-chattpl')); ta.focus(); }
  });
  window.agsOpenChat = openChat;
  async function loadOutfitsAdmin(){
    const box = document.getElementById('admOutfits');
    if(!box) return;
    let d; try{ d = await api('/api/ags?fn=outfit-admin'); } catch(e){ box.innerHTML = '<div class="adm-empty">Could not load outfits.</div>'; return; }
    const pend = (d && d.pending) || [], top = (d && d.top) || [];
    box.innerHTML =
      (pend.length ? '<div class="adm-note" style="margin-bottom:8px">' + pend.length + ' waiting for approval</div><div class="adm-of">' + pend.map(function(o){
        return '<div class="adm-of__item" data-id="' + esc(o.id) + '"><a href="' + esc(o.image_url) + '" target="_blank" rel="noopener" class="adm-of__img" style="background-image:url(\'' + esc(o.image_url) + '\')"></a>' +
          '<div class="adm-of__who">' + esc(o.name) + (o.instagram ? ' · @' + esc(o.instagram) : '') + '</div>' + (o.caption ? '<div class="adm-of__cap">' + esc(o.caption) + '</div>' : '') +
          '<div class="acts"><button type="button" data-of="rejected">Reject</button><button type="button" class="ok" data-of="approved">Approve</button></div></div>';
      }).join('') + '</div>' : '<div class="adm-empty">No outfits waiting.</div>') +
      (top.length ? '<div class="adm-note" style="margin:12px 0 6px">Top this week 👑</div>' + top.slice(0, 5).map(function(o, i){
        return '<div class="adm-top">' + (i === 0 ? '👑 ' : (i + 1) + '. ') + esc(o.name) + (o.instagram ? ' · @' + esc(o.instagram) : '') + ' <a href="' + esc(o.image_url) + '" target="_blank" rel="noopener">photo</a><span>🔥 ' + o.fires + '</span></div>';
      }).join('') : '');
    box.querySelectorAll('[data-of]').forEach(function(btn){
      btn.addEventListener('click', async function(){
        const item = btn.closest('.adm-of__item'); item.querySelectorAll('button').forEach(function(x){ x.disabled = true; });
        try{ await api('/api/ags?fn=outfit-admin', { method: 'POST', body: { id: item.dataset.id, status: btn.dataset.of } }); item.remove(); }
        catch(e){ item.querySelectorAll('button').forEach(function(x){ x.disabled = false; }); }
      });
    });
  }
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
    // Soonest first, so every party of this week is at the top (not 8 weeks of the same party).
    const evs = upcomingEvs.filter(function(e){ return !PARTY || baseName(e.name) === PARTY; }).slice().sort(function(a, b){
      const d1 = String(a.date), d2 = String(b.date);
      return d1 !== d2 ? (d1 < d2 ? -1 : 1) : byName(a, b);
    });
    document.getElementById('admEvents').innerHTML = evs.length ? evs.map(function(e){
      const pct = e.capacity ? Math.min(100, Math.round(e.claimed / e.capacity * 100)) : 0;
      return '<div class="adm-ev" data-name="' + esc(e.name) + '" data-date="' + esc(e.date) + '"><div class="adm-ev__top"><span>' + esc(e.name) + '</span><i>' + esc(day(e.date)) + '</i></div>' +
        '<div class="adm-bar"><div style="width:' + pct + '%"></div></div>' +
        '<div class="adm-ev__meta">' + e.claimed + ' / ' + e.capacity + ' people on the list · ' + e.approved + ' approved (' + e.guests + ' guests) · ' + e.pending + ' pending' + (e.enabled ? '' : ' · closed') + (e.views ? ' · 👁 ' + e.views + ' viewed' : '') + '</div><div class="adm-ev__more">' + (String(e.date) <= todayAms() ? 'Open guestlist · mark no-shows ›' : 'Open guestlist ›') + '</div></div>';
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
    CHANGES = r.changes || [];
    try{ CHG_SEEN = Number(localStorage.getItem('ags_adm_changes_seen')) || 0; localStorage.setItem('ags_adm_changes_seen', String(Date.now())); } catch(e){}
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    PENDING = (r.requests || []).filter(function(x){ return String(x.status || 'pending').trim().toLowerCase() === 'pending' && String(x.event_date) >= today; });
    renderFilter();
    renderReqs();
    renderChanges();
    renderEvents();
    renderIg();
  }
  let CHANGES = [], CHG_SEEN = 0;
  function ago(iso){
    const m = Math.round((Date.now() - Date.parse(iso)) / 6e4);
    if(m < 1) return 'just now'; if(m < 60) return m + ' min ago';
    const h = Math.round(m / 60); if(h < 24) return h + 'h ago';
    return new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
  // Edits and cancellations guests made themselves, for parties that are still coming up.
  function renderChanges(){
    const box = document.getElementById('admChanges'); if(!box) return;
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const byId = {}; REQS.forEach(function(r){ byId[r.id] = r; });
    const seen = CHG_SEEN;
    const list = CHANGES.filter(function(c){ const r = byId[c.request_id]; return r && String(r.event_date) >= today && (!PARTY || r.event_name === PARTY); }).slice(0, 20);
    if(!list.length){ box.innerHTML = '<div class="adm-empty">No changes by guests for upcoming parties.</div>'; return; }
    box.innerHTML = list.map(function(c){
      const r = byId[c.request_id];
      const isNew = Date.parse(c.created_at) > seen;
      return '<div class="adm-chg' + (isNew ? ' is-new' : '') + '" data-rid="' + esc(c.request_id) + '"><span class="adm-chg__ic">' + (c.kind === 'cancelled' ? '❌' : '✏️') + '</span>' +
        '<div class="adm-chg__tx"><b>' + esc(((r.first_name || '') + ' ' + (r.last_name || '')).trim() || 'Guest') + '</b>' +
        esc(c.summary || (c.kind === 'cancelled' ? 'Cancelled' : 'Edited')) +
        '<em>' + esc(r.event_name) + ' · ' + esc(day(r.event_date)) + ' · ' + esc(ago(c.created_at)) + '</em></div></div>';
    }).join('');
  }
  function renderReqs(){
    // Silver+ members are reviewed first (a Silver perk), then by name.
    // Verified guest = was on a list before (approved, party already happened).
    const today0 = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    const verified = new Set(REQS.filter(function(x){ return st(x) === 'approved' && String(x.event_date) < today0 && x.user_id; }).map(function(x){ return x.user_id; }));
    const pending = PENDING.filter(function(x){ return !PARTY || x.event_name === PARTY; }).slice().sort(function(a, b){
      return ((b.drop ? 1 : 0) - (a.drop ? 1 : 0)) || ((b.points >= 50 ? 1 : 0) - (a.points >= 50 ? 1 : 0)) || ((verified.has(b.user_id) ? 1 : 0) - (verified.has(a.user_id) ? 1 : 0)) || byName(a, b);
    });
    const box = document.getElementById('admReqs');
    if(!pending.length){ box.innerHTML = '<div class="adm-empty">' + (PARTY ? 'No requests waiting for ' + esc(PARTY) + '.' : 'All caught up. No requests waiting.') + '</div>'; return; }
    box.innerHTML = pending.map(function(x){
      const ig = String(x.instagram || '').replace(/^@/, '');
      const extra = Array.isArray(x.additional_guests) && x.additional_guests.length
        ? '<br>+ ' + x.additional_guests.map(function(g){ return esc(((g.firstName || g.first_name || g.name || '') + ' ' + (g.lastName || g.last_name || '')).trim()); }).join(', ') : '';
      const tier = x.points >= 300 ? 'VIP' : x.points >= 150 ? 'Gold' : x.points >= 50 ? 'Silver' : '';
      return '<div class="adm-req" data-id="' + esc(x.id) + '"><h4>' + esc((x.first_name || '') + ' ' + (x.last_name || '')) +
        (tier ? ' <span class="adm-tier adm-tier--' + tier.toLowerCase() + '">★ ' + tier + '</span>' : '') +
        (verified.has(x.user_id) ? '<span class="adm-verified">✓ VERIFIED</span>' : '') +
        (x.drop === 'priority' ? '<span class="adm-dropchip">⚡ DROP</span>' : x.drop === 'plusone' ? '<span class="adm-dropchip">+1 DROP</span>' : '') +
        (x.changes && x.changes.length ? '<span class="adm-edited">✏️ EDITED</span>' : '') + '</h4>' +
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
    if(x.changes && x.changes.length){
      html += '<div class="adm-hist"><b>Changed by the guest</b>' + x.changes.map(function(c){
        return '<div>' + (c.kind === 'cancelled' ? '❌ ' : '✏️ ') + esc(c.summary || c.kind) + ' <small>· ' + esc(ago(c.created_at)) + '</small></div>';
      }).join('') + '</div>';
    }
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

  // ---------- all accounts ----------
  let ACC = null, ACC_Q = '', ACC_F = 'all', ACC_SHOW = 60;
  const tierOf = function(p){ return p >= 300 ? 'VIP' : p >= 150 ? 'Gold' : p >= 50 ? 'Silver' : ''; };
  async function openAccounts(){
    accLayer.classList.add('is-open'); accLayer.scrollTop = 0;
    if(!ACC){
      accLayer.innerHTML = '<div class="adm-head"><div class="adm-title"><small>Admin</small>Accounts</div><button type="button" class="adm-btn" data-close="admAccounts">Back</button></div><div class="adm-empty">Loading…</div>';
      try{ ACC = (await api('/api/ags?fn=admin-members')).members || []; }
      catch(e){ accLayer.innerHTML = '<div class="adm-head"><div class="adm-title"><small>Admin</small>Accounts</div><button type="button" class="adm-btn" data-close="admAccounts">Back</button></div><div class="adm-err">' + esc(e.message) + '</div>'; return; }
      const c = document.getElementById('admAccCount'); if(c) c.textContent = 'All accounts (' + ACC.length + ')';
    }
    renderAccounts(true);
  }
  function accFilter(m){
    if(ACC_F === 'verified') return m.verified;
    if(ACC_F === 'silver') return m.points >= 50;
    if(ACC_F === 'noshow') return m.noShows > 0;
    if(ACC_F === 'never') return !m.requests;
    if(ACC_F === 'nopush') return !m.push;
    return true;
  }
  function renderAccounts(full){
    const q = ACC_Q.trim().toLowerCase().replace(/^@/, '');
    const list = ACC.filter(accFilter).filter(function(m){
      if(!q) return true;
      return (m.name + ' ' + m.email + ' ' + m.ig + ' ' + (m.phone || '') + ' ' + (m.no || '')).toLowerCase().indexOf(q) >= 0;
    });
    const n = function(f){ const k = ACC_F; ACC_F = f; const c = ACC.filter(accFilter).length; ACC_F = k; return c; };
    const chip = function(f, l){ return '<button type="button" data-accf="' + f + '" class="' + (ACC_F === f ? 'on' : '') + '">' + l + ' ' + n(f) + '</button>'; };
    const rows = list.slice(0, ACC_SHOW).map(function(m){
      const t = tierOf(m.points);
      return '<div class="adm-acc" data-acc="' + esc(m.id) + '"><span class="adm-acc__no">' + (m.no ? 'Nº ' + String(m.no).padStart(4, '0') : '') + '</span>' +
        '<span class="adm-acc__tx"><b>' + esc(m.name || m.email) + (m.verified ? ' <span class="adm-verified">✓</span>' : '') + (t ? ' <span class="adm-tier adm-tier--' + t.toLowerCase() + '">★ ' + t + '</span>' : '') + '</b>' +
        '<em>' + esc(m.email) + (m.ig ? ' · @' + esc(m.ig) : '') + '</em></span>' +
        '<span class="adm-acc__r"><b>' + m.points + ' pts</b>' + m.requests + ' req' + (m.noShows ? ' · ' + m.noShows + ' NS' : '') + '</span></div>';
    }).join('');
    const listHtml = (rows || '<div class="adm-empty">No accounts found.</div>') +
      (list.length > ACC_SHOW ? '<button type="button" class="adm-btn" id="admAccMore" style="width:100%;margin-top:12px">Show more (' + (list.length - ACC_SHOW) + ')</button>' : '');
    if(full){
      accLayer.innerHTML = '<div class="adm-head"><div class="adm-title"><small>Admin</small>Accounts · ' + ACC.length + '</div><button type="button" class="adm-btn" data-close="admAccounts">Back</button></div>' +
        '<input type="search" id="admAccSearch" class="adm-ig-search" placeholder="Search name, email, @handle, phone or Nº" autocomplete="off" value="' + esc(ACC_Q) + '">' +
        '<div class="adm-acc-filters" id="admAccFilters"></div><div id="admAccList"></div>';
    }
    document.getElementById('admAccFilters').innerHTML = chip('all', 'All') + chip('verified', '✓ Verified') + chip('silver', '★ Silver+') + chip('noshow', 'No-shows') + chip('never', 'No requests') + chip('nopush', 'No notifications');
    document.getElementById('admAccList').innerHTML = '<div class="adm-note" style="margin:0 0 6px">' + list.length + ' shown</div>' + listHtml;
  }
  function openAccount(id){
    const m = (ACC || []).find(function(x){ return x.id === id; }); if(!m) return;
    const reqs = REQS.filter(function(r){ return r.user_id === id; }).sort(function(a, b){ return String(b.event_date).localeCompare(String(a.event_date)); });
    const t = tierOf(m.points);
    const d = function(iso){ return iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''; };
    let html = '<div class="adm-head"><div class="adm-title"><small>' + (m.no ? 'AGS Nº ' + String(m.no).padStart(4, '0') : 'Account') + '</small>' + esc(m.name || m.email) + '</div><button type="button" class="adm-btn" data-close="admDetail">Back</button></div>' +
      (m.verified ? '<span class="adm-verified">✓ VERIFIED GUEST</span> ' : '') + (t ? '<span class="adm-tier adm-tier--' + t.toLowerCase() + '">★ ' + t + '</span>' : '') +
      dl([
        ['Email', '<a href="mailto:' + esc(m.email) + '">' + esc(m.email) + '</a>'],
        ['Instagram', m.ig ? '<a href="https://instagram.com/' + encodeURIComponent(m.ig) + '" target="_blank" rel="noopener">@' + esc(m.ig) + '</a>' : ''],
        ['Phone', m.phone ? '<a href="tel:' + esc(m.phone) + '">' + esc(m.phone) + '</a>' : ''],
        ['Points', String(m.points)],
        ['Requests', m.requests + ' · ' + m.approved + ' approved' + (m.noShows ? ' · ' + m.noShows + ' no-show' + (m.noShows > 1 ? 's' : '') : '')],
        ['Notifications', m.push ? 'On' : 'Off'],
        ['Joined', esc(d(m.joined)) + (m.referred ? ' · via a friend' : '')],
        ['Last login', esc(d(m.lastSeen))]
      ]);
    const c = [];
    if(m.phone) c.push('<a href="https://wa.me/' + waNumber(m.phone) + '" target="_blank" rel="noopener">WhatsApp</a>');
    if(m.ig) c.push('<a href="https://ig.me/m/' + encodeURIComponent(m.ig) + '" target="_blank" rel="noopener">DM</a>');
    if(c.length) html += '<div class="adm-contact">' + c.join('') + '</div>';
    html += '<div class="adm-sec">Requests (' + reqs.length + ')</div>' + (reqs.length ? reqs.map(function(r){
      return '<div class="adm-req" data-id="' + esc(r.id) + '"><h4>' + esc(r.event_name) + '</h4><div class="ev">' + esc(day(r.event_date)) + ' · ' + (r.total_guests || 1) + ' guest' + ((r.total_guests || 1) > 1 ? 's' : '') + '</div><span class="adm-pill ' + esc(st(r)) + '">' + esc(r.status || 'Pending') + '</span></div>';
    }).join('') : '<div class="adm-empty">No requests yet.</div>');
    detailLayer.innerHTML = html; detailLayer.classList.add('is-open'); detailLayer.scrollTop = 0;
  }
  accLayer.addEventListener('input', function(e){ if(e.target && e.target.id === 'admAccSearch'){ ACC_Q = e.target.value; ACC_SHOW = 60; renderAccounts(false); } });
  accLayer.addEventListener('click', function(e){
    const c = e.target.closest('[data-close]'); if(c){ accLayer.classList.remove('is-open'); return; }
    const f = e.target.closest('[data-accf]'); if(f){ ACC_F = f.getAttribute('data-accf'); ACC_SHOW = 60; renderAccounts(false); return; }
    if(e.target.closest('#admAccMore')){ ACC_SHOW += 60; renderAccounts(false); return; }
    const row = e.target.closest('[data-acc]'); if(row) openAccount(row.getAttribute('data-acc'));
  });

  async function refresh(){
    showErr('');
    loadConciergeAdmin();
    loadDropsAdmin();
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

  let LIVE_T = null;
  async function loadLive(){
    try{
      const l = await api('/api/ags?fn=admin-live');
      document.getElementById('admLiveNow').textContent = l.now + (l.now === 1 ? ' person' : ' people') + ' in the app now';
      document.getElementById('admLiveSub').textContent = l.nowMembers + ' logged in · ' + l.lastHour + ' in the last hour · ' + l.today + ' today';
      const sc = Object.keys(l.screens || {}).sort(function(a, b){ return l.screens[b] - l.screens[a]; }).map(function(k){ return esc(k) + ' ' + l.screens[k]; }).join(' · ');
      document.getElementById('admLiveList').innerHTML = (sc ? '<div class="adm-note">Looking at: ' + sc + '</div>' : '') +
        (l.people.length ? l.people.map(function(p){ return '<div class="adm-live__p"><span></span>' + esc(p.name) + (p.screen ? ' <em>' + esc(p.screen) + '</em>' : '') + '</div>'; }).join('') : '<div class="adm-empty">Nobody logged in right now.</div>');
    } catch(e){ document.getElementById('admLiveSub').textContent = 'Could not load'; }
  }
  function open(){ PARTY = ''; sheet.classList.add('is-open'); document.body.style.overflow = 'hidden'; refresh(); loadLive(); clearInterval(LIVE_T); LIVE_T = setInterval(function(){ if(sheet.classList.contains('is-open') && !document.hidden){ loadLive(); loadConciergeAdmin(); } }, 20000); }
  function close(){ clearInterval(LIVE_T); clearInterval(CHAT_T); chatLayer.classList.remove('is-open'); sheet.classList.remove('is-open'); listLayer.classList.remove('is-open'); detailLayer.classList.remove('is-open'); listCtx = null; document.body.style.overflow = ''; }

  document.getElementById('admClose').addEventListener('click', close);
  document.getElementById('admRefresh').addEventListener('click', refresh);
  document.getElementById('admPushSend').addEventListener('click', sendPush);
  document.getElementById('admNewBtn').addEventListener('click', announceNew);
  sheet.addEventListener('input', function(e){ if(e.target && e.target.id === 'admIgSearch'){ IG_Q = e.target.value; IG_SHOW = 40; renderIg(); } });
  sheet.addEventListener('change', function(e){
    if(!DROP_EDIT || !e.target) return;
    if(e.target.id === 'admDropEv' || e.target.id === 'admDropMax' || e.target.id === 'admDropPts'){
      readDropForm();
      const k = DROP_KINDS.find(function(t){ return t[0] === DROP_EDIT.kind; });
      if(DROP_EDIT.kind !== 'custom'){ document.getElementById('admDropTitle').value = k[2](DROP_EDIT); document.getElementById('admDropBody').value = k[3](DROP_EDIT); }
    }
  });
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
    if(e.target.closest('#admAccOpen')){ openAccounts(); return; }
    if(e.target.closest('#admLive')){ const l = document.getElementById('admLiveList'); l.hidden = !l.hidden; return; }
    const de = e.target.closest('[data-dropedit]');
    if(de){ const p = dropParties()[0]; DROP_EDIT = { date: de.getAttribute('data-dropedit'), kind: 'priority', max: 10, points: 10, evKey: p ? p.name + '|' + p.date : '', ev: p ? p.name : '' }; renderDropsAdmin(); return; }
    const dk = e.target.closest('[data-dropkind]');
    if(dk){ readDropForm(); DROP_EDIT.kind = dk.getAttribute('data-dropkind'); DROP_EDIT.title = null; DROP_EDIT.body = null; if(DROP_EDIT.kind === 'points') DROP_EDIT.max = 20; renderDropsAdmin(); return; }
    const ds = e.target.closest('[data-dropsave]'); if(ds){ if(!ds.disabled) saveDrop(ds.getAttribute('data-dropsave'), ds); return; }
    const dr = e.target.closest('[data-dropreset]');
    if(dr){ api('/api/ags?fn=drops-admin', { method: 'POST', body: { date: dr.getAttribute('data-dropreset'), reset: true } }).then(function(){ DROP_EDIT = null; loadDropsAdmin(); }).catch(function(err){ showErr(err.message); }); return; }
    if(e.target.closest('[data-dropcancel]')){ DROP_EDIT = null; renderDropsAdmin(); return; }
    const cch = e.target.closest('[data-ccchat]'); if(cch){ openChat(cch.getAttribute('data-ccchat')); return; }
    const ccs = e.target.closest('[data-ccsend]'); if(ccs){ if(!ccs.disabled) sendConciergeReply(ccs); return; }
    const tpl = e.target.closest('[data-cctpl]');
    if(tpl){
      const c = CC.find(function(x){ return String(x.id) === tpl.getAttribute('data-ccfor'); }); if(!c) return;
      const wrap = tpl.closest('.adm-cc__reply');
      wrap.querySelectorAll('[data-cctpl]').forEach(function(b){ b.classList.toggle('on', b === tpl); });
      const ta = wrap.querySelector('textarea'); ta.value = ccFill(c, tpl.getAttribute('data-cctpl')); ta.focus();
      return;
    }
    if(e.target.closest('#admCcMore')){ CC_SHOW += 10; renderConcierge(); return; }
    const chg = e.target.closest('.adm-chg[data-rid]');
    if(chg){ openDetail(chg.getAttribute('data-rid')); return; }
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
      if(/[?&]admin=concierge/.test(location.search) && !sheet.classList.contains('is-open')){
        open();
        const chatId = (location.search.match(/[?&]chat=([0-9a-f-]{36})/) || [])[1];
        if(chatId){ setTimeout(function(){ openChat(chatId); }, 500); return; }
        const ccId = (location.search.match(/[?&]cc=(\d+)/) || [])[1];
        const jump = function(tries){
          const el = ccId && document.getElementById('admCc' + ccId);
          if(el){ el.scrollIntoView({ block: 'center' }); const ta = el.querySelector('textarea'); if(ta) ta.focus(); return; }
          if(tries > 0) return setTimeout(function(){ jump(tries - 1); }, 400);
          const sec = document.getElementById('admConciergeSec'); if(sec) sec.scrollIntoView({ block: 'start' });
        };
        setTimeout(function(){ jump(10); }, 700);
      }
    } catch(e){ isAdminUser = false; b.hidden = true; }
  };
  // app.js may have shown the account before this file loaded
  setTimeout(function(){ const p = document.getElementById('accountPanel'); if(p && p.style.display === 'block') window.agsAdminCheck(); }, 0);
  window.agsAdminHide = function(){ const b = document.getElementById('adminOpenBtn'); if(b) b.hidden = true; close(); };
})();
