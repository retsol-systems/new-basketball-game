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
  // add all images/audio used by the game
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// Fetch (offline-first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});