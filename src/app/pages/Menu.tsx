import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// 🌶️ 에러 방지를 위해 Pepper 제거, 기존 아이콘들 유지
import { Download, Leaf, X, ChevronDown, Drumstick, Utensils, Info, AlertCircle, FileText, CheckCircle2, Layers, Flame } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

// 에셋 및 데이터 임포트
import menuPDF from "../../assets/menu.pdf";
import foodIMg from "../../assets/foodIMGs/Hankki_cover_2.jpg";
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side", "extra"];
const spicinessDesc: Record<number, string> = { 1: "Mild", 2: "Medium", 3: "Hot" };

const flavorKeys: Record<string, string> = {
  "Original": "menu.flavor.Original.desc",
  "Yangnyeom": "menu.flavor.Yangnyeom.desc",
  "Ganjang": "menu.flavor.Ganjang.desc"
};

// --- 알러지 아이콘 컴포넌트 ---
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
              <span>{allergen ? t(allergen.nameKey) : code}</span>
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

// --- 🌶️ SpicinessTags (이모지 활용으로 에러 해결) ---
const SpicinessTags = ({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) => (
  <div className={`inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-md shadow-sm ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    <div className="flex gap-0.5 leading-none items-center">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ fontSize: size === "sm" ? '10px' : '13px' }}>🌶️</span>
      ))}
    </div>
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black text-red-500 uppercase tracking-tight ml-0.5`}>
      {spicinessDesc[count] || "Spicy"}
    </span>
  </div>
);

// --- 메뉴 상세 모달 ---
function DetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { t } = useLanguage();
  const [selectedVariant, setSelectedVariant] = useState(item.variants && item.variants.length > 0 ? item.variants[0] : null);
  const [hoveredVariantId, setHoveredVariantId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedVariant(item.variants && item.variants.length > 0 ? item.variants[0] : null);
  }, [item]);

  const isVeg = selectedVariant ? selectedVariant.vegetarian : item.vegetarian;
  const isHalal = selectedVariant ? selectedVariant.halal : item.halal;
  const currentAllergens = selectedVariant ? selectedVariant.allergens : item.allergens;
  const currentPrice = selectedVariant?.price || item.price;
  const currentImage = selectedVariant?.image || item.image;
  const currentSpiciness = selectedVariant ? (selectedVariant.spiciness ?? item.spiciness) : item.spiciness;
  const isFriedChicken = item.category === "friedChicken";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 z-[100] flex justify-end items-end md:items-stretch backdrop-blur-md">
      <motion.div 
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
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
              <span className="text-[9px] font-black text-black/30 tracking-widest mb-1 block">Selected Item</span>
              <h4 className="text-2xl font-black tracking-tighter leading-tight">{t(item.nameKey)}</h4>
            </div>
            <p className="text-xl font-mono font-black text-black">€{currentPrice.toFixed(2)}</p>
          </div>
          {item.variants && item.variants.length > 0 && (
            <div>
              <h5 className="text-[9px] font-black text-black/20 tracking-widest mb-2">Select Option</h5>
              <div className="flex flex-wrap gap-1.5 p-1 bg-black/[0.03] rounded-xl relative">
                {item.variants.map((variant) => {
                  const flavorName = variant.labelKey.split('.').pop() || "";
                  const hasDescription = flavorKeys[flavorName];
                  return (
                    <div key={variant.id} className="flex-1 relative">
                      <button
                        onMouseEnter={() => isFriedChicken && setHoveredVariantId(variant.id)}
                        onMouseLeave={() => isFriedChicken && setHoveredVariantId(null)}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-full py-2 px-3 rounded-lg text-[9px] font-black transition-all tracking-tighter ${selectedVariant?.id === variant.id ? "bg-white text-black shadow-sm ring-1 ring-black/5" : "text-black/40 hover:text-black"}`}
                      >
                        {t(variant.labelKey)}
                      </button>
                      <AnimatePresence>
                        {isFriedChicken && hoveredVariantId === variant.id && hasDescription && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white shadow-2xl border border-black/5 rounded-xl z-[120] w-48 pointer-events-none">
                            <p className="text-[10px] font-bold text-black leading-snug">{t(flavorKeys[flavorName])}</p>
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
              <p className="text-[10px] font-bold text-orange-900/80 leading-tight">{t("menu.friedchicken.picking")}</p>
            </div>
          )}
          {currentAllergens && currentAllergens.length > 0 && (
            <div className="pt-4 mt-auto border-t border-black/5">
              <h5 className="text-[9px] font-black text-black/20 uppercase tracking-widest mb-3">{t("menu.allergens")}</h5>
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
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [spicinessFilter, setSpicinessFilter] = useState("all");
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [isOrderGuideOpen, setIsOrderGuideOpen] = useState(false);
  const [isGuideHovered, setIsGuideHovered] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const handlePdfAction = (action: 'view' | 'download') => {
    if (action === 'view') window.open(menuPDF, '_blank');
    else {
      const link = document.createElement('a');
      link.href = menuPDF; link.download = 'Hankki_Menu.pdf'; link.click();
    }
    setIsPdfModalOpen(false);
  };

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const checkMatch = (target: any) => {
      const dMatch = dietaryFilter === "all" || (dietaryFilter === "veg" && target.vegetarian) || (dietaryFilter === "halal" && target.halal);
      const sMatch = spicinessFilter === "all" || target.spiciness === parseInt(spicinessFilter);
      return dMatch && sMatch;
    };
    return categoryMatch && (checkMatch(item) || item.variants?.some(v => checkMatch(v)));
  });

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback src={foodIMg} alt="Menu Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        </div>
        <motion.div className="relative text-center z-10 px-4 flex flex-col items-center gap-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">{t("menu.title")}</motion.h1>
          <button onClick={() => setIsPdfModalOpen(true)} className="inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white/90 transition-all shadow-2xl transform hover:scale-105 active:scale-95">
            <FileText size={18} /> PDF MENU
          </button>
        </motion.div>
      </section>

      {/* Nav */}
      <nav className="sticky top-0 bg-black/90 backdrop-blur-2xl z-40 border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            {mainCategories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-3 rounded-xl text-[12px] font-black tracking-widest border transition-all ${selectedCategory === cat ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10"}`}>
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-3">
            <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="bg-[#111] border border-white/10 px-5 py-3 rounded-xl text-[12px] font-black outline-none">
              <option value="all">Dietary: All</option>
              <option value="veg">Vegetarian</option>
              <option value="halal">Halal Only</option>
            </select>
            <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="bg-[#111] border border-white/10 px-5 py-3 rounded-xl text-[12px] font-black outline-none">
              <option value="all">Spice: Any</option>
              <option value="0">Non-Spicy</option>
              <option value="1">Mild 🌶️</option>
              <option value="2">Medium 🌶️🌶️</option>
              <option value="3">Hot 🌶️🌶️🌶️</option>
            </select>
            {selectedCategory === "friedChicken" && (
              <div className="relative">
                <button onMouseEnter={() => setIsGuideHovered(true)} onMouseLeave={() => setIsGuideHovered(false)} onClick={() => setIsOrderGuideOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl shadow-lg transition-all">
                  <Info size={16} />
                </button>
                <AnimatePresence>
                  {isGuideHovered && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl">
                      <p className="text-[10px] font-black uppercase">How to order fried chicken</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div layout key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDetailItem(item)} className="group bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all cursor-pointer">
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

      {/* --- PDF Modal --- */}
      <AnimatePresence>
        {isPdfModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPdfModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white text-black w-full max-w-sm rounded-[2rem] p-8 shadow-2xl text-center">
              <div className="bg-black/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"><Info size={32} /></div>
              <h3 className="text-xl font-black uppercase mb-2">Menu PDF</h3>
              <div className="grid gap-3">
                <button onClick={() => handlePdfAction('view')} className="w-full py-4 bg-black text-white rounded-xl font-black text-[11px] uppercase flex items-center justify-center gap-3"><Utensils size={16} /> Open in New Tab</button>
                <button onClick={() => handlePdfAction('download')} className="w-full py-4 bg-white border-2 border-black/5 rounded-xl font-black text-[11px] uppercase flex items-center justify-center gap-3"><Download size={16} /> Download File</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 🍗 주문 가이드 모달 (전체 복구 + 🌶️ 이모지 적용) --- */}
      <AnimatePresence>
        {isOrderGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOrderGuideOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-8 pb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl"><Drumstick size={24} className="text-white" /></div>
                  <h2 className="text-2xl font-black text-white uppercase leading-none">How to Order</h2>
                </div>
                <button onClick={() => setIsOrderGuideOpen(false)} className="text-white/20 hover:text-white transition-all"><X size={28} /></button>
              </div>

              <div className="overflow-y-auto px-8 py-4 no-scrollbar flex-grow space-y-4">
                {/* Step 1. Style */}
                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                  <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-3">Step 1. Style</h4>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center uppercase text-[10px] font-black text-white">With Bone</div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center uppercase text-[10px] font-black text-white">Boneless</div>
                  </div>
                </div>

                {/* Step 2. Size */}
                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                  <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-3">Step 2. Size</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-white/40 uppercase">With Bone</span>
                      <span className="text-[10px] font-black text-white uppercase">M (5pcs) / L (10pcs)</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black text-white/40 uppercase">Boneless</span>
                      <span className="text-[10px] font-black text-orange-500 uppercase">L (10-13pcs) Only</span>
                    </div>
                  </div>
                </div>

                {/* Step 3. Flavor (고추 이모지 적용) */}
                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                  <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-3">Step 3. Flavor</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "Original", heat: 0 },
                      { name: "Yangnyeom", heat: 2 },
                      { name: "Ganjang", heat: 3 }
                    ].map((f) => (
                      <div key={f.name} className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center">
                        <div className="flex justify-center gap-0.5 mb-2 h-3 items-center">
                          {f.heat > 0 ? Array.from({ length: f.heat }).map((_, i) => (
                            <span key={i} className="text-[10px]">🌶️</span>
                          )) : <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                        </div>
                        <span className="text-[9px] text-white font-black uppercase">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 4. Selection */}
                <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem] mb-6">
                  <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-3">Step 4. Selection Option</h4>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
                      <CheckCircle2 size={16} className="text-white/40" />
                      <span className="text-[9px] text-white font-black uppercase">Whole (1 Flavor)</span>
                    </div>
                    <div className="flex-1 bg-orange-500/10 rounded-2xl p-4 border border-orange-500/20 flex flex-col items-center gap-2">
                      <Layers size={16} className="text-orange-500" />
                      <span className="text-[9px] text-orange-500 font-black uppercase">Half & Half (2 Flavors)</span>
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