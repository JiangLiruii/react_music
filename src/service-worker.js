const cacheName = 'LorryMusic';
const dataCacheName = 'musicCache';
// install 事件，它发生在浏览器安装并注册 Service Worker 时        
self.addEventListener('install', event => { 
/* event.waitUtil 用于在安装成功之前执行一些预装逻辑
 但是建议只做一些轻量级和非常重要资源的缓存，减少安装失败的概率
 安装成功后 ServiceWorker 状态会从 installing 变为 installed */
  console.log('SW installed');
  event.waitUntil(
    caches.open(cacheName)                  
    .then(cache => cache.addAll([    // 如果所有的文件都成功缓存了，便会安装完成。如果任何文件下载失败了，那么安装过程也会随之失败。        
      '/src/img/player.png'
    ]))
  );
});


// 如果是新增的activate 事件, 那么原有的 SW 依然拥有控制权, 此时可以刷新,或者 skipWaiting
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  // 保证任何资源的修改都会重新更新 caches
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if(key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key);
        }
      }))
    })
  )
  // 为了解决 app 没有返回最新的 data, 因为某种情况下最新的 sw 还没有生效, self.clients.claim()可以更快的激活 sw.
  return self.clients.claim();
});

/**
为 fetch 事件添加一个事件监听器。接下来，使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，返回缓存的资源。
如果资源并不存在于缓存当中，通过网络来获取资源，并将获取到的资源添加到缓存中。
*/
self.addEventListener('fetch', e => {
  // console.log('[ServiceWorker] Fetch', e.request.url);
  // 如果是请求歌曲资源肯定是先请求,再缓存
  var dataUrl = 'http://localhost:3003';
  if (e.request.url.includes(dataUrl)) {
    e.respondWith(
      caches.open(dataCacheName)
      .then(cache => {
        return fetch(e.request).then(res => {
          cache.put(e.request.url, res.clone());
          return res;
        })
      })
    )
  }
  // 其余的非歌曲资源请求 
  else {
    console.log(caches);
    e.respondWith(
      caches.match(e.request).then(res => {
        return res || fetch(e.request);
      })
    )
  }
})