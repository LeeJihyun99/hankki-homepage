import { Bean, Egg, Fish, LeafyGreen, Milk, Nut, Wheat } from "lucide-react";

export const allergensMap: Record<string, { label: string; icon?: any }> = {
  A: { label: "gluten", icon: Wheat },
  B: { label: "crustaceans" },
  C: { label: "egg", icon: Egg },
  D: { label: "fish", icon: Fish },
  E: { label: "peanuts", icon: Nut },
  F: { label: "soy", icon: Bean },
  G: { label: "milk", icon: Milk },
  H: { label: "nuts", icon: Nut },
  I: { label: "celery", icon:LeafyGreen },
  J: { label: "mustard" },
  K: { label: "sesame" },
  L: { label: "sulfites" },
  M: { label: "lupin" },
  N: { label: "molluscs" }
};