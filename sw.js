---
---
// Auto-versioned Service Worker – Version wird bei jedem Jekyll-Build neu gesetzt.
const VERSION = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const CACHE = `ba-portfolio-${VERSION}`;
const BASE = '{{ site.baseurl }}';

const PRECACHE = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/impressum.html`,
  `${BASE}/datenschutz.html`,
  `${BASE}/assets/css/style.css`,
  `${BASE}/assets/js/main.js`,
  `${BASE}/assets/icons/icon-192.png`,
  `${BASE}/assets/icons/icon-512.png`,
  `${BASE}/manifest.webmanifest`
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('ba-portfolio-') && k !== CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first für HTML, damit neue Deploys sofort sichtbar sind
    event.respondWith(
      fetch(req).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(req, clone));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match(`${BASE}/index.html`)))
    );
  } else {
    // Cache-first für statische Assets
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        if (res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone));
        }
        return res;
      }))
    );
  }
});
