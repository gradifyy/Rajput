import {cp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {normalizeBase} from '../src/utils.js';
const base=normalizeBase(process.env.BASE_PATH||'/');
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await cp('docs','dist/docs',{recursive:true});
for(const file of ['app.js','menu-data.js','i18n.js','utils.js','style.css']){
  let source=await readFile(`src/${file}`,'utf8');
  if(file==='app.js')source=source.replaceAll('href="/','href="'+base).replaceAll('src="/','src="'+base);
  await writeFile(`dist/${file}`,source);
}
const shell=(await readFile('src/index.html','utf8')).replaceAll('{{BASE}}',base);
for(const route of ['', 'menu', 'qr']){
  await mkdir(`dist/${route}`,{recursive:true});
  await writeFile(`dist/${route}/index.html`,shell);
}
await writeFile('dist/404.html',shell);
console.log(`Built static site: dist/ (base ${base})`);
