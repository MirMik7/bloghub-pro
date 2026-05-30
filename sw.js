// sw.js
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('bloghub-v1').then(cache => {
            return cache.addAll(['/']);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return new Response('Offline - нет доступа в интернет');
            });
        })
    );
});