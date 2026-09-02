// Minimal service worker — enables "Add to Home Screen" installability
// and basic offline support (cache-first for the app shell, since the
// event data is embedded directly in index.html rather than fetched).
const CACHE_NAME = 'ags-app-v6';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
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
