import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Flame, Leaf, X, ChevronDown, Drumstick, Utensils, Info, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

// 에셋 및 데이터 임포트
import menuPDF from "../../assets/menu.pdf";
import foodIMg from "../../assets/foodIMGs/Hankki_cover_2.jpg";
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side", "extra"];
const spicinessDesc: Record<number, string> = { 1: "Mild", 2: "Medium", 3: "Hot" };

// PDF 기반 맛 설명 데이터
const flavorDescriptions: Record<string, { en: string; de: string; ko: string }> = {
  "Original": {
    en: "Crispy and golden-brown traditional Korean fried chicken.",
    de: "Knuspriges, goldbraunes traditionelles koreanisches Brathähnchen.",
    ko: "겉바속촉의 정석, 전통적인 한국식 후라이드 치킨."
  },
  "Yangnyeom": {
    en: "Sweet and spicy sauce with a hint of garlic and cinnamon.",
    de: "Süß-scharfe Sauce mit einer Note von Knoblauch und Zimt.",
    ko: "달콤 매콤한 소스에 마늘과 계피향이 어우러진 한국 전통 양념 치킨."
  },
  "Ganjang": {
    en: "Savory soy sauce glaze with a deep, rich umami flavor.",
    de: "Herzhafte Sojasaucen-Glasur mit tiefem Umami-Geschmack.",
    ko: "깊고 진한 풍미의 간장 소스를 입힌 짭조름한 치킨."
  }
};

// --- 알러지 팝업 컴포넌트 ---
const AllergenIcon = ({ code }: { code: string }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const allergen = allergensMap[code];
  const Icon = allergen?.icon;

  return (
    <div className="relative flex flex-col items-center gap-1 group">
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        className="w-9 h-9 rounded-xl bg-black/[0.03] flex items-center justify-center border border-black/5 hover:border-black/20 transition-colors cursor-help relative"
      >
        {Icon ? (
          <Icon size={16} className="text-black/40 group-hover:text-black transition-colors" />
        ) : (
          <span className="text-[9px] font-bold text-black/40">{code}</span>
        )}
      </div>
      
      <span className="text-[8px] font-black text-black/30 uppercase">{code}</span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: -5 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -5 }}
            className="absolute left-[110%] top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-white shadow-2xl border border-black/10 rounded-lg z-[110] min-w-max pointer-events-none"
          >
            <p className="text-[10px] font-black text-black flex items-center gap-2">
              <span className="opacity-30">{code}</span>
              <span>{allergen?.nameKey ? t(allergen.nameKey) : code}</span>
            </p>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 공통 컴포넌트: 태그 ---
const FeatureTag = ({ icon: Icon, label, colorClass, size = "sm" }: any) => (
  <div className={`inline-flex items-center gap-1 rounded-md border ${colorClass} backdrop-blur-sm shadow-sm ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    {Icon && <Icon size={size === "sm" ? 10 : 14} />}
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black uppercase tracking-tight`}>{label}</span>
  </div>
);

