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
          var bloglist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("blog")) {
              bloglist.push(listpages[i]);
            }
          }
          console.log("Caching blog:", bloglist);
          cache.addAll(bloglist).then(function(){console.log("Cached blog");}).catch(function(){console.log("Error caching blog");});
          var jscsslist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && (listpages[i].includes("js") || listpages[i].includes("css"))) {
              jscsslist.push(listpages[i]);
            }
          }
          console.log("Caching JS + CSS:", jscsslist);
          cache.addAll(jscsslist).then(function(){console.log("Cached JS+CSS");}).catch(function(){console.log("Error caching JS+CSS");});
          var dirlist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && !listpages[i].includes(".")) {
              dirlist.push(listpages[i]);
            }
          }
          console.log("Caching directories:", dirlist);
          cache.addAll(dirlist).then(function(){console.log("Cached directories");}).catch(function(){console.log("Error caching directories");});
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
