import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  Download, Flame, Leaf, X, ChevronDown
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import halalIcon from "../../assets/halal.png";
import menuPDF from "../../assets/menu.pdf";
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";
import foodIMg from "../../assets/foodIMGs/Hankki  cover 2.jpg"

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side"];

// 맵기 정도 설명
const spicinessDesc: Record<number, string> = {
  0: "Not Spicy",
  1: "Mild (신라면 정도)",
  2: "Medium (불닭볶음면 정도)",
  3: "Hot (아주 매움)"
};

function DetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex justify-end items-end md:items-stretch"
    >
      <motion.div
        initial={{ y: "100%", x: 0 }}
        md-initial={{ x: "100%", y: 0 }}
        animate={{ y: 0, x: 0 }}
        exit={{ y: "100%", x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111] text-white w-full md:w-[480px] h-[90vh] md:h-screen rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-t-none overflow-y-auto relative border-l border-white/10 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10">
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <div className="aspect-square overflow-hidden rounded-3xl mb-8 shadow-2xl">
            <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div className="mb-6">
            <h4 className="text-4xl font-bold mb-2 tracking-tight">{item.name}</h4>
            <div className="flex flex-wrap gap-2">
              {item.vegetarian && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Leaf size={14} className="text-green-400" />
                  <span className="text-[11px] font-bold text-green-400 uppercase">VEG</span>
                </div>
              )}
              {item.halal && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <img src={halalIcon} alt="Halal" className="w-4 h-4 invert" />
                  <span className="text-[11px] font-bold text-blue-400 uppercase">HALAL</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-2xl font-bold text-white/90 mb-6">€{item.price.toFixed(2)}</p>
          <p className="text-white/60 text-lg leading-relaxed mb-10 border-l-2 border-white/10 pl-4">
            {t(`menu.items.${item.id}.description`) || item.description}
          </p>

          {item.spiciness > 0 && (
            <div className="mb-10 p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest block mb-3">Spiciness Level</span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Flame key={i} size={24} className={i < item.spiciness ? "text-red-500" : "text-white/10"} fill={i < item.spiciness ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-medium text-red-400">{spicinessDesc[item.spiciness]}</span>
              </div>
            </div>
          )}

          {item.allergens.length > 0 && (
            <div className="pt-8 border-t border-white/10">
              <h5 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">Allergen Information</h5>
              <div className="grid grid-cols-4 gap-4">
                {item.allergens.map((code) => {
                  const allergen = allergensMap[code];
                  const Icon = allergen?.icon;
                  return (
                    <div key={code} className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
                        {Icon ? <Icon size={24} className="text-white/80" /> : <span className="text-xs font-bold text-white/40">{code}</span>}
                      </div>
                      <span className="text-[9px] text-white/40 text-center font-bold uppercase">{allergen?.label || code}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Menu() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [spicinessFilter, setSpicinessFilter] = useState<string>("all");
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const dietaryMatch = dietaryFilter === "all" || (dietaryFilter === "veg" && item.vegetarian) || (dietaryFilter === "halal" && item.halal);
    const spiceMatch = spicinessFilter === "all" || item.spiciness === parseInt(spicinessFilter);
    return categoryMatch && dietaryMatch && spiceMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white">
            {/* Menu Image */}
            <section className="relative h-screen flex items-center justify-center">
              {/* Image Container */}
              <div className="absolute inset-0">
                <ImageWithFallback src={foodIMg} alt="About Us" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
              </div>
              {/* Menu Content */}
              <motion.div 
              initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
              className="relative text-center z-10 px-4">
                {/* Menu Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10"
                >
                  {t("menu.title")}
                </motion.h1 >
                {/* Download Button */}
                <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
                <a href={menuPDF} download 
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Download size={20} />
                <span>{t("menu.downloadPDF")}</span>
                </a>
                </motion.div>
              </motion.div>
            </section>

      {/* Filter Navigation */}
      <nav className="sticky top-0 bg-black/95 backdrop-blur-xl z-40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center gap-3 py-5">
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filter */}
        <div className="bg-white/5 py-4 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex justify-center gap-4">
            <div className="relative">
              <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="appearance-none bg-black border border-white/10 pl-5 pr-12 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-white/40">
                <option value="all">ALL DIETARY</option>
                <option value="veg">VEGETARIAN</option>
                <option value="halal">HALAL ONLY</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>

            <div className="relative">
              <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="appearance-none bg-black border border-white/10 pl-5 pr-12 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-white/40">
                <option value="all">ANY SPICE</option>
                <option value="0">NON-SPICY (0)</option>
                <option value="1">MILD (1)</option>
                <option value="2">MEDIUM (2)</option>
                <option value="3">SPICY (3)</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group cursor-pointer"
                onClick={() => setSelectedDetailItem(item)}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/5 transition-all duration-500 group-hover:border-white/20 relative shadow-xl">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  
                  {/* 카드 내부 우상단 아이콘 태그 */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {item.halal && (
                      <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <img src={halalIcon} alt="Halal" className="w-4 h-4 invert" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold tracking-tight">{item.name}</h3>
                    <span className="font-mono text-lg text-white/60">€{item.price}</span>
                  </div>

                  {/* Dietary Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.vegetarian && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md">
                        <Leaf size={12} className="text-green-400" />
                        <span className="text-[9px] font-black text-green-400 uppercase">VEG</span>
                      </div>
                    )}
                    {item.spiciness > 0 && (
                      <div className="relative group/tooltip flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-md">
                        <div className="flex">
                          {Array.from({ length: item.spiciness }).map((_, i) => (
                            <Flame key={i} size={12} className="text-red-500" fill="currentColor" />
                          ))}
                        </div>
                        {/* 맵기 설명 툴팁 (Mouse Hover) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-black text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                          {spicinessDesc[item.spiciness]}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
                    {t(`menu.items.${item.id}.description`) || item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedDetailItem && <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />}
      </AnimatePresence>
    </div>
  );
}