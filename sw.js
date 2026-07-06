/**
 * ==========================================================
 * QuarterFull
 * sw.js
 * オフライン対応用のService Worker
 * (学習データ自体はlocalStorageに保存されるため、
 *  ここではアプリ本体の静的ファイルをキャッシュする)
 * ==========================================================
 */

"use strict";

const CACHE_VERSION = "v8";
const CACHE_NAME = `quarterfull-cache-${CACHE_VERSION}`;

const CORE_ASSETS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./js/ui.js",
    "./js/lesson.js",
    "./js/storage.js",
    "./js/deckManager.js",
    "./data/sample.json",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];


// ==========================
// Install: コアアセットをキャッシュ
// ==========================

self.addEventListener("install", event => {

    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );

});


// ==========================
// Activate: 古いキャッシュを破棄
// ==========================

self.addEventListener("activate", event => {

    event.waitUntil(
        caches
            .keys()
            .then(keys =>
                Promise.all(
                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );

});


// ==========================
// Fetch: キャッシュ優先 + バックグラウンド更新
// ==========================

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {

        return;

    }


    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {

        return;

    }


    event.respondWith(

        caches.match(event.request).then(cached => {

            const networkFetch =
                fetch(event.request)
                    .then(response => {

                        if (response && response.status === 200) {

                            const clone = response.clone();

                            caches
                                .open(CACHE_NAME)
                                .then(cache => cache.put(event.request, clone));

                        }

                        return response;

                    })
                    .catch(() => cached);


            return cached || networkFetch;

        })

    );

});
