import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Flame, Wheat, Milk, Fish, Egg, Nut, Leaf, UtensilsCrossed, SlidersHorizontal, X, Drumstick, Heart, Split } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

const categories = ["all", "friedChicken", "soups", "snacksSides", "drinks"];

// Menu items data
const menuItems = [
  // Fried Chicken
  {
    id: 1,
    category: "friedChicken",
    flavor: "original",
    name: "Original",
    nameKey: "menu.items.original",
    description: "Our signature crispy fried chicken seasoned with Korean spices and herbs, fried to golden perfection. Each bite delivers an incredible crunch with juicy, tender meat inside.",
    image: "https://images.unsplash.com/photo-1741004418691-e68682816528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBvcmlnaW5hbCUyMGNyaXNweXxlbnwxfHx8fDE3NzMzMjcxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "€12.90",
    spiciness: 0,
    allergens: ["wheat", "egg"],
    isVegetarian: false
  },
  {
    id: 2,
    category: "friedChicken",
    flavor: "yangnyeom",
    name: "Yangnyeom",
    nameKey: "menu.items.yangnyeom",
    description: "Sweet and spicy glazed chicken coated in our house-made yangnyeom sauce. Made with gochujang, garlic, and a hint of sesame, this Korean classic balances heat with sweetness perfectly.",
    image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwd2luZ3MlMjBzcGljeSUyMHNhdWNlfGVufDF8fHx8MTc3MjkzMjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€13.90",
    spiciness: 2,
    allergens: ["wheat", "egg"],
    isVegetarian: false
  },
  {
    id: 3,
    category: "friedChicken",
    flavor: "ganjang",
    name: "Ganjang",
    nameKey: "menu.items.ganjang",
    description: "Soy garlic glazed chicken with a savory-sweet umami flavor profile. Marinated in our special soy sauce blend with fresh garlic and subtle spices for an authentic Korean taste.",
    image: "https://images.unsplash.com/photo-1694763891594-3b19ad17dec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBnYW5qYW5nJTIwc295JTIwc2F1Y2UlMjBjaGlja2VuJTIwZGFya3xlbnwxfHx8fDE3NzMzMjcxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "€13.90",
    spiciness: 0,
    allergens: ["wheat", "egg"],
    isVegetarian: false
  },
  
  // Soups
  {
    id: 4,
    category: "soups",
    name: "Kimchi Jjigae",
    nameKey: "menu.items.kimchiJjigae",
    description: "Traditional Korean kimchi stew with pork, tofu, and vegetables simmered in a spicy, flavorful broth.",
    image: "https://images.unsplash.com/photo-1547928576-a8a3c38af20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBraW1jaGklMjBzdGV3fGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€9.90",
    spiciness: 2,
    allergens: ["fish"],
    isVegetarian: false
  },
  {
    id: 9,
    category: "soups",
    name: "Doenjang Jjigae",
    nameKey: "menu.items.doenjangJjigae",
    description: "Savory soybean paste stew with tofu, mushrooms, and seasonal vegetables. A comforting classic.",
    image: "https://images.unsplash.com/photo-1583003096664-c5d24e5f7f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzb3VwJTIwYm93bCUyMHN0ZXd8ZW58MXx8fHwxNzM0NDEyNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€8.90",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
  {
    id: 10,
    category: "soups",
    name: "Sundubu Jjigae",
    nameKey: "menu.items.sundubuJjigae",
    description: "Soft tofu stew with seafood, vegetables, and egg in a spicy, silky broth. Pure comfort in a bowl.",
    image: "https://images.unsplash.com/photo-1583003096664-c5d24e5f7f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzb3VwJTIwYm93bCUyMHN0ZXd8ZW58MXx8fHwxNzM0NDEyNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€10.90",
    spiciness: 3,
    allergens: ["fish", "egg"],
    isVegetarian: false
  },
  {
    id: 17,
    category: "soups",
    name: "Yukgaejang",
    nameKey: "menu.items.yukgaejang",
    description: "Spicy beef soup with shredded beef, vegetables, and glass noodles in a rich, fiery broth.",
    image: "https://images.unsplash.com/photo-1665395876131-7cf7cb099a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBidWxnb2dpJTIwYmVlZiUyMHNvdXAlMjBzdGV3fGVufDF8fHx8MTc3MzMyNzE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "€11.90",
    spiciness: 3,
    allergens: [],
    isVegetarian: false
  },
  {
    id: 18,
    category: "soups",
    name: "Samgyetang",
    nameKey: "menu.items.samgyetang",
    description: "Whole young chicken stuffed with ginseng, garlic, jujube, and rice. A nourishing Korean delicacy.",
    image: "https://images.unsplash.com/photo-1676686997059-fb817ebbb2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzYW1neWV0YW5nJTIwZ2luc2VuZyUyMGNoaWNrZW4lMjBzb3VwfGVufDF8fHx8MTc3MzMyNzE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "€14.90",
    spiciness: 0,
    allergens: [],
    isVegetarian: false
  },
  {
    id: 19,
    category: "soups",
    name: "Galbitang",
    nameKey: "menu.items.galbitang",
    description: "Tender beef short ribs in a clear, savory broth with radish and glass noodles. Light yet deeply flavorful.",
    image: "https://images.unsplash.com/photo-1665395876131-7cf7cb099a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBidWxnb2dpJTIwYmVlZiUyMHNvdXAlMjBzdGV3fGVufDF8fHx8MTc3MzMyNzE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "€12.90",
    spiciness: 0,
    allergens: [],
    isVegetarian: false
  },
  
  // Snacks & Sides
  {
    id: 5,
    category: "snacksSides",
    name: "Korean Fries",
    nameKey: "menu.items.koreanFries",
    description: "Crispy seasoned fries with Korean spices and a side of spicy mayo.",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllc3xlbnwxfHx8fDE3MzQ0MTI1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€4.90",
    spiciness: 1,
    allergens: ["egg"],
    isVegetarian: true
  },
  {
    id: 11,
    category: "snacksSides",
    name: "Tteokbokki",
    nameKey: "menu.items.tteokbokki",
    description: "Chewy rice cakes in sweet and spicy gochujang sauce. A beloved Korean street food classic.",
    image: "https://images.unsplash.com/photo-1623013542719-3c24edf46862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dGVva2Jva2tpJTIwa29yZWFuJTIwcmljZSUyMGNha2VzfGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€7.90",
    spiciness: 2,
    allergens: ["fish"],
    isVegetarian: false
  },
  {
    id: 12,
    category: "snacksSides",
    name: "Mandu (Dumplings)",
    nameKey: "menu.items.mandu",
    description: "Pan-fried Korean dumplings filled with vegetables and meat. Served with soy dipping sauce.",
    image: "https://images.unsplash.com/photo-1563245372-3f89d3aa4cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBkdW1wbGluZ3MlMjBtYW5kdXxlbnwxfHx8fDE3MzQ0MTI1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€6.90",
    spiciness: 0,
    allergens: ["wheat"],
    isVegetarian: false
  },
  {
    id: 13,
    category: "snacksSides",
    name: "Edamame",
    nameKey: "menu.items.edamame",
    description: "Steamed soybeans with sea salt. A simple, healthy snack.",
    image: "https://images.unsplash.com/photo-1565594912252-a0df060d462c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGFtYW1lJTIwYm93bHxlbnwxfHx8fDE3MzQ0MTI1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€4.50",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
  
  // Drinks
  {
    id: 6,
    category: "drinks",
    subcategory: "alcohol",
    name: "Soju",
    nameKey: "menu.items.soju",
    description: "Traditional Korean distilled spirit available in various flavors.",
    image: "https://images.unsplash.com/photo-1634804187290-8e259d2c3ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2p1JTIwYm90dGxlfGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€6.50",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
  {
    id: 14,
    category: "drinks",
    subcategory: "alcohol",
    name: "Makgeolli",
    nameKey: "menu.items.makgeolli",
    description: "Traditional Korean rice wine with a sweet, tangy flavor and milky appearance.",
    image: "https://images.unsplash.com/photo-1634804187290-8e259d2c3ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2p1JTIwYm90dGxlfGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€7.50",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
  {
    id: 15,
    category: "drinks",
    subcategory: "nonAlcohol",
    name: "Korean Plum Tea",
    nameKey: "menu.items.plumTea",
    description: "Sweet and refreshing plum tea served hot or cold.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBjdXAlMjBob3R8ZW58MXx8fHwxNzM0NDEyNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€3.90",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
  {
    id: 16,
    category: "drinks",
    subcategory: "nonAlcohol",
    name: "Yuzu Soda",
    nameKey: "menu.items.yuzuSoda",
    description: "Sparkling yuzu citrus soda. Light, refreshing, and perfectly balanced.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWElMjBjdXAlMjBob3R8ZW58MXx8fHwxNzM0NDEyNTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "€4.50",
    spiciness: 0,
    allergens: [],
    isVegetarian: true
  },
];

// Allergen icon mapping
const allergenIcons: Record<string, any> = {
  wheat: Wheat,
  milk: Milk,
  fish: Fish,
  egg: Egg,
  nuts: Nut,
};

// Detail Modal Component
function DetailModal({ item, onClose }: { item: typeof menuItems[0]; onClose: () => void }) {
  return (
    <>
      {/* Mobile Modal - Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="md:hidden fixed inset-0 bg-black/80 z-50 flex items-end justify-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-black rounded-t-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-2xl font-bold pr-2">{item.name}</h4>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
            <p className="text-3xl font-bold mb-4">{item.price}</p>
            
            {item.spiciness > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600">Spiciness:</span>
                <div className="flex gap-1">
                  {Array.from({ length: item.spiciness }).map((_, i) => (
                    <Flame key={i} size={18} className="text-red-500" />
                  ))}
                </div>
              </div>
            )}

            {item.allergens.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-sm text-gray-600">Allergens:</span>
                <div className="flex gap-2">
                  {item.allergens.map((allergen) => {
                    const Icon = allergenIcons[allergen];
                    return Icon ? (
                      <div
                        key={allergen}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                        title={allergen}
                      >
                        <Icon size={20} className="text-gray-700" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {item.isVegetarian && (
              <div className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-green-100 border border-green-300">
                <Leaf size={14} className="text-green-600" />
                <span className="text-sm text-green-600 font-medium">Vegetarian</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop/Tablet Modal - Right Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="hidden md:flex fixed inset-0 bg-black/60 z-50 justify-end"
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white text-black w-full max-w-md lg:max-w-lg h-full overflow-y-auto shadow-2xl"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-3xl font-bold pr-4">{item.name}</h4>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl mb-6">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">{item.description}</p>
            <p className="text-4xl font-bold mb-6">{item.price}</p>
            
            {item.spiciness > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-base text-gray-600 font-medium">Spiciness:</span>
                <div className="flex gap-1">
                  {Array.from({ length: item.spiciness }).map((_, i) => (
                    <Flame key={i} size={20} className="text-red-500" />
                  ))}
                </div>
              </div>
            )}

            {item.allergens.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="text-base text-gray-600 font-medium">Allergens:</span>
                <div className="flex gap-2">
                  {item.allergens.map((allergen) => {
                    const Icon = allergenIcons[allergen];
                    return Icon ? (
                      <div
                        key={allergen}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                        title={allergen}
                      >
                        <Icon size={18} className="text-gray-700" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {item.isVegetarian && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-300">
                <Leaf size={16} className="text-green-600" />
                <span className="text-base text-green-600 font-medium">Vegetarian</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export function Menu() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPortion, setSelectedPortion] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "vegetarian" | "nonVegetarian">("all");
  const [spicinessFilter, setSpicinessFilter] = useState<number | null>(null);
  const [selectedDetailItem, setSelectedDetailItem] = useState<typeof menuItems[0] | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedStyle(null);
    setSelectedSize(null);
    setSelectedPortion(null);
    setSelectedFlavor(null);
    setShowFilters(false);
  };

  const handleDownloadMenu = () => {
    alert(t("menu.downloadPDFAlert") || "Menu PDF download would start here. In production, this would download the actual menu PDF.");
  };

  // Filter items based on selection
  const filteredItems = menuItems.filter((item) => {
    // Category filter
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    // For fried chicken, filter by flavor if selected
    if (selectedCategory === "friedChicken" && selectedFlavor && item.flavor !== selectedFlavor) {
      return false;
    }

    // Dietary filter (only for non-fried chicken categories)
    if (selectedCategory !== "friedChicken") {
      if (dietaryFilter === "vegetarian" && !item.isVegetarian) {
        return false;
      }
      if (dietaryFilter === "nonVegetarian" && item.isVegetarian) {
        return false;
      }

      // Spiciness filter
      if (spicinessFilter !== null && item.spiciness > spicinessFilter) {
        return false;
      }
    }

    return true;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764358868789-400fb3d39fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZGFyayUyMGVsZWdhbnQlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3MzMxNzIyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            >
              {t("menu.title")}
            </motion.h1>
            {/* Download Menu Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={handleDownloadMenu}
              className="flex items-center gap-2 bg-white text-black text-sm px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-white/90 transition-colors shadow-lg"
            >
              <Download size={18} />
              <span>{t("menu.downloadPDF")}</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white hover:bg-white/10"
                }`}
              >
                {t(`menu.categories.${category}`)}
              </button>
            ))}
          </motion.div>

          {/* Fried Chicken - Style, Size, Portion, then Flavor */}
          {selectedCategory === "friedChicken" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12 space-y-12"
            >
              {/* Step 1: Style Selection */}
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-bold mb-6 text-center"
                >
                  {t("menu.chooseYourStyle")}
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => setSelectedStyle(selectedStyle === "withBones" ? null : "withBones")}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                      selectedStyle === "withBones"
                        ? "bg-white/15 border-white shadow-lg shadow-white/20"
                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedStyle === "withBones" ? "bg-white/20" : "bg-white/10"
                      }`}>
                        <Drumstick size={32} className="text-white" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.withBones")}</h4>
                      <p className="text-sm sm:text-base text-white/70">
                        {t("menu.withBonesDesc")}
                      </p>
                    </div>
                    {selectedStyle === "withBones" && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      </motion.div>
                    )}
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setSelectedStyle(selectedStyle === "withoutBones" ? null : "withoutBones")}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                      selectedStyle === "withoutBones"
                        ? "bg-white/15 border-white shadow-lg shadow-white/20"
                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedStyle === "withoutBones" ? "bg-white/20" : "bg-white/10"
                      }`}>
                        <Heart size={32} className="text-white" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.withoutBones")}</h4>
                      <p className="text-sm sm:text-base text-white/70">
                        {t("menu.withoutBonesDesc")}
                      </p>
                    </div>
                    {selectedStyle === "withoutBones" && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Step 2: Size Selection */}
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl font-bold mb-6 text-center"
                >
                  {t("menu.selectYourSize")}
                </motion.h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {/* Size M - Half Chicken */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => {
                      setSelectedSize(selectedSize === "M" ? null : "M");
                      if (selectedSize !== "M") {
                        setSelectedPortion(null);
                      }
                    }}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                      selectedSize === "M"
                        ? "bg-white/15 border-white shadow-lg shadow-white/20"
                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold mb-4">
                        M
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.sizeM")}</h4>
                      <p className="text-sm sm:text-base text-white/70 mb-3">
                        {t("menu.sizeMDesc")}
                      </p>
                      <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
                        1 Flavor Choice
                      </div>
                    </div>
                    {selectedSize === "M" && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Size L - Whole Chicken */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setSelectedSize(selectedSize === "L" ? null : "L");
                      if (selectedSize !== "L") {
                        setSelectedPortion(null);
                      }
                    }}
                    className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                      selectedSize === "L"
                        ? "bg-white/15 border-white shadow-lg shadow-white/20"
                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-bold mb-4">
                        L
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.sizeL")}</h4>
                      <p className="text-sm sm:text-base text-white/70 mb-3">
                        {t("menu.sizeLDesc")}
                      </p>
                      <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
                        1 or 2 Flavors
                      </div>
                    </div>
                    {selectedSize === "L" && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-black"></div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Step 3: Portion Selection (Always visible - for Whole Chicken L only) */}
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl font-bold mb-2 text-center"
                >
                  {t("menu.selectYourPortion")}
                </motion.h3>
                <p className="text-center text-white/60 text-sm mb-6">
                  For Whole Chicken (L) only
                </p>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setSelectedPortion(selectedPortion === "whole" ? null : "whole")}
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                        selectedPortion === "whole"
                          ? "bg-white/15 border-white shadow-lg shadow-white/20"
                          : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                      }`}
                    >
                      <div className="relative z-10">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                          selectedPortion === "whole" ? "bg-white/20" : "bg-white/10"
                        }`}>
                          <Flame size={32} className="text-white" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.whole")}</h4>
                        <p className="text-sm sm:text-base text-white/70 mb-3">
                          {t("menu.wholeDesc")}
                        </p>
                        <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
                          1 Flavor Choice
                        </div>
                      </div>
                      {selectedPortion === "whole" && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        </motion.div>
                      )}
                    </motion.button>

                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setSelectedPortion(selectedPortion === "halfAndHalf" ? null : "halfAndHalf")}
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 transition-all duration-300 ${
                        selectedPortion === "halfAndHalf"
                          ? "bg-white/15 border-white shadow-lg shadow-white/20"
                          : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                      }`}
                    >
                      <div className="relative z-10">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors ${
                          selectedPortion === "halfAndHalf" ? "bg-white/20" : "bg-white/10"
                        }`}>
                          <Split size={32} className="text-white" />
                        </div>
                        <h4 className="text-xl sm:text-2xl font-bold mb-2">{t("menu.halfAndHalf")}</h4>
                        <p className="text-sm sm:text-base text-white/70 mb-3">
                          {t("menu.halfAndHalfDesc")}
                        </p>
                        <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-medium">
                          2 Flavor Choices
                        </div>
                      </div>
                      {selectedPortion === "halfAndHalf" && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center"
                        >
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </div>

              {/* Step 4: Flavor Selection */}
              <div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-bold mb-8 text-center"
                >
                  {(selectedSize === "L" && selectedPortion === "halfAndHalf") ? t("menu.pickYourFlavors") : t("menu.pickYourFlavor")}
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
                  {["original", "yangnyeom", "ganjang"].map((flavor, index) => {
                    const flavorItem = menuItems.find(item => item.flavor === flavor);
                    return (
                      <motion.div
                        key={flavor}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedDetailItem(flavorItem || null)}
                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          selectedFlavor === flavor
                            ? "bg-white/15 border-white shadow-lg shadow-white/20"
                            : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                        }`}
                      >
                        <div className="aspect-square overflow-hidden">
                          <ImageWithFallback
                            src={flavorItem?.image || ""}
                            alt={flavor}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <h4 className="text-base sm:text-xl font-bold mb-1 capitalize">{flavor}</h4>
                          <p className="text-xs sm:text-sm text-white/70 line-clamp-1 mb-2">{flavorItem?.description}</p>
                          <p className="text-sm sm:text-lg font-semibold">{flavorItem?.price}</p>
                          {flavorItem && flavorItem.spiciness > 0 && (
                            <div className="flex items-center justify-center gap-1 mt-2">
                              {Array.from({ length: flavorItem.spiciness }).map((_, i) => (
                                <Flame key={i} size={12} className="text-red-500" />
                              ))}
                            </div>
                          )}
                        </div>
                        {selectedFlavor === flavor && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg z-10"
                          >
                            <div className="w-2 h-2 rounded-full bg-black"></div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Other Categories - Show Filter Toggle */}
          {selectedCategory !== "all" && selectedCategory !== "friedChicken" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              {/* Filter Toggle Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
                  <span className="font-medium">{t("menu.filters")}</span>
                </button>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white/5 rounded-2xl p-6 sm:p-8 mb-8 space-y-6">
                      {/* Dietary Preferences */}
                      <div>
                        <p className="text-sm text-white/60 mb-3 text-center font-medium">{t("menu.dietaryPreferences")}</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <button
                            onClick={() => setDietaryFilter("all")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              dietaryFilter === "all"
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <UtensilsCrossed size={16} />
                            <span>{t("menu.all")}</span>
                          </button>
                          <button
                            onClick={() => setDietaryFilter("vegetarian")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              dietaryFilter === "vegetarian"
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <Leaf size={16} />
                            <span>{t("menu.vegetarian")}</span>
                          </button>
                        </div>
                      </div>

                      {/* Spiciness Level Filter */}
                      <div>
                        <p className="text-sm text-white/60 mb-3 text-center font-medium">{t("menu.spicinessLevel")}</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <button
                            onClick={() => setSpicinessFilter(null)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              spicinessFilter === null
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <span>{t("menu.allLevels")}</span>
                          </button>
                          <button
                            onClick={() => setSpicinessFilter(0)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              spicinessFilter === 0
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <span>{t("menu.notSpicy")}</span>
                          </button>
                          <button
                            onClick={() => setSpicinessFilter(1)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              spicinessFilter === 1
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <Flame size={16} className="text-orange-400" />
                            <span>{t("menu.mild")}</span>
                          </button>
                          <button
                            onClick={() => setSpicinessFilter(2)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              spicinessFilter === 2
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <Flame size={16} className="text-red-500" />
                            <Flame size={16} className="text-red-500" />
                            <span>{t("menu.medium")}</span>
                          </button>
                          <button
                            onClick={() => setSpicinessFilter(3)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                              spicinessFilter === 3
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/80 border-white/30 hover:bg-white/10"
                            }`}
                          >
                            <Flame size={16} className="text-red-600" />
                            <Flame size={16} className="text-red-600" />
                            <Flame size={16} className="text-red-600" />
                            <span>{t("menu.hot")}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedDetailItem(item)}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 sm:p-6">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <h3 className="text-base sm:text-2xl font-bold">{item.name}</h3>
                    <p className="text-sm sm:text-xl font-semibold text-white/90">{item.price}</p>
                  </div>
                  <p className="text-white/70 text-xs sm:text-base leading-relaxed mb-2 sm:mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Spiciness Level */}
                  {item.spiciness > 0 && (
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <div className="flex gap-1">
                        {Array.from({ length: item.spiciness }).map((_, i) => (
                          <Flame
                            key={i}
                            size={12}
                            className={
                              item.spiciness === 1
                                ? "text-orange-400"
                                : item.spiciness === 2
                                ? "text-red-500"
                                : "text-red-600"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vegetarian Badge */}
                  {item.isVegetarian && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                      <Leaf size={10} className="text-green-400" />
                      <span className="text-xs text-green-400 font-medium">{t("menu.vegetarian")}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/60 text-lg">No items match your filters. Please try different criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDetailItem && (
          <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}