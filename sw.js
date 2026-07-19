const CACHE_NAME = 'shadow-escape-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './manifest.json',
    './js/main.js',
    './js/engine.js',
    './js/config.js',
    './js/constants.js',
    './js/input.js',
    './js/touch.js',
    './js/utils.js',
    './js/assets.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

