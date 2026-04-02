const CACHE_NAME = 'ejc-adm-v1';
const assets = [
  './AdmEJC.html',
  './manifest-adm-ejc.json',
  './ejcmaracanau.jpeg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
