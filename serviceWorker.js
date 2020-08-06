importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.precaching.precacheAndRoute(
    [
        {url: "/index.html", revision: "1"},
        {url: "/favorite.html", revision: "1"},
        {url: "/match.html", revision: "1"},
        {url: "/team.html", revision: "1"},
        {url: "/team-detail.html", revision: "1"},
        {url: "/saved-team.html", revision: "1"},
        {url: "/manifest.json", revision: "1"},
        {url: "/regServiceWorker.js", revision: "1"},
        {url: "/serviceWorker.js", revision: "1"},
        {url: "/assets/144.png", revision: "1"},
        {url: "/assets/192.png", revision: "1"},
        {url: "/assets/512.png", revision: "1"},
        {url: "/assets/Ball.svg", revision: "1"},
        {url: "/assets/banner.jpg", revision: "1"},
        {url: "/assets/bannerlg.jpg", revision: "1"},
        {url: "/assets/bannermd.jpg", revision: "1"},
        {url: "/assets/navLogo.svg", revision: "1"},
        {url: "/assets/sq_logo.svg", revision: "1"},
        {url: "/css/materialize.min.css", revision: "1"},
        {url: "/css/style.css", revision: "1"},
        {url: "/css/util.css", revision: "1"},
        {url: "js/apiFetch.js", revision: "1"},
        {url: "js/customE.js", revision: "1"},
        {url: "js/favorite.js", revision: "1"},
        {url: "js/idb.js", revision: "1"},
        {url: "js/index.js", revision: "1"},
        {url: "js/indexedDb.js", revision: "1"},
        {url: "js/match.js", revision: "1"},
        {url: "js/materialize.min.js", revision: "1"},
        {url: "js/static.js", revision: "1"},
        {url: "js/team.js", revision: "1"},
        {url: "js/team-detail.js", revision: "1"},
        {url: "js/util.js", revision: "1"},
        {url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
        {url: "https://code.jquery.com/jquery-3.5.1.min.js", revision: "1"},
        {url: "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js", revision: "1"}
    ], {
        ignoreUrlParametersMatching: [/.*/]
    }
)

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'img',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 20
            })
        ]
    })
)

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: "api-data"
    })
)

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