import buddejjigaeImg from "../assets/foodIMGs/Hankki  17. Budae-Jjigae.jpg";
import bulgogiJeongolImg from "../assets/foodIMGs/Hankki  8. Bulgogi.jpg";
import dakgalbiImg from "../assets/foodIMGs/Hankki  18. Jjim-Dak.jpg";
import gochujangBulgogiImg from "../assets/foodIMGs/Hankki  7. Gochujang-Bulgogi.jpg";
import ganjangDoejiBulgogiImg from "../assets/foodIMGs/Hankki  8. Bulgogi.jpg";
import cheeseBuldakImg from "../assets/foodIMGs/Hankki  9. C heese-Buldak.jpg";
import jjimDakImg from "../assets/foodIMGs/Hankki  18. Jjim-Dak.jpg";
import japcheWithBeefImg from "../assets/foodIMGs/Hankki  13. Japche.jpg";
import kimchijjigaeWithPorkTofuImg from "../assets/foodIMGs/Hankki  22. Kimchi-Jjigae und M12. kimchi jigae.jpg";
import dolsotBibimbapImg from "../assets/foodIMGs/Hankki  M3. dolsot bibimbap UND 21. Dolsot-Bibimbab.jpg";
import dubuBibimbapImg from "../assets/foodIMGs/Hankki  M5 Dubu Dolsot-Bibimbab.jpg";
import beosotBibimbapImg from "../assets/foodIMGs/Hankki  M4. Beoseot Dolsot-Bibimbab.jpg";
import gomtangImg from "../assets/foodIMGs/\Hankki  24. G omtang Kräftige Rinderbrühe mit weich gekochten, zarten Rindfleischscheiben und Glasnudeln OKOK.jpg";
import yugaejangImg from "../assets/foodIMGs/Hankki  M1. Yukgaejang.jpg";
import ddeokbokkiImg from "../assets/foodIMGs/Hankki  12. Ddeokbokki.jpg";
import gunManduImg from "../assets/foodIMGs/Hankki  1. Gun-Mandu.jpg";
import kimchiJeonImg from "../assets/foodIMGs/Hankki  4. Kimchi-Jeon.jpg";
import pajeonImg from "../assets/foodIMGs/Hankki  3. Haemul-Pajeon.jpg";
import kimchiImg from "../assets/foodIMGs/Hankki  ig.jpg";
import extraImg from "../assets/foodIMGs/Hankki_cover_2.jpg";
import mainChickenMenu from "../assets/foodIMGs/Hankki_cover_2.jpg";
import originalFriedChicken from "../assets/foodIMGs/Hankki  5a. Frittiertes Huhnchen Korean Fried Chicken original.jpg"
import ganjangFriedChicken from "../assets/foodIMGs/Hankki  5. fried korean chicken Ganjang.jpg"
import yangnyumFriedChicken from "../assets/foodIMGs/Hankki  5. fried chicken korean Yangnyum.jpg"
import friedChickenHalfHalfImg from "../assets/foodIMGs/Hankki  cover 1.jpg"

export interface MenuVariant {
  id: string; // 내부 식별자 (예: "pork-tofu")
  labelKey: string; // 번역 키 (예: "menu.sub.porkTofu")
  price?: number; // 기본 가격과 다를 경우만 설정
  image?: string;
  spiciness?: number;
  vegetarian: boolean;
  halal: boolean;
  allergens?: string[];
}

export interface MenuItem {
  id: number;
  nameKey: string;
  descKey: string;
  category: string;
  price: number;
  image: string;
  spiciness: number;
  vegetarian: boolean; // 기본값
  halal: boolean; // 기본값
  allergens: string[]; // 기본값
  includedKeys?: string[];
  extraKeys?: string[];
  variants?: MenuVariant[]; // 선택 옵션들
}

