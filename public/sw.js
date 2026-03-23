const CACHE_NAME = "phaser-basketball-v1";

const ASSETS_TO_CACHE = [
  "/assets/basketball/play.html",
  "/assets/basketball/images/arcade.png",
  "/assets/basketball/images/ball.png",
  "/assets/basketball/images/bg.png",
  "/assets/basketball/images/front_rim.png",
  "/assets/basketball/images/side_rim.png",
  "/assets/basketball/audio/backboard.wav",
  "/assets/basketball/audio/buzzer.wav",
  "/assets/basketball/audio/score.wav",
  "/assets/basketball/audio/spawn.wav",
  "/assets/basketball/audio/whoosh.wav",
  "/assets/blue.jpg",
  "/assets/creamsilk-two.mp4",
  "/assets/gold.jpg",
  "/assets/pink.jpg",
  "/assets/sunsilk-one.mp4",
  "/assets/sunsilk-two.mp4",
  "/assets/unilever.svg",
  "/assets/yellow.jpg",
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH (offline-first)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});