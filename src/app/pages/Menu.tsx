import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Flame, Leaf, X, ChevronDown, Drumstick, Utensils, Info, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Layers } from "lucide-react";

// 에셋 및 데이터 임포트
import menuPDF from "../../assets/menu.pdf";
import foodIMg from "../../assets/foodIMGs/Hankki_cover_2.jpg";
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side", "extra"];
const spicinessDesc: Record<number, string> = { 1: "Mild", 2: "Medium", 3: "Hot" };

// PDF 기반 맛 설명 데이터 (JSON 키와 매칭)
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
    <div className="relative flex flex-col items-center gap-1 group relative">
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
  const [hoveredVariantId, setHoveredVariantId] = useState<string | null>(null);

  const isVeg = selectedVariant ? selectedVariant.vegetarian : item.vegetarian;
  const isHalal = selectedVariant ? selectedVariant.halal : item.halal;
  const currentAllergens = selectedVariant ? selectedVariant.allergens : item.allergens;
  const currentPrice = selectedVariant?.price || item.price;
  const currentImage = selectedVariant?.image || item.image;
  const currentSpiciness = selectedVariant ? (selectedVariant.spiciness ?? item.spiciness) : item.spiciness;

  // Fried Chicken 카테고리인지 확인
  const isFriedChicken = item.category === "friedChicken";

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
                  // variant.labelKey가 "menu.variants.Original" 형태일 때 "Original"만 추출
                  const flavorName = variant.labelKey.split('.').pop() || "";
                  const hasDescription = flavorKeys[flavorName];

                  return (
                    <div key={variant.id} className="flex-1 relative">
                      <button
                        // Fried Chicken일 때만 호버 상태 변경
                        onMouseEnter={() => isFriedChicken && setHoveredVariantId(variant.id)}
                        onMouseLeave={() => isFriedChicken && setHoveredVariantId(null)}
                        onClick={() => setSelectedVariant(variant)}
                        className={`w-full py-2 px-3 rounded-lg text-[9px] font-black transition-all tracking-tighter ${selectedVariant?.id === variant.id ? "bg-white text-black shadow-sm ring-1 ring-black/5" : "text-black/40 hover:text-black"}`}
                      >
                        {t(variant.labelKey)}
                      </button>

                      {/* Fried Chicken이고 맛 설명이 있을 때만 팝업 표시 */}
                      <AnimatePresence>
                        {isFriedChicken && hoveredVariantId === variant.id && hasDescription && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white shadow-2xl border border-black/5 rounded-xl z-[120] w-48 pointer-events-none"
                          >
                            <p className="text-[10px] font-bold text-black leading-snug">
                              {t(flavorKeys[flavorName])}
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

          {/* 🍗 핑킹 현상 안내 (보내주신 키 그대로 적용) */}
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
    <div className="bg-black text-white min-h-screen font-sans">

        {/* Hero section */}
        <section className="relative h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <ImageWithFallback src={foodIMg} alt="Menu Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
          </div>

          {/* 텍스트와 버튼을 감싸는 컨테이너 */}
          <motion.div className="relative text-center z-10 px-4 flex flex-col items-center gap-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter"
            >
              {t("menu.title")}
            </motion.h1>

            {/* PDF 다운로드 버튼: Home 스타일 애니메이션 적용 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href={menuPDF}
                download="Hankki_Menu.pdf"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white/90 transition-all duration-300 shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <Download size={18} />
                {t("menu.downloadPDF")}
              </a>
            </motion.div>
          </motion.div>
        </section>

      {/* Category Filter */}
      <nav className="sticky top-0 bg-black/90 backdrop-blur-2xl z-40 border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex flex-wrap justify-center gap-4">
            {mainCategories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-3 rounded-xl text-[12px] font-black tracking-widest border transition-all ${selectedCategory === cat ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"}`}>
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center items-center gap-3">
            <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="bg-[#111] border border-white/10 px-5 py-3 rounded-xl text-[12px] font-black tracking-widest outline-none">
              <option value="all">Dietary: All</option>
              <option value="veg">Vegetarian</option>
              <option value="halal">Halal Only</option>
            </select>

            <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="bg-[#111] border border-white/10 px-5 py-3 rounded-xl text-[12px] font-black tracking-widest outline-none">
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
                  className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-all shadow-lg"
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

      {/* Menu Items */}
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

      {/* --- Order Guide Modal*/}
      <AnimatePresence>
        {isOrderGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* 배경 */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOrderGuideOpen(false)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            
            {/* 모달 콘텐츠 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="relative z-10 flex justify-between items-center p-8 pb-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl"><Drumstick size={24} className="text-white" /></div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">How to Order</h2>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">HANKKI Chicken Guide</p>
                  </div>
                </div>
                <button onClick={() => setIsOrderGuideOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all">
                  <X size={28} />
                </button>
              </div>

              <div className="relative z-10 overflow-y-auto px-8 py-4 no-scrollbar flex-grow">
                <div className="grid gap-4 mb-6">
                  
                  {/* Step 1. Style */}
                  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 1. Style</h4>
                    <p className="text-white/80 text-sm font-medium mb-4">Choose your preferred style.</p>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
                        <Drumstick size={20} className="text-orange-500/70" />
                        <span className="text-[10px] text-white font-black uppercase">With Bone</span>
                      </div>
                      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center gap-2">
                        <Utensils size={20} className="text-orange-500/70" />
                        <span className="text-[10px] text-white font-black uppercase">Boneless</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2. Size & Quantity - Style별 맞춤 가이드 */}
<div className="group bg-white/[0.03] border border-white/5 p-6 rounded-[1.5rem] space-y-6">
  <div>
    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 2. Size</h4>
    <p className="text-white/80 text-sm font-medium mb-4">Choose the portion size for your style.</p>
    
    <div className="grid gap-4">
      {/* 1. With Bone Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 opacity-50">
          <Drumstick size={14} className="text-white" />
          <span className="text-[10px] font-black tracking-wider text-white">With Bone Style</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center relative overflow-hidden group/size transition-all hover:border-white/30">
            <div className="text-white/40 font-black text-xs mb-1 ">Medium (M)</div>
            <div className="text-white font-black text-2xl mb-2">5 <span className="text-[10px] opacity-40">pcs</span></div>
            {/* <div className="bg-white/10 rounded-full py-1 text-[8px] text-white/60 font-black ">Standard Snack</div> */}
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center relative overflow-hidden group/size transition-all hover:border-white/30">
            <div className="text-white/40 font-black text-xs mb-1 ">Large (L)</div>
            <div className="text-orange-500 font-black text-2xl mb-2">10 <span className="text-[10px] opacity-60 text-white">pcs</span></div>
            {/* <div className="bg-orange-500/20 rounded-full py-1 text-[8px] text-orange-500 font-black">Full Meal</div> */}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-white/5 w-full" />

      {/* 2. Boneless Section */}
      <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-50">
              <Utensils size={14} className="text-white" />
              <span className="text-[10px] font-black tracking-wider text-white">Boneless Style</span>
            </div>
            <span className="bg-orange-500 text-[8px] font-black px-2 py-0.5 rounded text-white animate-pulse">L Size Only</span>
          </div>
          
          <div className="bg-orange-500/5 rounded-2xl p-5 border border-orange-500/20 flex items-center justify-between relative overflow-hidden group/boneless">
            {/* 장식용 배경 아이콘 */}
            <AlertCircle className="absolute -right-4 -bottom-4 text-orange-500/5 rotate-12" size={80} />
            
            <div className="relative z-10 text-left">
              <div className="text-orange-500 font-black text-3xl mb-1">Large (L)</div>
              <p className="text-[10px] text-white/50 font-bold leading-tight">
                Boneless is exclusively available<br />in Large size only.
              </p>
            </div>
            <div className="relative z-10 text-right">
              <div className="bg-orange-500 text-white px-3 py-2 rounded-xl text-center">
                <div className="text-xs font-black leading-none">10-13</div>
                <div className="text-[8px] font-bold mt-1">Pieces</div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>

                {/* Step 3. Flavor & Selection */}
<div className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem] space-y-6">
  <div>
    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 3. Flavor</h4>
    <p className="text-white/80 text-sm font-medium mb-4">Choose your favorite sauce.</p>
    
    <div className="grid grid-cols-3 gap-2">
      {[
        { name: "Original", color: "bg-yellow-500", heat: 0, key: "Original" },
        { name: "Yangnyeom", color: "bg-red-500", heat: 2, key: "Yangnyeom" },
        { name: "Ganjang", color: "bg-amber-900", heat: 3, key: "Ganjang" }
      ].map((flavor) => (
        <div key={flavor.name} className="bg-white/5 rounded-2xl p-3 border border-white/10 text-center relative group/flavor cursor-help flex flex-col items-center min-h-[100px] justify-center transition-all hover:bg-white/10">

          <div className="mb-3">
            {flavor.heat > 0 ? (
              <div className="flex gap-0.5 justify-center">
                {Array.from({ length: flavor.heat }).map((_, i) => (
                  <Flame key={i} size={12} className="text-orange-500 fill-orange-500" />
                ))}
              </div>
            ) : (
              <div className={`w-2.5 h-2.5 rounded-full mx-auto ${flavor.color} shadow-[0_0_8px_rgba(234,179,8,0.4)]`} />
            )}
          </div>

          <div>
            <span className="text-[10px] text-white font-black  block leading-none">{flavor.name}</span>
            <span className="text-[8px] text-white/20 font-bold mt-1 block  tracking-tight">
              {flavor.heat > 0 ? "Spicy" : "Mild"}
            </span>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white rounded-xl shadow-2xl w-40 opacity-0 group-hover/flavor:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover/flavor:-translate-y-1">
            <p className="text-[10px] text-black font-bold leading-tight text-center">
              {t(`menu.flavor.${flavor.key}.desc`)}
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* 구분선 */}
  <div className="h-px bg-white/5 w-full" />

  {/* Selection Option 섹션 */}
  <div>
    <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Step 4. Selection Option</h4>
    <p className="text-white/80 text-sm font-medium mb-4">How would you like to mix?</p>
    
    <div className="flex gap-2">
      {/* Whole Option */}
      <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center">
        <div className="bg-white/10 p-2 rounded-full mb-3">
          <CheckCircle2 size={18} className="text-white/50" />
        </div>
        <span className="text-[10px] text-white font-black mb-1 uppercase">Whole</span>
        <p className="text-[8px] text-white/30 font-bold leading-tight">
          Choose <span className="text-white/60">1 Flavor</span>
        </p>
      </div>

      {/* Half & Half Option */}
      <div className="flex-1 bg-orange-500/10 rounded-2xl p-4 border border-orange-500/30 flex flex-col items-center text-center relative overflow-hidden">
        <div className="bg-orange-500 p-2 rounded-full mb-3 shadow-lg shadow-orange-500/20">
          <Layers size={18} className="text-white" />
        </div>
        <span className="text-[10px] text-orange-400 font-black mb-1 uppercase">Half & Half</span>
        <p className="text-[8px] text-orange-400/60 font-bold leading-tight">
          Choose <span className="text-orange-400">2 Flavors</span>
        </p>
      </div>
    </div>
  </div>
</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 상세 정보 모달 */}
      <AnimatePresence>
        {selectedDetailItem && <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />}
      </AnimatePresence>
    </div>
  );
}