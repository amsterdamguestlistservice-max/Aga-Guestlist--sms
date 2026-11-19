// Minimal service worker — enables "Add to Home Screen" installability
// and basic offline support (cache-first for the app shell, since the
// event data is embedded directly in index.html rather than fetched).
const CACHE_NAME = 'ags-app-v129';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './concierge.jpg',
  './tour-events.jpg',
  './tour-sheet.jpg',
  './tour-guestlist.jpg',
  './tour-account.jpg',
  './tour-innercircle.jpg',
  './tour-bell.jpg',
  './app.js',
  './admin.js',
  './salon.js',
  './supabase-config.js',
  './fonts/cormorant-garamond-latin-500-normal.woff2',
  './fonts/cormorant-garamond-latin-600-normal.woff2',
  './fonts/cormorant-garamond-latin-500-italic.woff2'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(key){ return key !== CACHE_NAME; })
            .map(function(key){ return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET') return;
  // Network-first: always try the latest version (so event changes show up
  // right away), and only fall back to the cache when offline.
  event.respondWith(
    fetch(event.request).then(function(response){
      // Only cache same-origin, successful responses.
      if(response.ok && event.request.url.startsWith(self.location.origin)){
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, clone); });
      }
      return response;
    }).catch(function(){
      return caches.match(event.request).then(function(cached){
        if(cached) return cached;
        // Offline and not cached — fall back to the app shell for navigations.
        if(event.request.mode === 'navigate'){ return caches.match('./index.html'); }
      });
    })
  );
});

// ===== Push notifications =====
self.addEventListener('push', function(event){
  let data = {};
  try{ data = event.data ? event.data.json() : {}; }
  catch(e){ data = { title: 'Amsterdam Guestlist Service', body: event.data ? event.data.text() : '' }; }

  const title = data.title || 'Amsterdam Guestlist Service';
  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    data: { url: data.url || './index.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList){
      for(const client of clientList){
        if('focus' in client){
          // Open the linked event (e.g. a "last spots" push) in the open app.
          if(targetUrl.indexOf('event=') >= 0 && 'navigate' in client){
            return client.navigate(new URL(targetUrl, self.registration.scope).href).then(function(c){ return (c || client).focus(); }).catch(function(){ return client.focus(); });
          }
          return client.focus();
        }
      }
      if(self.clients.openWindow){ return self.clients.openWindow(targetUrl); }
    })
  );
});