const SpicinessTags = ({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) => (
  <div className={`inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-md shadow-sm ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Flame key={i} size={size === "sm" ? 10 : 14} className="text-red-500" fill="currentColor" />
      ))}
    </div>
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black text-red-500 uppercase tracking-tight`}>{spicinessDesc[count] || "Spicy"}</span>
  </div>
);

// --- 메뉴 상세 모달 ---
function DetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { t } = useLanguage();
  const [selectedVariant, setSelectedVariant] = useState(item.variants && item.variants.length > 0 ? item.variants[0] : null);
  
  // 개별 버튼의 호버 상태를 추적하기 위한 state
  const [hoveredVariantId, setHoveredVariantId] = useState<string | null>(null);

  const isVeg = selectedVariant ? selectedVariant.vegetarian : item.vegetarian;
  const isHalal = selectedVariant ? selectedVariant.halal : item.halal;
  const currentAllergens = selectedVariant ? selectedVariant.allergens : item.allergens;
  const currentPrice = selectedVariant?.price || item.price;
  const currentImage = selectedVariant?.image || item.image;
  const currentSpiciness = selectedVariant ? (selectedVariant.spiciness ?? item.spiciness) : item.spiciness;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 z-[100] flex justify-end items-end md:items-stretch backdrop-blur-md">
      <motion.div 
        initial={{ x: window.innerWidth >= 768 ? "100%" : 0, y: window.innerWidth >= 768 ? 0 : "100%" }}
        animate={{ x: 0, y: 0 }} exit={{ x: window.innerWidth >= 768 ? "100%" : 0, y: window.innerWidth >= 768 ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black w-full md:w-[480px] h-[90vh] md:h-screen shadow-2xl overflow-y-auto no-scrollbar relative flex flex-col"
      >
        <button onClick={onClose} className="absolute top-4 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-lg z-30 transition-colors text-white"><X size={20} /></button>

        <div className="w-full shrink-0 overflow-hidden bg-gray-100">
          <div className="aspect-[21/11] w-full">
            <ImageWithFallback src={currentImage} alt={t(item.nameKey)} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="p-6 md:p-8 flex-grow flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-1 block">Selected Item</span>
              <h4 className="text-2xl font-black tracking-tighter leading-tight">{t(item.nameKey)}</h4>
            </div>
            <p className="text-xl font-mono font-black text-black">€{currentPrice.toFixed(2)}</p>
          </div>

          {item.variants && item.variants.length > 0 && (
                      <div>
                        <h5 className="text-[9px] font-black text-black/20 uppercase tracking-widest mb-2">Select Option</h5>
                        <div className="flex flex-wrap gap-1.5 p-1 bg-black/[0.03] rounded-xl relative">
                          {item.variants.map((variant) => {
                            // variant.labelKey가 "menu.variants.Original" 형태일 때 "Original"만 추출
                            const flavorName = variant.labelKey.split('.').pop() || "";
                            
                            return (
                              <div key={variant.id} className="flex-1 relative">
                                <button
                                  onMouseEnter={() => setHoveredVariantId(variant.id)}
                                  onMouseLeave={() => setHoveredVariantId(null)}
                                  onClick={() => setSelectedVariant(variant)}
                                  className={`w-full py-2 px-3 rounded-lg text-[9px] font-black transition-all uppercase tracking-tighter ${
                                    selectedVariant?.id === variant.id 
                                    ? "bg-white text-black shadow-sm ring-1 ring-black/5" 
                                    : "text-black/40 hover:text-black"
                                  }`}
                                >
                                  {t(variant.labelKey)}
                                </button>

                                {/* 호버 시 나타나는 맛 설명 팝업 */}
                                <AnimatePresence>
                                  {hoveredVariantId === variant.id && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white shadow-2xl border border-black/5 rounded-xl z-[120] w-48 pointer-events-none"
                                    >
                                      <p className="text-[10px] font-bold text-black leading-snug">
                                        {/* JSON에서 flavorName에 맞는 설명을 가져옴 */}
                                        {t(`menu.flavor.${flavorName}.desc`)}
                                      </p>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {isHalal && <FeatureTag label="Halal" colorClass="bg-blue-50 border-blue-100 text-blue-600" size="sm" />}
            {isVeg && <FeatureTag icon={Leaf} label="Vegetarian" colorClass="bg-green-50 border-green-100 text-green-600" size="sm" />}
            {currentSpiciness > 0 && <SpicinessTags count={currentSpiciness} size="sm" />}
          </div>

          <p className="text-black/60 text-xs leading-relaxed border-l-2 border-black/10 pl-4">{t(item.descKey)}</p>

          {item.category === "friedChicken" && (
            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 mt-2">
              <p className="text-[10px] font-bold text-orange-900/80 leading-tight">
                {t("menu.friedchicken.picking")}
              </p>
            </div>
          )}

          {currentAllergens && currentAllergens.length > 0 && (
            <div className="pt-4 mt-auto border-t border-black/5">
              <h5 className="text-[9px] font-black text-black/20 uppercase tracking-widest mb-3">{t("menu.allergens")} (Hover/Tap for info)</h5>
              <div className="flex flex-wrap gap-3">
                {currentAllergens.map((code) => <AllergenIcon key={code} code={code} />)}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Menu() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [spicinessFilter, setSpicinessFilter] = useState("all");
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [isOrderGuideOpen, setIsOrderGuideOpen] = useState(false);
  const [isGuideHovered, setIsGuideHovered] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const checkMatch = (target: any) => {
      const dMatch = dietaryFilter === "all" || (dietaryFilter === "veg" && target.vegetarian) || (dietaryFilter === "halal" && target.halal);
      const sMatch = spicinessFilter === "all" || target.spiciness === parseInt(spicinessFilter);
      return dMatch && sMatch;
    };
    const selfMatch = checkMatch(item);
    const variantMatch = item.variants?.some(v => checkMatch(v));
    return categoryMatch && (selfMatch || variantMatch);
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <ImageWithFallback src={foodIMg} alt="Menu" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <h1 className="relative text-5xl font-black z-10">{t("menu.title")}</h1>
      </section>

      <nav className="sticky top-0 bg-black/90 backdrop-blur-2xl z-40 border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-1.5">
            {mainCategories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${selectedCategory === cat ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"}`}>
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center items-center gap-3">
            <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="bg-[#111] border border-white/10 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest outline-none">
              <option value="all">Dietary: All</option>
              <option value="veg">Vegetarian</option>
              <option value="halal">Halal Only</option>
            </select>

            <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="bg-[#111] border border-white/10 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest outline-none">
              <option value="all">Spice: Any</option>
              <option value="0">Non-Spicy</option>
              <option value="1">Mild 🔥</option>
              <option value="2">Medium 🔥🔥</option>
              <option value="3">Hot 🔥🔥🔥</option>
            </select>

            {selectedCategory === "friedChicken" && (
              <div className="relative">
                <button 
                  onMouseEnter={() => setIsGuideHovered(true)} onMouseLeave={() => setIsGuideHovered(false)}
                  onClick={() => setIsOrderGuideOpen(true)} 
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all shadow-lg"
                >
                  <Info size={16} />
                </button>
                <AnimatePresence>
                  {isGuideHovered && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl">
                      <p className="text-[10px] font-black uppercase tracking-tight">How to order fried chicken</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedDetailItem(item)}
                className="group bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="aspect-square relative overflow-hidden">
                  <ImageWithFallback src={item.image} alt={t(item.nameKey)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-black text-white text-base tracking-tight">{t(item.nameKey)}</h3>
                  <div className="flex flex-wrap gap-1">
                    {item.halal && <FeatureTag label="Halal" colorClass="bg-blue-500/10 text-blue-400 border-blue-500/20" />}
                    {item.vegetarian && <FeatureTag icon={Leaf} label="Veg" colorClass="bg-green-500/10 text-green-400 border-green-500/20" />}
                    {item.spiciness > 0 && <SpicinessTags count={item.spiciness} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {isOrderGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOrderGuideOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="relative z-10 flex justify-between items-center p-8 pb-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl"><Drumstick size={24} className="text-white" /></div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">How to Order</h2>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">HANKKI Chicken Guide</p>
                  </div>
                </div>
                <button onClick={() => setIsOrderGuideOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all"><X size={28} /></button>
              </div>

              <div className="relative z-10 overflow-y-auto px-8 py-4 no-scrollbar flex-grow">
                <div className="grid gap-4 mb-6">
                  <div className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 1. Style</h4>
                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">Choose between With Bone or Boneless.</p>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2"><Drumstick size={20} className="text-orange-500/70" /><span className="text-[10px] text-white font-black uppercase">With Bone</span></div>
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2"><Utensils size={20} className="text-orange-500/70" /><span className="text-[10px] text-white font-black uppercase">Boneless</span></div>
                    </div>
                  </div>
                  
                  <div className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 2. Size</h4>
                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">Select Medium (M) or Large (L).</p>
                    <div className="flex gap-2 mb-4">
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center"><div className="text-orange-500/70 font-black text-lg mb-1">M</div><span className="text-[10px] text-white font-black uppercase">Medium</span></div>
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center"><div className="text-orange-500 font-black text-xl mb-1">L</div><span className="text-[10px] text-white font-black uppercase">Large</span></div>
                    </div>
                    <div className="flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-3 rounded-xl border border-orange-500/20">
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-black uppercase leading-none">Boneless is only available in L size.</span>
                    </div>
                  </div>

                  <div className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 3. Flavor</h4>
                    <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">Choose your favorite sauce.</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(flavorDescriptions).map(([name, desc]) => (
                        <div key={name} className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                          <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${name === "Original" ? "bg-yellow-500" : name === "Yangnyeom" ? "bg-red-500" : "bg-amber-900"}`} />
                          <span className="text-[9px] text-white font-black uppercase block mb-1">{name}</span>
                          <p className="text-[8px] text-white/40 leading-tight">{desc[language as 'en'|'de'|'ko']}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center"><span className="text-[10px] text-white font-black uppercase">Whole</span></div>
                      <div className="flex-1 bg-orange-500/10 rounded-2xl p-4 border border-orange-500/30 text-center"><span className="text-[10px] text-orange-400 font-black uppercase tracking-tighter italic leading-none block">Half & Half available!</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDetailItem && <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />}
      </AnimatePresence>
    </div>
  );
}