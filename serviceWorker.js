const cacheName = "uefa-app-v1";
const cachedUrls = [
    "/",
    "/index.html",
    "/favorite.html",
    "/match.html",
    "/team.html",
    "/team-detail.html",
    "/saved-team.html",
    "/manifest.json",
    "/regServiceWorker.js",
    "/serviceWorker.js",
    "/assets/32.png",
    "/assets/144.png",
    "/assets/192.png",
    "/assets/512.png",
    "/assets/Ball.svg",
    "/assets/banner.jpg",
    "/assets/bannerlg.jpg",
    "/assets/bannermd.jpg",
    "/assets/navLogo.svg",
    "/assets/sq_logo.svg",
    "/css/materialize.min.css",
    "/css/style.css",
    "/css/util.css",
    "/js/apiFetch.js",
    "/js/customE.js",
    "/js/favorite.js",
    "/js/idb.js",
    "/js/index.js",
    "/js/indexedDb.js",
    "/js/match.js",
    "/js/materialize.min.js",
    "/js/static.js",
    "/js/team.js",
    "/js/team-detail.js",
    "/js/util.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(cachedUrls)))
});

self.addEventListener("fetch", event => {
    const apiUrl = "https://api.football-data.org/v2";
    if(event.request.url.indexOf(apiUrl)>-1) {
        event.respondWith(caches.open(cacheName).then(async (cache) => {
            return await fetch(event.request).then(resp => {
                cache.put(event.request.url, resp.clone());
                return resp;
            })
        }))
    } else {
        event.respondWith(caches.match(event.request, {ignoreSearch: true}).then(resp => resp || fetch(event.request)))
    }
})

self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(cNames => Promise.all(
        cNames.map(cName => {
            if(cName !== cName && cName.startsWith("uefa-app")) {
                return caches.delete(cName)
            }
        })
    )))
})

self.addEventListener("push", event =>{
    let body;
    (event.data) ? body=event.data.text() : body="No Payload Here";
    const opts = {
        body:body,
        icon: "assets/Ball.svg",
        vibrate: [50, 50, 50],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(self.registration.showNotification('Push Notification', opts));
})