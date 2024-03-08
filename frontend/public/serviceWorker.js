console.log("Service Worker file in public folder");

let cacheData = "appV1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData)
      .then(cacheRes => {
        console.log("Cache response:::", cacheRes); 
        cacheRes.addAll([
          '/manifest.json',
          '/static/js/bundle.js',
          '/index.html',
          '/',
          "/search-reports",
          "/view-report",
          "/generate-report"
        ]);
      })
  );
});
  
this.addEventListener("fetch", (event) => {
  if(!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        if(cacheRes) {
          return cacheRes;
        }

        let requestURL = event.request.clone();
        fetch(requestURL);
      })
    )
  }
})