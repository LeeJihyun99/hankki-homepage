import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Flame, Leaf, X, ChevronDown, Drumstick, Utensils, Info } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

// 에셋 임포트
import menuPDF from "../../assets/menu.pdf";
import foodIMg from "../../assets/foodIMGs/Hankki_cover_2.jpg";

// 데이터 임포트
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side", "extra"];

const spicinessDesc: Record<number, string> = {
  1: "Mild",
  2: "Medium",
  3: "Hot"
};

// --- 공통 컴포넌트: 태그 ---
const FeatureTag = ({ icon: Icon, label, colorClass, size = "sm" }: any) => (
  <div className={`inline-flex items-center gap-1 rounded-md border ${colorClass} backdrop-blur-sm shadow-sm
    ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    {Icon && <Icon size={size === "sm" ? 10 : 14} />}
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black uppercase tracking-tight`}>
      {label}
    </span>
  </div>
);

const SpicinessTags = ({ count, size = "sm" }: { count: number; size?: "sm" | "md" }) => (
  <div className={`inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-md shadow-sm
    ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Flame key={i} size={size === "sm" ? 10 : 14} className="text-red-500" fill="currentColor" />
      ))}
    </div>
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black text-red-500 uppercase tracking-tight`}>
      {spicinessDesc[count] || "Spicy"}
    </span>
  </div>
);

