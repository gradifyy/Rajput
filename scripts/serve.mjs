import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import './build.mjs';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png'};
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{try{let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const base=process.env.BASE_PATH||'/';if(base!=='/'&&path.startsWith(base))path=path.slice(base.length);let file=resolve(root,'.'+(path.startsWith('/')?path:'/'+path));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return}const info=await stat(file);if(info.isDirectory())file=resolve(file,'index.html');const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body)}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(resolve(root,'404.html')))}}).listen(port,'0.0.0.0',()=>console.log(`Restaurant preview: http://localhost:${port}`));
