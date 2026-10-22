/** @typedef {{ko:string,en:string}} LocalizedText */
/** @typedef {{id:string,category:string,name:LocalizedText,description:LocalizedText,keywords:string[],image:string|null,price:number|null,verification:'sample'}} Dish */
export const business={name:{ko:'라즈뿟 인도요리',en:'Rajput Indian Cuisine'},address:{ko:'부산광역시 북구 덕천1길 9',en:'9 Deokcheon 1-gil, Buk-gu, Busan'},building:{ko:'ARTBOX · 설빙 건물 2층',en:'2F, ARTBOX / Seolbing building'},phone:null,hours:null,listing:'https://www.diningcode.com/profile.php?rid=CNcqD9shI2WV'};
export const categories=[{id:'all',ko:'전체 메뉴',en:'Everything'},{id:'curry',ko:'커리',en:'Curries'},{id:'tandoor',ko:'탄두리',en:'Tandoor'},{id:'starter',ko:'에피타이저',en:'Small plates'},{id:'bread',ko:'난',en:'Bread'},{id:'drink',ko:'음료',en:'Drinks'}];
/** @type {Dish[]} */
export const dishes=[
{id:'butter-chicken',category:'curry',name:{ko:'버터 치킨',en:'Butter chicken'},description:{ko:'부드럽고 풍부한 커리로 시작하는 인도 요리 여행.',en:'A soft, rich curry. An inviting place to begin your Indian food journey.'},keywords:['butter','chicken','버터','치킨'],image:'curry.jpg',price:null,verification:'sample'},
{id:'tandoori-chicken',category:'tandoor',name:{ko:'탄두리 치킨',en:'Tandoori chicken'},description:{ko:'인도식 화덕 요리의 매력을 만나는 한 접시.',en:'An introduction to the bold character of Indian tandoor cooking.'},keywords:['tandoori','chicken','탄두리','치킨'],image:'tandoor.jpg',price:null,verification:'sample'},
{id:'samosa',category:'starter',name:{ko:'사모사',en:'Samosa'},description:{ko:'본격적인 식사에 앞서 즐기는 인도의 작은 한 입.',en:'A little introduction to Indian flavours, before the main event.'},keywords:['samosa','사모사'],image:null,price:null,verification:'sample'},
{id:'prawn-makhani',category:'curry',name:{ko:'프라운 마크니',en:'Prawn makhani'},description:{ko:'커리의 또 다른 매력을 알아가는 새우 요리.',en:'A prawn curry for exploring another side of the menu.'},keywords:['prawn','shrimp','새우','마크니'],image:null,price:null,verification:'sample'},
{id:'garlic-naan',category:'bread',name:{ko:'갈릭 난',en:'Garlic naan'},description:{ko:'한 조각씩 나누며 좋아하는 커리와 함께.',en:'Break, share, and pair with a curry you love.'},keywords:['bread','naan','garlic','난','마늘','빵'],image:'bread.jpg',price:null,verification:'sample'},
{id:'lassi',category:'drink',name:{ko:'라씨',en:'Lassi'},description:{ko:'다채로운 인도 요리와 곁들이는 시원한 한 잔.',en:'A refreshing pause between the flavours of your meal.'},keywords:['lassi','drink','라씨','음료'],image:null,price:null,verification:'sample'}
];
export const assets=[
{file:'hero.jpg',source:'https://images.unsplash.com/photo-1565557623262-b51c2513a641',use:'Conceptual hero photograph'},
{file:'table.jpg',source:'https://images.unsplash.com/photo-1565557623262-b51c2513a641',use:'Conceptual curry and bread photograph'},
{file:'curry.jpg',source:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',use:'Conceptual curry photograph'},
{file:'tandoor.jpg',source:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0',use:'Conceptual grilled chicken photograph'},
{file:'bread.jpg',source:'https://images.unsplash.com/photo-1546833999-b9f581a1996d',use:'Conceptual flatbread crop, not actual Rajput naan'}
];
