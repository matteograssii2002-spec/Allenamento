/* Allenamenti — service worker. Alza VERSION quando cambi i file. */
const VERSION = 'allenamenti-v4';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './assets/archivo-var.woff2', './assets/icon-192.png',
  './assets/icon-512.png', './assets/icon-maskable-512.png',
  './assets/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Rete per prima, cache come rete di sicurezza: online vedi sempre l'ultima
   versione, offline continui a usare l'app con l'ultima copia scaricata. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
