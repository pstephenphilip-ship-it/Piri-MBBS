/* DoctoRise service worker — offline shell + on-demand content caching.
   Bump VERSION to force a clean cache refresh on the next visit. */
const VERSION = 'v35';
const SHELL_CACHE = 'doctorise-shell-' + VERSION;
const CONTENT_CACHE = 'doctorise-content-' + VERSION;

// Core app shell precached on install so the app opens offline.
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () {})
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL_CACHE && k !== CONTENT_CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  // Never touch cross-origin (Supabase auth/sync, Stripe, Google Fonts, etc.)
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to the cached shell when offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (r) {
        var cp = r.clone();
        caches.open(SHELL_CACHE).then(function (c) { c.put('/index.html', cp); });
        return r;
      }).catch(function () {
        return caches.match('/index.html').then(function (r) { return r || caches.match('/'); });
      })
    );
    return;
  }

  // Content, images and static assets: stale-while-revalidate.
  if (/^\/(content|img|assets)\//.test(url.pathname) ||
      /\.(png|webp|jpe?g|svg|json|mp3|webmanifest)$/.test(url.pathname)) {
    e.respondWith(
      caches.open(CONTENT_CACHE).then(function (cache) {
        return cache.match(req).then(function (cached) {
          var network = fetch(req).then(function (r) {
            if (r && r.status === 200) cache.put(req, r.clone());
            return r;
          }).catch(function () { return cached; });
          return cached || network;
        });
      })
    );
  }
});
