"use strict";
const MANIFEST = "flutter-app-manifest";
const TEMP = "flutter-temp-cache";
const CACHE_NAME = "flutter-app-cache";

const RESOURCES = {
  "flutter_bootstrap.js": "1f293fcb3fd317b2e699430622b8d9ba",
  "version.json": "ee5e4241e7d2fb1a3f036da250a43c82",
  "index.html": "afca8f34613ed646ffecc1ef8545208f",
  "/": "afca8f34613ed646ffecc1ef8545208f",
  "main.dart.js": "bf60b0d2a16b595e502df13a476a4dfc",
  "flutter.js": "24bc71911b75b5f8135c949e27a2984e",
  "favicon.png": "1a39b61ddd030eedabd83eb10aea63f7",
  "icons/Icon-192-dark.png": "872c534bbed61ad4bc92a7a519b6d6e9",
  "icons/Icon-maskable-192-dark.png": "872c534bbed61ad4bc92a7a519b6d6e9",
  "icons/Icon-192.png": "e2ede62e80d356b419bf822a6f0a4526",
  "icons/Icon-512-dark.png": "67ab8503bd66ec2c340a086258738362",
  "icons/Icon-maskable-192.png": "e2ede62e80d356b419bf822a6f0a4526",
  "icons/Icon-maskable-512-dark.png": "67ab8503bd66ec2c340a086258738362",
  "icons/Icon-maskable-512.png": "d62772620661f641b1ebb2fba1879873",
  "icons/Icon-512.png": "d62772620661f641b1ebb2fba1879873",
  "manifest.json": "c2ff79ce41c1c5b3aa0ee9422f24ea02",
  "assets/NOTICES": "3170edc3b7ae57caab033a3da025da57",
  "assets/FontManifest.json": "ecfea1ab152a2a1e881991e14f43d30e",
  "assets/AssetManifest.bin.json": "f1b7603b6f545cb7c8de580961702f4f",
  "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf":
    "33b7d9392238c04c131b6ce224e13711",
  "assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
  "assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
  "assets/AssetManifest.bin": "68c8bc29fb36d2a0e9f4d4c07cfae921",
  "assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
  "assets/assets/fonts/icons.custom.ttf": "11fb82b7570e00ff5af5636b40dc1f21",
  "assets/assets/fonts/Recoleta-Regular.otf":
    "4136b1b0537d776fbf9db85b43972097",
};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
  "index.html",
  "flutter_bootstrap.js",
  "assets/AssetManifest.bin.json",
  "assets/FontManifest.json",
];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, { cache: "reload" })),
      );
    }),
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function (event) {
  return event.waitUntil(
    (async function () {
      try {
        var contentCache = await caches.open(CACHE_NAME);
        var tempCache = await caches.open(TEMP);
        var manifestCache = await caches.open(MANIFEST);
        var manifest = await manifestCache.match("manifest");
        // When there is no prior manifest, clear the entire cache.
        if (!manifest) {
          await caches.delete(CACHE_NAME);
          contentCache = await caches.open(CACHE_NAME);
          for (var request of await tempCache.keys()) {
            var response = await tempCache.match(request);
            await contentCache.put(request, response);
          }
          await caches.delete(TEMP);
          // Save the manifest to make future upgrades efficient.
          await manifestCache.put(
            "manifest",
            new Response(JSON.stringify(RESOURCES)),
          );
          // Claim client to enable caching on first launch
          self.clients.claim();
          return;
        }
        var oldManifest = await manifest.json();
        var origin = self.location.origin;
        for (var request of await contentCache.keys()) {
          var key = request.url.substring(origin.length + 1);
          if (key == "") {
            key = "/";
          }
          // If a resource from the old manifest is not in the new cache, or if
          // the MD5 sum has changed, delete it. Otherwise the resource is left
          // in the cache and can be reused by the new service worker.
          if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
            await contentCache.delete(request);
          }
        }
        // Populate the cache with the app shell TEMP files, potentially overwriting
        // cache files preserved above.
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put(
          "manifest",
          new Response(JSON.stringify(RESOURCES)),
        );
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      } catch (err) {
        // On an unhandled exception the state of the cache cannot be guaranteed.
        console.error("Failed to upgrade service worker: " + err);
        await caches.delete(CACHE_NAME);
        await caches.delete(TEMP);
        await caches.delete(MANIFEST);
      }
    })(),
  );
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }
  var origin = self.location.origin;
  // Use the service worker's scope to correctly strip the base path,
  // so resource keys match the RESOURCES manifest when hosted on a subpath.
  var scope = self.registration.scope;
  var key = event.request.url;
  if (key.startsWith(scope)) {
    key = key.substring(scope.length);
  } else {
    key = key.substring(origin.length + 1);
  }
  // Redirect URLs to the index.html
  if (key.indexOf("?v=") != -1) {
    key = key.split("?v=")[0];
  }
  if (
    event.request.url == origin ||
    event.request.url.startsWith(origin + "/#") ||
    key == ""
  ) {
    key = "/";
  }
  if (
    event.request.url == origin ||
    event.request.url.startsWith(origin + "/#") ||
    key == ""
  ) {
    key = "/";
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == "/") {
    return onlineFirst(event);
  }
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return (
          response ||
          fetch(event.request).then((response) => {
            if (response && Boolean(response.ok)) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
        );
      });
    }),
  );
});
self.addEventListener("message", (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === "skipWaiting") {
    self.skipWaiting();
    return;
  }
  if (event.data === "downloadOffline") {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch((error) => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(event.request).then((response) => {
            if (response != null) {
              return response;
            }
            throw error;
          });
        });
      }),
  );
}
