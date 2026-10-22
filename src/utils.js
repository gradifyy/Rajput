export const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function normalizeBase(value='/'){const clean=String(value).replace(/^\/+|\/+$/g,'');if(!clean)return '/';if(!/^[A-Za-z0-9_/-]+$/.test(clean)||clean.split('/').includes('..'))throw new Error('Invalid base path');return `/${clean}/`;}
export function searchDishes(dishes,category,query){const needle=query.trim().normalize('NFKC').toLocaleLowerCase();return dishes.filter(d=>(category==='all'||category===d.category)&&[...Object.values(d.name),...Object.values(d.description),...(d.keywords||[])].some(s=>s.normalize('NFKC').toLocaleLowerCase().includes(needle)));}
export function menuURL(origin,base='/'){return new URL(normalizeBase(base)+'menu/',origin).href;}
export function readLanguage(storage){try{return storage.getItem('rajput-language')==='en'?'en':'ko'}catch{return 'ko'}}
export function saveLanguage(storage,value){try{storage.setItem('rajput-language',value)}catch{/* Private browsers may disable local storage. */}}
