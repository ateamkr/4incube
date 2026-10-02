import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root = path.resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.woff2':'font/woff2'};
http.createServer(async(req,res)=>{
 try {
  let url=new URL(req.url,'http://localhost');
  if(url.pathname==='/configurator'){res.writeHead(302,{Location:'/configurator/'+url.search});res.end();return;}
  let name=decodeURIComponent(url.pathname).replace(/^\/configurator\//,'/');
  let target=path.resolve(root,'.'+name);
  if(target!==root && !target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if((await stat(target)).isDirectory()) target=path.join(target,'index.html');
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});
  res.end(await readFile(target));
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
