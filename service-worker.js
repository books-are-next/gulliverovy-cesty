/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-fb8d782';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./gulliverovy_cesty_002.html","./gulliverovy_cesty_005.html","./gulliverovy_cesty_006.html","./gulliverovy_cesty_007.html","./gulliverovy_cesty_008.html","./gulliverovy_cesty_009.html","./gulliverovy_cesty_010.html","./gulliverovy_cesty_011.html","./gulliverovy_cesty_012.html","./gulliverovy_cesty_013.html","./gulliverovy_cesty_014.html","./gulliverovy_cesty_015.html","./gulliverovy_cesty_016.html","./gulliverovy_cesty_017.html","./gulliverovy_cesty_018.html","./gulliverovy_cesty_019.html","./gulliverovy_cesty_020.html","./gulliverovy_cesty_021.html","./gulliverovy_cesty_022.html","./gulliverovy_cesty_023.html","./gulliverovy_cesty_024.html","./gulliverovy_cesty_025.html","./gulliverovy_cesty_026.html","./gulliverovy_cesty_027.html","./gulliverovy_cesty_028.html","./gulliverovy_cesty_029.html","./gulliverovy_cesty_030.html","./gulliverovy_cesty_031.html","./gulliverovy_cesty_032.html","./gulliverovy_cesty_033.html","./gulliverovy_cesty_034.html","./gulliverovy_cesty_035.html","./gulliverovy_cesty_036.html","./gulliverovy_cesty_037.html","./gulliverovy_cesty_038.html","./gulliverovy_cesty_039.html","./gulliverovy_cesty_040.html","./gulliverovy_cesty_041.html","./gulliverovy_cesty_042.html","./gulliverovy_cesty_043.html","./gulliverovy_cesty_044.html","./gulliverovy_cesty_045.html","./gulliverovy_cesty_046.html","./gulliverovy_cesty_047.html","./gulliverovy_cesty_048.html","./gulliverovy_cesty_049.html","./gulliverovy_cesty_050.html","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
