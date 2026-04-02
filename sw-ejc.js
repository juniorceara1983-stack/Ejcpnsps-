const CACHE_NAME = 'ejc-adm-v3';
const assets = [
  './AdmEJC.html',
  './manifest-adm-ejc.json',
  './ejcmaracanau.jpeg'
];

// Instala os arquivos essenciais
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker imediatamente
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Gerencia as requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
