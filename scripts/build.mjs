import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { normalizeBase } from '../src/utils.js';
const base=normalizeBase(process.env.BASE_PATH || '/');
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
for (const file of ['app.js','data.js','i18n.js','utils.js','style.css']) await cp(`src/${file}`,`dist/${file}`);
const shell=(await readFile('src/index.html','utf8')).replaceAll('{{BASE}}',base);
for(const route of ['', 'menu', 'qr']) {await mkdir(`dist/${route}`,{recursive:true});await writeFile(`dist/${route}/index.html`,shell);}
await writeFile('dist/404.html',shell.replace('content="page"','content="not-found"'));
console.log(`Built static site: dist/ (base ${base})`);
