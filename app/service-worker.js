// Minimal service worker — enables "Add to Home Screen" installability
// and basic offline support (cache-first for the app shell, since the
// event data is embedded directly in index.html rather than fetched).
const CACHE_NAME = 'ags-app-v21';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './concierge.jpg',
  './tour-events.jpg',
  './tour-guestlist.jpg',
  './tour-account.jpg',
  './tour-bell.jpg',
  './app.js',
  './supabase-config.js'
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
  event.respondWith(
    caches.match(event.request).then(function(cached){
      if(cached) return cached;
      return fetch(event.request).then(function(response){
        // Only cache same-origin, successful responses.
        if(response.ok && event.request.url.startsWith(self.location.origin)){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){ cache.put(event.request, clone); });
        }
        return response;
      }).catch(function(){
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
        if('focus' in client){ return client.focus(); }
      }
      if(self.clients.openWindow){ return self.clients.openWindow(targetUrl); }
    })
  );
});
