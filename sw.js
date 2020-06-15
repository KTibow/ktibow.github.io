var cacheName = "ktibowsite-v1";
console.log("Service Worker: Hello there!");
function logthen(arg) {
  console.log("Then", arg);
  return arg;
}
function logcatch(arg) {
  console.log("Catch", arg);
  return arg;
}
self.addEventListener('install', function (event) {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('Service Worker: Caching caches...');
      return fetch("/fullmap.txt").then(function (resp) {
        return resp.text().then(function (text) {
          var listpages = text.split("\n");
          while (listpages.indexOf("") != -1) {
            delete listpages[listpages.indexOf("")];
          }
          listpages.push("/");
          console.log("List to cache:")
          console.log(listpages);
          for (var i = 0; i < listpages.length; i++) {
            console.log("Trying to cache", listpages[i]);
            cache.add(listpages[i]).then(logthen).catch(logcatch);
          };
        });
      });
    })
  );
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && !key.includes("gocallme")) {
          console.log("Service Worker: Bye-Bye " + key);
          return caches.delete(key);
        }
      }));
    })
  );
  console.log("Service Worker: Done installing!");
});
self.addEventListener('fetch', function (event) {
  console.log("Service Worker: We got a (no, not fish) fetch! " + event.request.url);
  caches.open(cacheName).then(function (cache) {
    console.log('Service Worker: Trying to cache ' + event.request.url + '...');
    cache.add(event.request.url);
  }).catch(function () {
    return;
  });
  event.respondWith(
    fetch(event.request).catch(function () {
      console.log('Service Worker: Returning cache ' + event.request.url + '...');
      return caches.match(event.request);
    })
  );
});