// --- 메뉴 상세 모달 ---
function DetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { t } = useLanguage();

  // 1. 선택된 variant 상태 관리 (옵션이 있으면 첫 번째 옵션을 기본값으로, 없으면 null)
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );

  // 2. 현재 표시할 데이터 결정 (variant가 선택되었다면 해당 정보를, 아니면 기본 정보를 사용)
  const isVeg = selectedVariant ? selectedVariant.vegetarian : item.vegetarian;
  const isHalal = selectedVariant ? selectedVariant.halal : item.halal;
  const currentAllergens = selectedVariant ? selectedVariant.allergens : item.allergens;
  const currentPrice = selectedVariant?.price || item.price;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-[100] flex justify-end items-end md:items-stretch backdrop-blur-md"
    >
      <motion.div
        initial={{ x: window.innerWidth >= 768 ? "100%" : 0, y: window.innerWidth >= 768 ? 0 : "100%" }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: window.innerWidth >= 768 ? "100%" : 0, y: window.innerWidth >= 768 ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black w-full md:w-[480px] h-[85vh] md:h-screen shadow-2xl overflow-y-auto no-scrollbar relative flex flex-col"
      >
        {/* 닫기 버튼 */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-lg z-30 transition-colors text-white"
        >
          <X size={20} />
        </button>

        {/* 🖼 이미지 영역 */}
        <div className="w-full shrink-0 overflow-hidden bg-gray-100">
          <div className="aspect-[21/10] w-full">
            <ImageWithFallback src={item.image} alt={t(item.nameKey)} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 📝 상세 정보 콘텐츠 영역 */}
        <div className="p-8 md:p-12 flex-grow flex flex-col">
          
          {/* 헤더: 이름 & 가격 */}
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-1 block">Selected Item</span>
              <h4 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">{t(item.nameKey)}</h4>
            </div>
            <p className="text-2xl font-mono font-black text-black">€{currentPrice.toFixed(2)}</p>
          </div>

          {/* ✨ Variant 선택 섹션 (잡채/김치찌개 등 옵션이 있을 때만 노출) */}
          {item.variants && item.variants.length > 0 && (
            <div className="mb-8">
              <h5 className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-4">Select Option</h5>
              <div className="flex flex-wrap gap-2 p-1 bg-black/[0.03] rounded-2xl">
                {item.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black transition-all uppercase tracking-tighter ${
                      selectedVariant?.id === variant.id
                        ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                        : "text-black/40 hover:text-black"
                    }`}
                  >
                    {t(variant.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 특성 태그 (선택된 옵션에 따라 실시간 반영) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {isHalal && <FeatureTag label="Halal" colorClass="bg-blue-50 border-blue-100 text-blue-600" size="md" />}
            {isVeg && <FeatureTag icon={Leaf} label="Vegetarian" colorClass="bg-green-50 border-green-100 text-green-600" size="md" />}
            {item.spiciness > 0 && <SpicinessTags count={item.spiciness} size="md" />}
          </div>

          <div className="space-y-8 flex-grow">
            {/* 메뉴 설명 */}
            <p className="text-black/60 text-sm md:text-base leading-relaxed border-l-2 border-black/10 pl-6">
              {t(item.descKey)}
            </p>
            
            {/* 🍱 Included & Extras Section */}
            {((item.includedKeys?.length ?? 0) > 0 || (item.extraKeys?.length ?? 0) > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-black/5 my-4">
                {item.includedKeys && item.includedKeys.length > 0 && (
                  <div className="flex flex-col">
                    <h5 className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-5">{t("menu.included")}</h5>
                    <ul className="space-y-4">
                      {item.includedKeys.map((key) => (
                        <li key={key} className="flex items-start gap-3 group">
                          <div className="w-1 h-1 rounded-full bg-black/20 mt-2 shrink-0 group-hover:bg-black transition-colors" />
                          <span className="text-sm font-bold text-black/70 leading-tight">{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.extraKeys && item.extraKeys.length > 0 && (
                  <div className="flex flex-col">
                    <h5 className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-5">{t("menu.extra")}</h5>
                    <ul className="space-y-4">
                      {item.extraKeys.map((key) => (
                        <li key={key} className="flex items-start gap-3 group">
                          <div className="w-1 h-1 rounded-full bg-black/20 mt-2 shrink-0 group-hover:bg-black transition-colors" />
                          <span className="text-sm font-bold text-black/70 leading-tight">{t(key)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* ⚠️ Allergen Information (선택된 옵션에 따라 실시간 반영) */}
            {currentAllergens.length > 0 && (
              <div className="pt-8 mt-auto">
                <h5 className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-5">Allergen Information</h5>
                <div className="flex flex-wrap gap-4">
                  {currentAllergens.map((code) => {
                    const allergen = allergensMap[code];
                    const Icon = allergen?.icon;
                    return (
                      <div key={code} className="flex flex-col items-center gap-1.5 group">
                        <div className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center border border-black/5 group-hover:border-black/20 transition-colors">
                          {Icon ? <Icon size={18} className="text-black/40 group-hover:text-black" /> : <span className="text-[10px] font-bold text-black/40">{code}</span>}
                        </div>
                        <span className="text-[9px] font-black text-black/30 uppercase">{code}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
  const [isOrderGuideOpen, setIsOrderGuideOpen] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
    const dietaryMatch = dietaryFilter === "all" || (dietaryFilter === "veg" && item.vegetarian) || (dietaryFilter === "halal" && item.halal);
    const spiceMatch = spicinessFilter === "all" || item.spiciness === parseInt(spicinessFilter);
    return categoryMatch && dietaryMatch && spiceMatch;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback src={foodIMg} alt="Hankki Menu" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative text-center z-10 px-4">
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          >{t("menu.title")}</motion.h1>
          <a href={menuPDF} download className="inline-flex items-center gap-3 mt-4 bg-white text-black px-4 py-3 rounded-full font-black hover:bg-white/90 transition-all transform hover:scale-105 text-xs uppercase tracking-widest shadow-2xl">
            <Download size={18} />
            <span>{t("menu.downloadPDF")}</span>
          </a>
        </motion.div>
      </section>

      {/* Filter Nav */}
      <nav className="sticky top-0 bg-black/90 backdrop-blur-2xl z-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {mainCategories.map((cat) => (
              <button
                key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border
                  ${selectedCategory === cat ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"}`}
              >
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
          
          {/* Filter Options */}
          <div className="flex justify-center items-center gap-4">
            {/* Dietary Filter */}
            <div className="relative">
              <select 
                value={dietaryFilter} 
                onChange={(e) => setDietaryFilter(e.target.value)} 
                className="appearance-none bg-[#111] border border-white/10 pl-5 pr-12 py-3 rounded-xl text-[10px] font-black text-white outline-none cursor-pointer hover:border-white/30 transition-all uppercase tracking-widest"
              >
                <option value="all" className="bg-[#111]">Dietary: All</option>
                <option value="veg" className="bg-[#111]">Vegetarian</option>
                <option value="halal" className="bg-[#111]">Halal Only</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>

            {/* Spiciness Filter */}
            <div className="relative">
              <select 
                value={spicinessFilter} 
                onChange={(e) => setSpicinessFilter(e.target.value)} 
                className="appearance-none bg-[#111] border border-white/10 pl-5 pr-12 py-3 rounded-xl text-[10px] font-black text-white outline-none cursor-pointer hover:border-white/30 transition-all uppercase tracking-widest"
              >
                <option value="all" className="bg-[#111]">Spice: Any</option>
                <option value="0" className="bg-[#111]">Non-Spicy</option>
                <option value="1" className="bg-[#111]">Mild 🔥</option>
                <option value="2" className="bg-[#111]">Medium 🔥🔥</option>
                <option value="3" className="bg-[#111]">Hot 🔥🔥🔥</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>

            {/* Order Guide Button */}
            {selectedCategory === "friedChicken" && (
              <button onClick={() => setIsOrderGuideOpen(true)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20">
                <Info size={16} />
                <span className="text-[10px] font-black uppercase tracking-tighter">Guide</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Grid Area */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout key={item.id}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-[#0f0f0f] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedDetailItem(item)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback src={item.image} alt={t(item.nameKey)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-black text-lg tracking-tighter text-white">{t(item.nameKey)}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.halal && <FeatureTag label="Halal" colorClass="bg-blue-500/10 border-blue-500/20 text-blue-400" />}
                    {item.vegetarian && <FeatureTag icon={Leaf} label="Veg" colorClass="bg-green-500/10 border-green-500/20 text-green-400" />}
                    {item.spiciness > 0 && <SpicinessTags count={item.spiciness} />}
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    {/* <span className="text-sm font-black text-white/90 tracking-tighter">€{item.price.toFixed(2)}</span> */}
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">Details +</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Centralized How to Order Modal */}
      <AnimatePresence>
        {isOrderGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOrderGuideOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="relative z-10 flex justify-between items-center p-8 pb-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl">
                    <Drumstick size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{t("menu.guide.title") || "How to Order"}</h2>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">HANKKI Chicken Guide</p>
                  </div>
                </div>
                <button onClick={() => setIsOrderGuideOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all"><X size={28} /></button>
              </div>

              <div className="relative z-10 overflow-y-auto px-8 py-4 no-scrollbar flex-grow">
                <div className="grid gap-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem]">
                      <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">{t(`menu.guide.step${step}.title`)}</h4>
                      <p className="text-white/80 text-sm font-medium leading-relaxed mb-4">{t(`menu.guide.step${step}.desc`)}</p>

                      {step === 1 && (
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
                      )}

                      {step === 2 && (
                        <div className="flex gap-2">
                          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                            <div className="text-orange-500/70 font-black text-lg mb-1">M</div>
                            <span className="text-[10px] text-white font-black uppercase">Medium</span>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                            <div className="text-orange-500 font-black text-xl mb-1">L</div>
                            <span className="text-[10px] text-white font-black uppercase">Large</span>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="flex gap-2">
                          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                            <div className="w-4 h-4 rounded-full bg-orange-500/30 border border-orange-500/50 mx-auto mb-2" />
                            <span className="text-[10px] text-white font-black uppercase">Whole</span>
                          </div>
                          <div className="flex-1 bg-orange-500/10 rounded-2xl p-4 border border-orange-500/30 text-center">
                            <div className="flex gap-1 justify-center mb-2">
                              <div className="w-4 h-4 rounded-full bg-orange-500" />
                              <div className="w-4 h-4 rounded-full bg-white/20" />
                            </div>
                            <span className="text-[10px] text-orange-400 font-black uppercase">Half & Half</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDetailItem && <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />}
      </AnimatePresence>
    </div>
  );
}
// import { useState } from "react";
// import { ImageWithFallback } from "../components/figma/ImageWithFallback";
// import { 
//   Download, Flame, Leaf, X, ChevronDown
// } from "lucide-react";
// import { useLanguage } from "../context/LanguageContext";
// import { motion, AnimatePresence } from "motion/react";
// import halalIcon from "../../assets/halal.png";
// import menuPDF from "../../assets/menu.pdf";
// import { menuItems, MenuItem } from "../../data/menuItems";
// import { allergensMap } from "../../data/allergens";
// import foodIMg from "../../assets/foodIMGs/Hankki _cover_2.jpg"

// const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side"];

// // 맵기 정도 설명
// const spicinessDesc: Record<number, string> = {
//   0: "Not Spicy",
//   1: "Mild (신라면 정도)",
//   2: "Medium (불닭볶음면 정도)",
//   3: "Hot (아주 매움)"
// };

// function DetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
//   const { t } = useLanguage();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       className="fixed inset-0 bg-black/80 z-50 flex justify-end items-end md:items-stretch"
//     >
//       <motion.div
//         initial={{ y: "100%", x: 0 }}
//         md-initial={{ x: "100%", y: 0 }}
//         animate={{ y: 0, x: 0 }}
//         exit={{ y: "100%", x: "100%" }}
//         transition={{ type: "spring", damping: 25, stiffness: 200 }}
//         onClick={(e) => e.stopPropagation()}
//         className="bg-[#111] text-white w-full md:w-[480px] h-[90vh] md:h-screen rounded-t-[2.5rem] md:rounded-l-[2.5rem] md:rounded-t-none overflow-y-auto relative border-l border-white/10 shadow-2xl"
//       >
//         <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10">
//           <X size={24} />
//         </button>

//         <div className="p-8 md:p-10">
//           <div className="aspect-square overflow-hidden rounded-3xl mb-8 shadow-2xl">
//             <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
//           </div>

//           <div className="mb-6">
//             <h4 className="text-4xl font-bold mb-2 tracking-tight">{item.name}</h4>
//             <div className="flex flex-wrap gap-2">
//               {item.vegetarian && (
//                 <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg">
//                   <Leaf size={14} className="text-green-400" />
//                   <span className="text-[11px] font-bold text-green-400 uppercase">VEG</span>
//                 </div>
//               )}
//               {item.halal && (
//                 <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
//                   <img src={halalIcon} alt="Halal" className="w-4 h-4 invert" />
//                   <span className="text-[11px] font-bold text-blue-400 uppercase">HALAL</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           <p className="text-2xl font-bold text-white/90 mb-6">€{item.price.toFixed(2)}</p>
//           <p className="text-white/60 text-lg leading-relaxed mb-10 border-l-2 border-white/10 pl-4">
//             {t(`menu.items.${item.id}.description`) || item.description}
//           </p>

//           {item.spiciness > 0 && (
//             <div className="mb-10 p-4 bg-white/5 rounded-2xl border border-white/5">
//               <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest block mb-3">Spiciness Level</span>
//               <div className="flex items-center gap-3">
//                 <div className="flex gap-1">
//                   {Array.from({ length: 3 }).map((_, i) => (
//                     <Flame key={i} size={24} className={i < item.spiciness ? "text-red-500" : "text-white/10"} fill={i < item.spiciness ? "currentColor" : "none"} />
//                   ))}
//                 </div>
//                 <span className="text-sm font-medium text-red-400">{spicinessDesc[item.spiciness]}</span>
//               </div>
//             </div>
//           )}

//           {item.allergens.length > 0 && (
//             <div className="pt-8 border-t border-white/10">
//               <h5 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-6">Allergen Information</h5>
//               <div className="grid grid-cols-4 gap-4">
//                 {item.allergens.map((code) => {
//                   const allergen = allergensMap[code];
//                   const Icon = allergen?.icon;
//                   return (
//                     <div key={code} className="flex flex-col items-center gap-3">
//                       <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors">
//                         {Icon ? <Icon size={24} className="text-white/80" /> : <span className="text-xs font-bold text-white/40">{code}</span>}
//                       </div>
//                       <span className="text-[9px] text-white/40 text-center font-bold uppercase">{allergen?.label || code}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export function Menu() {
//   const { t } = useLanguage();
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [dietaryFilter, setDietaryFilter] = useState("all");
//   const [spicinessFilter, setSpicinessFilter] = useState<string>("all");
//   const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);

//   const filteredItems = menuItems.filter((item) => {
//     const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
//     const dietaryMatch = dietaryFilter === "all" || (dietaryFilter === "veg" && item.vegetarian) || (dietaryFilter === "halal" && item.halal);
//     const spiceMatch = spicinessFilter === "all" || item.spiciness === parseInt(spicinessFilter);
//     return categoryMatch && dietaryMatch && spiceMatch;
//   });

//   return (
//     <div className="min-h-screen bg-black text-white">
//             {/* Menu Image */}
//             <section className="relative h-screen flex items-center justify-center">
//               {/* Image Container */}
//               <div className="absolute inset-0">
//                 <ImageWithFallback src={foodIMg} alt="About Us" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
//               </div>
//               {/* Menu Content */}
//               <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//               className="relative text-center z-10 px-4">
//                 {/* Menu Title */}
//                 <motion.h1 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10"
//                 >
//                   {t("menu.title")}
//                 </motion.h1 >
//                 {/* Download Button */}
//                 <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//                 <a href={menuPDF} download 
//                   className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
//                 <Download size={20} />
//                 <span>{t("menu.downloadPDF")}</span>
//                 </a>
//                 </motion.div>
//               </motion.div>
//             </section>

//       {/* Filter Navigation */}
//       <nav className="sticky top-0 bg-black/95 backdrop-blur-xl z-40 border-y border-white/10">
//         <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
//           <div className="flex justify-start md:justify-center gap-3 py-5">
//             {mainCategories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
//                   selectedCategory === cat ? "bg-white text-black" : "text-white/40 hover:text-white hover:bg-white/5"
//                 }`}
//               >
//                 {t(`menu.categories.${cat}`) || cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Dietary Filter */}
//         <div className="bg-white/5 py-4 px-6 border-t border-white/5">
//           <div className="max-w-7xl mx-auto flex justify-center gap-4">
//             <div className="relative">
//               <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="appearance-none bg-black border border-white/10 pl-5 pr-12 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-white/40">
//                 <option value="all">ALL DIETARY</option>
//                 <option value="veg">VEGETARIAN</option>
//                 <option value="halal">HALAL ONLY</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
//             </div>

//             <div className="relative">
//               <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="appearance-none bg-black border border-white/10 pl-5 pr-12 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer outline-none focus:border-white/40">
//                 <option value="all">ANY SPICE</option>
//                 <option value="0">NON-SPICY (0)</option>
//                 <option value="1">MILD (1)</option>
//                 <option value="2">MEDIUM (2)</option>
//                 <option value="3">SPICY (3)</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Menu Items */}
//       <section className="py-16 px-6 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           <AnimatePresence mode="popLayout">
//             {filteredItems.map((item) => (
//               // 각 메뉴 아이템 카드
//               <motion.div
//                 layout
//                 key={item.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="group cursor-pointer"
//                 onClick={() => setSelectedDetailItem(item)}
//               >
//                 <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/5 transition-all duration-500 group-hover:border-white/20 relative shadow-xl">
//                   <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
//                 </div>

//                 <div className="pt-6 px-2">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="text-2xl font-bold tracking-tight">{item.name}</h3>
//                     <span className="font-mono text-lg text-white/60">€{item.price}</span>
//                   </div>

//                   {/* Dietary Tags */}
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {/* Halal Tag - 새로 추가된 부분 */}
//                     {item.halal && (
//                       <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-md">
//                         <span className="text-[9px] font-black text-blue-400 uppercase">HALAL</span>
//                       </div>
//                     )}
//                     {/* Vegetarian Tag */}
//                     {item.vegetarian && (
//                       <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md">
//                         <Leaf size={12} className="text-green-400" />
//                         <span className="text-[9px] font-black text-green-400 uppercase">VEG</span>
//                       </div>
//                     )}
//                     {item.spiciness > 0 && (
//                       <div className="relative group/tooltip flex items-center gap-1 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded-md">
//                         <div className="flex">
//                           {Array.from({ length: item.spiciness }).map((_, i) => (
//                             <Flame key={i} size={12} className="text-red-500" fill="currentColor" />
//                           ))}
//                         </div>
//                         {/* 맵기 설명 툴팁 (Mouse Hover) */}
//                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-black text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
//                           {spicinessDesc[item.spiciness]}
//                           <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
//                     {t(`menu.items.${item.id}.description`) || item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </section>

//       <AnimatePresence>
//         {selectedDetailItem && <DetailModal item={selectedDetailItem} onClose={() => setSelectedDetailItem(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// }