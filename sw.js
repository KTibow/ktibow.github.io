var cacheName = "ktibowsite-v1";
console.log("Service Worker: Hello there!");
self.addEventListener('install', function (event) {
  console.log('Service Worker: Installing...');
  if (navigator.onLine) {
    self.skipWaiting();
  }
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('Service Worker: Caching caches...');
      return fetch("/fullmap.txt").then(function (resp) {
        return resp.text().then(function (text) {
          var listpages = text.split("\n");
          while (listpages.indexOf("") != -1) {
            delete listpages[listpages.indexOf("")];
          }
          var jscsslist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes(".") &&
                (listpages[i].includes("js") || listpages[i].includes("css"))) {
              jscsslist.push(listpages[i]);
            }
          }
          var imglist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes(".") &&
                (listpages[i].includes("png") || listpages[i].includes("jpg") ||
                 listpages[i].includes("gif") || listpages[i].includes("ico"))) {
              imglist.push(listpages[i]);
            }
          }
          var dirlist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("index.html")) {
              dirlist.push(listpages[i].replace("index.html", ""));
            }
          }
          var redirdirlist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("/index.html")) {
              redirdirlist.push(listpages[i].replace("/index.html", ""));
            }
          }
          var indexlist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes("index.html")) {
              indexlist.push(listpages[i]);
            }
          }
          var gocallmelist = [
            '/gocallme/',
            '/gocallme/index.html',
            '/gocallme/style.css',
            '/gocallme/maskable_icon.png',
            '/gocallme/manifest.json',
            '/gocallme/sw.js'
          ];
          var corslist = [
            'https://fonts.googleapis.com/css?family=Open+Sans&display=swap',
            'https://fonts.googleapis.com/css?family=Open+Sans',
            'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap'
          ];
          try {
            console.log("Caching CORS stuff:", corslist);
            for (var corsy in corslist) {
              fetch(corsy, {mode: 'no-cors'});
            }
            console.log("Finished starting to cache CORS stuff");
          } catch {
            console.error("Error caching cross-origin stuff.");
          }
          var cachelist = jscsslist.concat(imglist).concat(dirlist)
                                   .concat(indexlist).concat(redirdirlist)
                                   .concat(gocallmelist).concat(corslist);
          var filelist = [];
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && listpages[i].includes(".")
                && !listpages[i].includes("index.html") && !listpages[i].includes("yml")
                && !cachelist.includes(listpages[i]) && !listpages[i].includes("old_sitemap")) {
              filelist.push(listpages[i]);
            }
          }
          cachelist = cachelist.concat(filelist);
          console.log("Caching JS+CSS caches:", jscsslist);
          console.log("Caching image caches:", imglist);
          console.log("Caching directory caches:", dirlist);
          console.log("Caching redirect directory caches:", redirdirlist);
          console.log("Caching index.html files:", indexlist);
          console.log("Caching gocallme files:", gocallmelist);
          console.log("Caching file caches:", filelist);
          cache.addAll(jscsslist)
            .then(function(){
              console.log("Cached JS+CSS");
            }).catch(function(){
              console.error("Error caching JS+CSS");
              console.trace();
            });
          cache.addAll(imglist)
            .then(function(){
              console.log("Cached images");
            }).catch(function(){
              console.error("Error caching images");
              console.trace();
            });
          cache.addAll(dirlist)
            .then(function(){
              console.log("Cached directories");
            }).catch(function(){
              console.error("Error caching directories");
              console.trace();
            });
          cache.addAll(redirdirlist)
            .then(function(){
              console.log("Cached redirect directories");
            }).catch(function(){
              console.error("Error caching redirect directories");
              console.trace();
            });
          cache.addAll(indexlist)
            .then(function(){
              console.log("Cached index.html files");
            }).catch(function(){
              console.error("Error caching index.html files");
              console.trace();
            });
          cache.addAll(gocallmelist)
            .then(function(){
              console.log("Cached Go Call Me files");
            }).catch(function(){
              console.error("Error caching Go Call Me files");
              console.trace();
            });
          cache.addAll(filelist)
            .then(function(){
              console.log("Cached files");
            }).catch(function(){
              console.error("Error caching files");
              console.trace();
            });
          for (var i = 0; i < listpages.length; i++) {
            if (typeof listpages[i] == "string" && !cachelist.includes(listpages[i]) &&
               !cachelist.includes(listpages[i]+"/")) {
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
    })old_sitemap
  );
  console.log("Service Worker: Done installing!");
});
self.addEventListener('fetch', function (event) {
  event.respondWith((async function() {
    console.log("Service Worker: We got a (no, not fish) fetch! " + event.request.url);
    try {
      const networkResponse = await fetch(event.request);
      const clonedResponse = networkResponse.clone();
      event.waitUntil((async function() {
        const cache = await caches.open(cacheName);
        console.log("Service Worker: Caching "+event.request.url);
        await cache.put(event.request, clonedResponse);
      })());
      console.log("Service Worker: Returning response for "+event.request.url);
      return networkResponse;
    } catch {
      console.log("Service Worker: Returning cache for "+event.request.url);
      const cache = await caches.open(cacheName);
      const response = await cache.match(event.request);
      return response;
    }
  })());
});
