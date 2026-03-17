import buddejjigaeImg from "../assets/foodIMGs/Hankki  17. Budae-Jjigae.jpg";
import bulgogiJeongolImg from "../assets/foodIMGs/Hankki  8. Bulgogi.jpg";
import dakgalbiImg from "../assets/foodIMGs/Hankki  18. Jjim-Dak.jpg";
export interface MenuItem {
  id: number;
  nameKey: string;      // 번역을 위한 키 추가
  descKey: string;      // 번역을 위한 키 추가
  category: string;
  price: number;
  image: string;
  spiciness: number;
  vegetarian: boolean;
  halal: boolean;
  allergens: string[];
  includedKeys?: string[]; // 여러 개의 포함 사항 키 배열
  extraKeys?: string[];    // 여러 개의 추가 옵션 키 배열
}

export const menuItems: MenuItem[] = [

/* ---------- STEW ---------- */

{
id:1,
nameKey:"menu.items.budaeJjigae",
descKey:"menu.items.budaeJjigaeDesc",
category:"stew",
price:29,
image:buddejjigaeImg,
spiciness:2,
vegetarian:false,
halal:false,
allergens:["A","F","N"]
},

{
id:2,
nameKey:"menu.items.bulgogijeongol",
descKey:"menu.items.bulgogijeongolDesc",
category:"stew",
price:35,
image:bulgogiJeongolImg,
spiciness:0,
vegetarian:false,
halal:true,
allergens:["A","F", "N"]
},

{
id:3,
nameKey:"menu.items.dakgalbi",
descKey:"menu.items.dakgalbiDesc",
category:"stew",
price:30,
image:dakgalbiImg,
spiciness:2,
vegetarian:false,
halal:false,
allergens:["A","F","N"],
includedKeys:["menu.items.dakgalbi.included"],
extraKeys:["menu.items.dakgalbi.extra"]
},

{
id:11,
name:"Doenjang Jjigae",
category:"stew",
price:13,
spiciness:1,
vegetarian:true,
halal:true,
allergens:["A","F","N"]
},

{
id:12,
name:"Odeng Tang",
category:"soup",
price:13,
spiciness:0,
vegetarian:false,
halal:false,
allergens:["A","D","F","N","R"]
},

{
id:16,
name:"Gomtang",
category:"soup",
price:17,
spiciness:0,
vegetarian:false,
halal:true,
allergens:["A","C","F","N"]
},

{
id:17,
name:"Yukgaejang",
category:"soup",
price:17,
spiciness:2,
vegetarian:false,
halal:true,
allergens:["A","C","F","N"]
},

/* ---------- BULGOGI ---------- */

{
id:4,
name:"Gochujang Bulgogi",
category:"bulgogi",
price:17,
spiciness:2,
vegetarian:false,
halal:false,
allergens:["A","F","N"]
},

{
id:5,
name:"Ganjang Doeji Bulgogi",
category:"bulgogi",
price:17,
spiciness:1,
vegetarian:false,
halal:false,
allergens:["A","F","N"]
},

{
id:6,
name:"Bulgogi",
category:"bulgogi",
price:19,
spiciness:1,
vegetarian:false,
halal:true,
allergens:["A","F","N"]
},

/* ---------- CHICKEN ---------- */

{
id:7,
name:"Cheese Buldak",
category:"chicken",
price:18,
spiciness:3,
vegetarian:false,
halal:true,
allergens:["A","F","N"]
},

{
id:8,
name:"Jjim Dak",
category:"chicken",
price:18,
spiciness:1,
vegetarian:false,
halal:true,
allergens:["A","F","N"]
},

{
id:25,
name:"Boneless Korean Fried Chicken",
category:"friedChicken",
price:24,
spiciness:1,
vegetarian:false,
halal:true,
allergens:["A","F","N"]
},

{
id:26,
name:"Korean Fried Chicken",
category:"friedChicken",
price:24.5,
spiciness:1,
vegetarian:false,
halal:true,
allergens:["A","F","N"]
},

/* ---------- NOODLE ---------- */

{
id:9,
name:"Japchae",
category:"noodle",
price:14,
spiciness:0,
vegetarian:true,
halal:true,
allergens:["A","F","N"]
},

/* ---------- BIBIMBAP ---------- */

{
id:13,
name:"Dolsot Bibimbap",
category:"bibimbap",
price:13,
spiciness:1,
vegetarian:false,
halal:true,
allergens:["A","C","F","G","N"]
},

{
id:14,
name:"Dubu Bibimbap",
category:"bibimbap",
price:13,
spiciness:1,
vegetarian:true,
halal:true,
allergens:["A","C","F","G","N"]
},

{
id:15,
name:"Mushroom Bibimbap",
category:"bibimbap",
price:13,
spiciness:1,
vegetarian:true,
halal:true,
allergens:["A","C","F","G","N"]
},

/* ---------- TTEOKBOKKI ---------- */

{
id:18,
name:"Ddeokbokki",
category:"streetfood",
price:15,
spiciness:3,
vegetarian:false,
halal:false,
allergens:["A","D","F","N"]
},

{
id:19,
name:"Cheese Ddeokbokki",
category:"streetfood",
price:17,
spiciness:3,
vegetarian:false,
halal:false,
allergens:["A","D","F","G","N"]
},

{
id:20,
name:"Jjajang Ddeokbokki",
category:"streetfood",
price:17,
spiciness:2,
vegetarian:false,
halal:false,
allergens:["A","C","D","F","G","N"]
},

/* ---------- PANCAKES ---------- */

{
id:23,
name:"Pajeon",
category:"pancake",
price:10.9,
spiciness:0,
vegetarian:true,
halal:true,
allergens:["A","D","F","R"]
},

{
id:22,
name:"Kimchi Jeon",
category:"pancake",
price:10.9,
spiciness:1,
vegetarian:false,
halal:false,
allergens:["A","D","F","R"]
},

/* ---------- SIDE ---------- */

{
id:21,
name:"Gun Mandu",
category:"side",
price:6,
spiciness:0,
vegetarian:true,
halal:true,
allergens:["A","F","N"]
},

{
id:24,
name:"Kimchi",
category:"side",
price:3.5,
spiciness:1,
vegetarian:true,
halal:true,
allergens:["A","D","F","R"]
}

]