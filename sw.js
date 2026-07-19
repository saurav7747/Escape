const CACHE_NAME = 'shadow-escape-v1';
const ASSETS = [
    './index.html',
    './style.css',
    './js/constants.js',
    './js/utils.js',
    './js/input.js',
    './js/audio.js',
    './js/particles.js',
    './js/camera.js',
    './js/physics.js',
    './js/entity.js',
    './js/player.js',
    './js/enemy.js',
    './js/level.js',
    './js/renderer.js',
    './js/engine.js',
    './js/main.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
