import buddejjigaeImg from "../assets/foodIMGs/Hankki  17. Budae-Jjigae.jpg";
import bulgogiJeongolImg from "../assets/foodIMGs/Hankki  8. Bulgogi.jpg";
import dakgalbiImg from "../assets/foodIMGs/Hankki  18. Jjim-Dak.jpg";
import gochujangBulgogiImg from "../assets/foodIMGs/Hankki  7. Gochujang-Bulgogi.jpg";
import ganjangDoejiBulgogiImg from "../assets/foodIMGs/Hankki  8. Bulgogi.jpg";
import cheeseBuldakImg from "../assets/foodIMGs/Hankki  9. C heese-Buldak.jpg";
import jjimDakImg from "../assets/foodIMGs/Hankki  18. Jjim-Dak.jpg";
import japcheWithBeefImg from "../assets/foodIMGs/Hankki  13. Japche.jpg";
import kimchijjigaeWithPorkTofuImg from "../assets/foodIMGs/Hankki  22. Kimchi-Jjigae und M12. kimchi jigae.jpg";
export interface MenuVariant {
  id: string; // 내부 식별자 (예: "pork-tofu")
  labelKey: string; // 번역 키 (예: "menu.sub.porkTofu")
  price?: number; // 기본 가격과 다를 경우만 설정
  vegetarian: boolean;
  halal: boolean;
  allergens: string[];
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

  // 7. Jjim Dak (ID 중복 문제로 ID 8로 변경)
  {
    id: 8, // 중복된 ID 5번에서 8번으로 수정
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

  /* ---------- SOUP (김치찌개 통합) ---------- */

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
  }

];