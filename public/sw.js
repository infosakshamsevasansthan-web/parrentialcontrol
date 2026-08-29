// GuardianLink Service Worker - Pass-through & auto update
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let network handle directly to prevent stale white screens
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
