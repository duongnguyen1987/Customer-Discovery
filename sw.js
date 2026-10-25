/* PAG34 offline app shell: customer records remain in browser localStorage. */
const CACHE='pag34-static-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const names=await caches.keys();
    await Promise.all(names.filter(x=>x.startsWith('pag34-static-')&&x!==CACHE).map(x=>caches.delete(x)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  const path=self.registration.scope;
  if(!url.href.startsWith(path))return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try { const response=await fetch(event.request);
        if(response.ok){const cache=await caches.open(CACHE);await cache.put(new URL('index.html',path).href,response.clone());}
        return response;
      }catch(err){return await caches.match(new URL('index.html',path).href) || Response.error();}
    })());
  }else{
    event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(res=>{
      if(res.ok){const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return res;
    })));
  }
});
