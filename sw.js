var cacheName = "ktibowsite-v1";
console.log("Service Worker: Hello there!");
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
          var cachelist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes(".") && !listpages[i].includes("index.html")) {
              cachelist.push(listpages[i]);
            }
          }
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("index.html")) {
              cachelist.push(listpages[i].replace("index.html", ""));
            }
          }
          console.log("Caching caches:", cachelist);
          cache.addAll(cachelist).then(function(){console.log("Cached caches");}).catch(function(){console.log("Error caching caches");});
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && !cachelist.includes(listpages[i]) && !cachelist.includes(listpages[i]+"/")) {
              console.log("I didn't cache", listpages[i]);
            }
          }
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
    console.log("No cache this time");
  });
  event.respondWith(
    fetch(event.request).catch(function () {
      console.log('Service Worker: Returning cache for ' + event.request.url + '...');
      var respy = caches.match(event.request);
      console.log(respy);
      return respy;
    })
  );
});