export const menuItems: MenuItem[] = [
  /* ---------- STEW (전골 & 찌개) ---------- */
  
  // 1. Buade Jjigae
  {
    id: 1,
    nameKey: "menu.items.budaeJjigae",
    descKey: "menu.items.budaeJjigaeDesc",
    category: "stew",
    price: 29,
    image: buddejjigaeImg,
    spiciness: 2,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys: ["menu.items.budaeJjigae.included"],
    extraKeys: ["menu.items.budaeJjigae.extra"]
  },

  // 2. Bulgogi Jeongol
  {
    id: 2,
    nameKey: "menu.items.bulgogijeongol",
    descKey: "menu.items.bulgogijeongolDesc",
    category: "stew",
    price: 35,
    image: bulgogiJeongolImg,
    spiciness: 0,
    vegetarian: false,
    halal: true,
    allergens: ["A", "F", "N"],
    includedKeys: ["menu.items.bulgogijeongol.included"]
  },

  // 3. Dakgalbi Jjim
  {
    id: 3,
    nameKey: "menu.items.dakgalbi",
    descKey: "menu.items.dakgalbiDesc",
    category: "stew",
    price: 30,
    image: dakgalbiImg,
    spiciness: 2,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys: ["menu.items.dakgalbi.included"],
    extraKeys: ["menu.items.dakgalbi.extra"]
  },

  /* ---------- BULGOGI (불고기류) ---------- */

  // 4. Gochujang Bulgogi
  {
    id: 4,
    nameKey: "menu.items.gochujangBulgogi",
    descKey: "menu.items.gochujangBulgogiDesc",
    category: "bulgogi",
    price: 17,
    image: gochujangBulgogiImg,
    spiciness: 2,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"]
  },

  // 5. Ganjang Doeji Bulgogi
  {
    id: 5,
    nameKey: "menu.items.ganjangDoejiBulgogi",
    descKey: "menu.items.ganjangDoejiBulgogiDesc",
    category: "bulgogi",
    price: 17,
    image: ganjangDoejiBulgogiImg,
    spiciness: 0,
    vegetarian: false,
    halal: true,
    allergens: ["A", "F", "N"]
  },

  // 6. Bulgogi
  {
    id: 6,
    nameKey: "menu.items.Bulgogi",
    descKey: "menu.items.BulgogiDesc",
    category: "bulgogi",
    price: 19,
    image: ganjangDoejiBulgogiImg,
    spiciness: 0,
    vegetarian: false,
    halal: true,
    allergens: ["A", "F", "N"]
  },

  /* ---------- CHICKEN (치킨류) ---------- */

  // 6. Cheese Buldak
  {
    id: 7,
    nameKey: "menu.items.cheeseBuldak",
    descKey: "menu.items.cheeseBuldakDesc",
    category: "chicken",
    price: 18,
    image: cheeseBuldakImg,
    spiciness: 3,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"]
  },

  // 7. Jjim Dak
  {
    id: 8, 
    nameKey: "menu.items.jjimDak",
    descKey: "menu.items.jjimDakDesc",
    category: "chicken",
    price: 18,
    image: jjimDakImg,
    spiciness: 2,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"]
  },

  /* ---------- NOODLE (잡채 통합) ---------- */

  // 8. Japche
  {
    id: 9,
    nameKey: "menu.items.japchae",
    descKey: "menu.items.japchaeDesc",
    category: "noodle",
    price: 14,
    image: japcheWithBeefImg,
    spiciness: 0,
    vegetarian: false, // 기본값 (소고기 기준)
    halal: false,
    allergens: ["A", "F", "N"],
    variants: [
      { 
        id: "beef", 
        labelKey: "menu.items.japchae.sub.beef", 
        vegetarian: false, 
        halal: false, 
        allergens: ["A", "F", "N"] 
      },
      { 
        id: "mushroom", 
        labelKey: "menu.items.japchae.sub.mushroom", 
        vegetarian: true, // 버섯 선택 시 채식 활성화
        halal: false, 
        allergens: ["A", "F"]
      }
    ]
  },

  // 9. Kimchi Jjigae
  {
    id: 9,
    nameKey: "menu.items.kimchiJjigae",
    descKey: "menu.items.kimchiJjigaeDesc",
    category: "soup",
    price: 15,
    image: kimchijjigaeWithPorkTofuImg,
    spiciness: 2,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    variants: [
      { id: "pork-tofu", labelKey: "menu.items.kimchiJjigae.sub.porkTofu", vegetarian: false, halal: false, allergens: ["A", "F", "N"] },
      { id: "pork-only", labelKey: "menu.items.kimchiJjigae.sub.porkOnly", vegetarian: false, halal: false, allergens: ["A", "F", "N"] },
      { id: "tofu-only", labelKey: "menu.items.kimchiJjigae.sub.tofuOnly", vegetarian: true, halal: false, allergens: ["F"] }
    ]
  },

  // 10. Doenjang Jjigae
  {
    id: 10,
    nameKey: "menu.items.Doenjang-Jjigae",
    descKey: "menu.items.Doenjang-JjigaeDesc",
    category: "soup",
    price: 15,
    image: kimchijjigaeWithPorkTofuImg,
    spiciness: 1,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    variants: [
      { id: "veg", labelKey: "menu.items.Doenjang-Jjigae.sub.Vegetables", price: 13, vegetarian: true, halal: false, allergens: ["A", "F", "N"] },
      { id: "seafood", labelKey: "menu.items.Doenjang-Jjigae.sub.Seafood", price: 15, vegetarian: false, halal: false, allergens: ["A", "D","F", "N", "R"] },
    ]
  },

  // 11. Odeng Tang
    {
    id: 11, 
    nameKey: "menu.items.Odeng-Tang",
    descKey: "menu.items.Odeng-TangDesc",
    category: "soup",
    price: 13,
    image: buddejjigaeImg,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "D", "F", "N", "R"]
  },

  // 12. Dolsot Bibimbap
  {
      id: 12,
      nameKey: "menu.items.Dolsot-Bibimbap", // 돌솥비빔밥 (Rindfleisch/Beef) 
      descKey: "menu.items.Dolsot-BibimbapDesc",
      category: "bibimbap",
      price: 13,
      image: dolsotBibimbapImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: ["A", "C", "F", "G", "N"], // [cite: 26]
      extraKeys: [
        "menu.items.Extra.Beef",      // 소고기 추가 (+2.0€)
        "menu.items.Extra.TofuMush",  // 두부, 버섯 추가 (+1.5€)
        "menu.items.Extra.Egg"        // 계란 후라이 추가 (+1.0€)
      ]
    },

    // 13. Dubu Bibimbap
    {
      id: 13,
      nameKey: "menu.items.Dubu-Bibimbap", // 두부비빔밥 (Tofu) [cite: 26]
      descKey: "menu.items.Dubu-BibimbapDesc",
      category: "bibimbap",
      price: 13,
      image: dubuBibimbapImg,
      spiciness: 0,
      vegetarian: true,
      halal: false,
      allergens: ["A", "C", "F", "G", "N"], // [cite: 26]
      extraKeys: [
        "menu.items.Extra.Beef",
        "menu.items.Extra.TofuMush",
        "menu.items.Extra.Egg"
      ]
    },

    // 14. Beosot Bibimbap
    {
      id: 14,
      nameKey: "menu.items.Beosot-Bibimbap", // 버섯비빔밥 (Pilzen/Mushrooms) 
      descKey: "menu.items.Beosot-BibimbapDesc",
      category: "bibimbap",
      price: 13,
      image: beosotBibimbapImg,
      spiciness: 0,
      vegetarian: true,
      halal: false,
      allergens: ["A", "C", "F", "G", "N"], // 
      extraKeys: [
        "menu.items.Extra.Beef",
        "menu.items.Extra.TofuMush",
        "menu.items.Extra.Egg"
      ]
    },

    // 15. Gomtang
    {
      id: 15,
      nameKey: "menu.items.Gomtang",
      descKey: "menu.items.GomtangDesc",
      category: "soup",
      price: 17,
      image: gomtangImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: ["A", "C", "F", "N"]
    },

    // 16. Yukgaejang
    {
      id: 16,
      nameKey: "menu.items.Yukgaejang",
      descKey: "menu.items.YukgaejangDesc",
      category: "soup",
      price: 17,
      image: yugaejangImg,
      spiciness: 2,
      vegetarian: false,
      halal: false,
      allergens: ["A", "C", "F", "N"]
    },

    // 17.Ddeokbokki
    {
      id: 17,
      nameKey: "menu.items.Ddeokbokki",
      descKey: "menu.items.DdeokbokkiDesc",
      category: "streetfood",
      price: 15,
      image: ddeokbokkiImg,
      spiciness: 2,
      vegetarian: false,
      halal: false,
      allergens: ["A", "D", "F", "N"]
    },

    // 18.Cheese-DdeokbokkI
    {
      id: 18,
      nameKey: "menu.items.Cheese-Ddeokbokki",
      descKey: "menu.items.Cheese-DdeokbokkiDesc",
      category: "streetfood",
      price: 17,
      image: ddeokbokkiImg,
      spiciness: 2,
      vegetarian: false,
      halal: false,
      allergens: ["A", "D", "F", "G", "N"]
    },

    // 19.Jjajang-Ddeokbokki
    {
      id: 19,
      nameKey: "menu.items.Jjajang-Ddeokbokki",
      descKey: "menu.items.Jjajang-DdeokbokkiDesc",
      category: "streetfood",
      price: 17,
      image: ddeokbokkiImg,
      spiciness: 1, 
      vegetarian: false,
      halal: false,
      allergens: ["A", "C", "D", "F", "G", "N"]
    },

    // 20. Gun-Mandu
    {
      id: 20,
      nameKey: "menu.items.Gun-Mandu",
      descKey: "menu.items.Gun-ManduDesc",
      category: "side",
      price: 6,
      image: gunManduImg,
      spiciness: 0,
      vegetarian: true,
      halal: false,
      allergens: ["A", "F", "N"]
    },

    // 21. Kimchi-Jeon
    {
      id: 21,
      nameKey: "menu.items.Kimchi-Jeon",
      descKey: "menu.items.Kimchi-JeonDesc",
      category: "pancake",
      price: 10.90,
      image: kimchiJeonImg,
      spiciness: 1,
      vegetarian: false,
      halal: false,
      allergens: ["A", "D", "F", "R"]
    },

    // 22.Pajeon
    {
      id: 22,
      nameKey: "menu.items.Pajeon",
      descKey: "menu.items.PajeonDesc",
      category: "pancake",
      price: 10.90,
      image: pajeonImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: ["A", "D", "F", "R"],
      variants: [
      { 
        id: "seafood", 
        labelKey: "menu.items.pajeon.sub.seafood", 
        vegetarian: false, 
        halal: false, 
        allergens: ["A", "D", "F", "R"]
      },
      { 
        id: "mushroom", 
        labelKey: "menu.items.pajeon.sub.mushroom", 
        vegetarian: true,
        halal: false, 
        allergens: ["A", "D", "F", "R"]
      }
    ]
    },

    // 23. Kimchi
    {
      id: 23,
      nameKey: "menu.items.Kimchi",
      descKey: "menu.items.KimchiDesc",
      category: "side",
      price: 3.50,
      image: kimchiImg,
      spiciness: 1,
      vegetarian: false,
      halal: false,
      allergens: ["A", "D", "F", "R"]
    },

    // 24.extra: rice
    {
      id: 24,
      nameKey: "menu.items.ExtraRice",
      descKey: "",
      category: "extra",
      price: 1.50,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 25.extra: fried chicken sauce
    {
      id: 25,
      nameKey: "menu.items.ExtraFriedChickenSauce",
      descKey: "menu.items.ExtraFriedChickenSauceDesc",
      category: "extra",
      price: 2.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 26.extra:coleslaw
    {
      id: 26,
      nameKey: "menu.items.ExtraColeslaw",
      descKey: "",
      category: "extra",
      price: 2.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 27.extra:sauces
    {
      id: 27,
      nameKey: "menu.items.ExtraSauces",
      descKey: "menu.items.ExtraSaucesDesc",
      category: "extra",
      price: 1.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 28.extra:cheese
    {
      id: 28,
      nameKey: "menu.items.ExtraCheese",
      descKey: "",
      category: "extra",
      price: 2.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 29.extra:pickled radish 
    {     
      id: 29,
      nameKey: "menu.items.ExtraPickledRadish",
      descKey: "",
      category: "extra",
      price: 2.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 30.extra:side dishes
    {
      id: 30,
      nameKey: "menu.items.ExtraSideDishes",
      descKey: "",
      category: "extra",
      price: 1.00,
      image: extraImg,
      spiciness: 0,
      vegetarian: false,
      halal: false,
      allergens: []
    },

    // 31. Korean Fried Chicken with Bones - M
    {
    id: 31, 
    nameKey: "menu.items.Chicken-With-Bone-half",
    descKey: "",
    category: "friedChicken",
    price: 14,
    image: mainChickenMenu,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys:["menu.items.friedChicken.included"],
    variants: [
      { id: "m-original", labelKey: "menu.friedchicken.m.sub.Original", price: 14, image: originalFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"] },
      { id: "m-yangnyeom", labelKey: "menu.friedchicken.m.sub.Ganjang", price: 15, image: ganjangFriedChicken, spiciness:3, vegetarian: false, halal: false, allergens: ["A", "F", "N", "L"] },
      { id: "m-ganjang", labelKey: "menu.friedchicken.m.sub.Yangnyeom", price: 15, image: yangnyumFriedChicken, spiciness:2, vegetarian: false, halal: false, allergens: ["A", "F", "N", "L"] }
    ]
  },
  // 32.  Korean Fried Chicken with Bones - L
  {
    id: 32, 
    nameKey: "menu.items.Chicken-With-Bone-L",
    descKey: "",
    category: "friedChicken",
    price: 24.5, 
    image: mainChickenMenu,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys:["menu.items.friedChicken.included"],
    variants: [
      { id: "l-original", labelKey: "menu.friedChicken.l.sub.Original", image:originalFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"] },
      { id: "l-yangnyeom", labelKey: "menu.friedChicken.l.sub.Ganjang", spiciness:3, price: 25.5, image: ganjangFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N", "L"] },
      { id: "l-ganjang", labelKey: "menu.friedChicken.l.sub.Yangnyeom", spiciness:2, price: 25.5, image: yangnyumFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N", "L"] }
    ]
  },

  // 33. Korean Fried Chicken Boneless 
    {
    id: 33, 
    nameKey: "menu.items.Chicken-With-Boneless",
    descKey: "",
    category: "friedChicken",
    price: 24, 
    image: mainChickenMenu,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys:["menu.items.friedChicken.included"],
    variants: [
      { id: "bl-original", labelKey: "menu.friedChicken.bl.sub.Original", image:originalFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
      { id: "bl-yangnyeom", labelKey: "menu.friedChicken.bl.sub.Ganjang", spiciness:3, price: 25, image: ganjangFriedChicken, vegetarian: false, halal: false,allergens: ["A", "F", "N"], },
      { id: "bl-ganjang", labelKey: "menu.friedChicken.bl.sub.Yangnyeom", spiciness:2, price: 25, image: yangnyumFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
    ]
  },

  // 34. Korean Fried Chicken Bonelness HalfHalf
      {
    id: 34, 
    nameKey: "menu.items.Chicken-With-Boneless_halfhalf",
    descKey: "",
    category: "friedChicken",
    price: 25, 
    image: friedChickenHalfHalfImg,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys:["menu.items.friedChicken.included"],
    variants: [
      { id: "bl-original", labelKey: "menu.friedChicken.blhh.sub.OY", spiciness:1, image:originalFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
      { id: "bl-yangnyeom", labelKey: "menu.friedChicken.blhh.sub.OG", spiciness:2, price: 25, image: ganjangFriedChicken, vegetarian: false, halal: false,allergens: ["A", "F", "N"], },
      { id: "bl-ganjang", labelKey: "menu.friedChicken.blhh.sub.YG", spiciness:3, price: 26.50, image: yangnyumFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
    ]
  },

  // 35. Korean Fried Chicken with Bone HalfHalf
        {
    id: 35, 
    nameKey: "menu.items.Chicken-With-Bone_halfhalf",
    descKey: "",
    category: "friedChicken",
    price: 25.50, 
    image: friedChickenHalfHalfImg,
    spiciness: 0,
    vegetarian: false,
    halal: false,
    allergens: ["A", "F", "N"],
    includedKeys:["menu.items.friedChicken.included"],
    variants: [
      { id: "bl-original", labelKey: "menu.friedChicken.bhh.sub.OY", spiciness:1, image:originalFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
      { id: "bl-yangnyeom", labelKey: "menu.friedChicken.bhh.sub.OG", spiciness:2, price: 25.50, image: ganjangFriedChicken, vegetarian: false, halal: false,allergens: ["A", "F", "N"], },
      { id: "bl-ganjang", labelKey: "menu.friedChicken.bhh.sub.YG", spiciness:3, price: 27, image: yangnyumFriedChicken, vegetarian: false, halal: false, allergens: ["A", "F", "N"],},
    ]
  },
];