// sw.js - Service Worker for Offline Caching & Notifications
const CACHE_NAME = "feasto-cache-v3";
const LOGO_URL = "https://i.supaimg.com/0102605e-3d7b-40fe-b036-ff43cacb268e/02c8568f-70bc-4207-aeb1-887bbf212b73.png";

const ASSETS = [
  "./",
  "./index.html",
  "./customer.html",
  "./restaurant.html",
  "./delivery.html",
  "./admin.html",
  "./config.js",
  "./manifest.json",
  LOGO_URL
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Let network handle Firestore and external API calls directly
  if (
    e.request.url.includes("firestore.googleapis.com") ||
    e.request.url.includes("firebaseio.com") ||
    e.request.url.includes("maps.googleapis.com")
  ) {
    return;
  }
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
