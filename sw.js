// sw.js - Devil's Trial Progressive Web App Service Worker
// Network-First Strategy: Prioritizes live online requests to maintain real-time AI telemetry,
// learning model synchronization, and dynamic level consistency across all browsers.

const CACHE_NAME = 'devils-trial-v4';
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './terms.html',
    './privacy.html',
    './faq.html',
    './legal.html',
    './legal.css',
    './style.css',
    './manifest.json',
    './icon.svg',
    './audio.js',
    './ai.js',
    './levelGenerator.js',
    './character.js',
    './physics.js',
    './traps.js',
    './levels.js',
    './game.js'
];

self.addEventListener('install', (event) => {
    // Immediately take over
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[PWA SW] Pre-cache initial warning (non-fatal):', err);
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            // Claim clients immediately
            self.clients.claim(),
            // Clean up stale caches
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        ])
    );
});

// Network-First Strategy: Maintains online AI model capability & fresh state
self.addEventListener('fetch', (event) => {
    // Only handle GET requests (bypass chrome extensions, POST, etc.)
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // If we got a valid response, clone & update cache
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Network failed or offline fallback
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // If HTML request fails and nothing in cache, return root
                    if (event.request.headers.get('accept')?.includes('text/html')) {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
