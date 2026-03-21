import { 
  Bean,      // Soy (대두)
  Egg,       // Egg (계란)
  Fish,      // Fish (생선)
  LeafyGreen,// Celery (셀러리)
  Milk,      // Milk (우유)
  Nut,       // Peanuts, Nuts (땅콩, 견과류)
  Wheat,     // Gluten (밀)
  Shrimp,    // Crustaceans (갑각류)
  Shell,     // Molluscs (조개류)
  Grape,     // Sulfites (아황산염 - 와인/포도 유래)
  Sprout,    // Sesame (참께)
  Flower2,   // Lupin (루핀 꽃)
  FlaskConical // Mustard (겨자 소스나 추출물 느낌)
} from "lucide-react";

export interface Allergen {
  nameKey: string;
  icon: any;
}

export const allergensMap: Record<string, { nameKey: string; icon: any }> = {
  A: { nameKey: "menu.allergens.gluten", icon: Wheat },
  B: { nameKey: "name.allergens.crustaceans", icon: Shrimp }, 
  C: { nameKey: "menu.allergens.egg", icon: Egg },
  D: { nameKey: "menu.allergens.fish", icon: Fish },
  E: { nameKey: "menu.allergens.peanuts", icon: Nut },
  F: { nameKey: "menu.allergens.soy", icon: Bean },
  G: { nameKey: "menu.allergens.milk", icon: Milk },
  H: { nameKey: "menu.allergens.nuts", icon: Nut },
  L: { nameKey: "menu.allergens.celery", icon: LeafyGreen }, 
  M: { nameKey: "menu.allergens.mustard", icon: FlaskConical }, 
  N: { nameKey: "menu.allergens.sesame", icon: Sprout }, 
  O: { nameKey: "menu.allergens.sulfites", icon: Grape }, 
  P: { nameKey: "menu.allergens.lupin", icon: Flower2 }, 
  R: { nameKey: "menu.allergens.molluscs", icon: Shell } 
};