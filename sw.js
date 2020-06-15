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
          var filelist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes(".") && !listpages[i].includes("index.html")) {
              filelist.push(listpages[i]);
            }
          }
          var dirlist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("index.html")) {
              dirlist.push(listpages[i].replace("index.html", ""));
            }
          }
          console.log("Caching file caches:", filelist);
          console.log("Caching directory caches:", dirlist);
          cache.addAll(filelist)
            .then(function(){
               console.log("Cached files");
            }).catch(function(){
               console.error("Error caching files");
               console.trace();
            });
          cache.addAll(dirlist)
            .then(function(){
               console.log("Cached directories");
            }).catch(function(){
               console.error("Error caching directories");
               console.trace();
            });
          var cachelist = filelist.concat(dirlist);
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
