//This is the service worker with the Cache-first network
var CACHE_NAME = 'LaBodaCache';
var urlsToCache = [
  "/offline.html",
  "/index.html", 
  "/groom-bride.html",
  "/when-where.html",
  "/guest.html",
  "/gallery.html",
  '/css/bootstrap.css',
  '/css/style.css',
  '/js/bootstrap.min.js',
  '/js/scripts.min.js',  
  "/images/bride.jpg",
  
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache)
        .then(function(){self.skipWaiting()});
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

/* self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
}); */



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Try to match: "+ event.request.url);
      return cache.match(event.request).then(function(response) {
        return response || fetch(event.request);
      }).catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
        // However, in reality you'd have many different
        // fallbacks, depending on URL & headers.
        // Eg, a fallback silhouette image for avatars.
      });
    })
  );
});
