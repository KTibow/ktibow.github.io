var cacheName = "gocallme-v3";
console.log("Service Worker: Hello there!");
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installing...');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Service Worker: Caching caches...');
            return cache.addAll([
       '/gocallme',
       '/gocallme/style.css',
       '/gocallme/maskable_icon.png',
       '/gocallme/manifest.json',
       '/gocallme/sw.js'
     ]);
        })
    );
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log("Service Worker: Bye-Bye " + key);
                    return caches.delete(key);
                }
            }));
        })
    );
    console.log("Service Worker: Done installing!");
});
self.addEventListener('fetch', function(event) {
    console.log("Service Worker: We got a (no, not fish) fetch! " + event.request.url);
    caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Trying to cache ' + event.request.url + '...');
            cache.add(event.request.url);
        }).catch(function() {return;});
    event.respondWith(
        fetch(event.request).catch(function() {
            console.log('Service Worker: Returning cache ' + event.request.url + '...');
            return caches.match(event.request);
        })
    );
});
