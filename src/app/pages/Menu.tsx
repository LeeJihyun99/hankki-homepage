import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Download, Flame, Leaf, X, ChevronDown, Drumstick, Utensils, Info, Layers, Split } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";

// 에셋 임포트
import halalIcon from "../../assets/halal.png";
import menuPDF from "../../assets/menu.pdf";
import foodIMg from "../../assets/foodIMGs/Hankki_cover_2.jpg";

// 데이터 임포트
import { menuItems, MenuItem } from "../../data/menuItems";
import { allergensMap } from "../../data/allergens";

const mainCategories = ["all", "stew", "soup", "bulgogi", "chicken", "friedChicken", "noodle", "bibimbap", "streetfood", "pancake", "side"];

const spicinessDesc: Record<number, string> = {
  1: "Mild",
  2: "Medium",
  3: "Hot"
};

// --- 공통 컴포넌트: 글자가 포함된 태그 ---
const FeatureTag = ({ icon: Icon, label, colorClass, imgIcon, size = "sm" }: any) => (
  <div className={`inline-flex items-center gap-1 rounded-md border ${colorClass} backdrop-blur-sm shadow-sm
    ${size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1"}`}>
    {imgIcon ? (
      <img src={imgIcon} className={`${size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} invert opacity-90`} alt="" />
    ) : (
      Icon && <Icon size={size === "sm" ? 10 : 14} />
    )}
    <span className={`${size === "sm" ? "text-[9px]" : "text-[11px]"} font-black uppercase tracking-tight`}>
      {label}
    </span>
  </div>
);

// --- 공통 컴포넌트: 맵기 아이콘 ---
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 z-50 flex justify-end items-end md:items-stretch backdrop-blur-sm"
    >
      <motion.div
        initial={{ x: "100%", y: "100%" }}
        animate={{ x: 0, y: 0 }}
        exit={{ 
          x: window.innerWidth >= 768 ? "100%" : 0, 
          y: window.innerWidth >= 768 ? 0 : "100%" 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black w-full md:w-[480px] h-[90vh] md:h-screen rounded-t-2xl md:rounded-t-none md:rounded-l-2xl shadow-2xl overflow-y-auto no-scrollbar relative flex flex-col"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-lg z-30 transition-colors text-white border border-white/10">
          <X size={20} />
        </button>
        <div className="w-full shrink-0 overflow-hidden bg-gray-100">
          <div className="aspect-[21/10] md:aspect-[21/11] w-full">
            <ImageWithFallback src={item.image} alt={t(item.nameKey)} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="p-6 md:p-10 flex-grow text-black">
          <div className="flex justify-between items-start gap-4 mb-5">
            <div>
              <span className="text-[9px] font-black text-black/30 uppercase tracking-[0.2em] mb-1 block">Selected Item</span>
              <h4 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight text-black">{t(item.nameKey)}</h4>
            </div>
            <p className="text-xl font-mono font-black text-black">€{item.price.toFixed(2)}</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {item.halal && <FeatureTag label="Halal" colorClass="bg-blue-50 border-blue-100 text-blue-600" size="md" />}
            {item.vegetarian && <FeatureTag icon={Leaf} label="Vegetarian" colorClass="bg-green-50 border-green-100 text-green-600" size="md" />}
            {item.spiciness > 0 && <SpicinessTags count={item.spiciness} size="md" />}
          </div>
          <div className="space-y-8">
            <p className="text-black/60 text-sm md:text-base leading-relaxed border-l-2 border-black/10 pl-5">{t(item.descKey)}</p>
            {((item.includedKeys && item.includedKeys.length > 0) || (item.extraKeys && item.extraKeys.length > 0)) && (
              <div className="flex flex-col gap-4 p-5 border-black/5">
                {item.includedKeys && item.includedKeys.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider block">Included</span>
                    <div className="space-y-1.5">
                      {item.includedKeys.map((key) => (
                        <div key={key} className="flex items-center gap-2 text-xs font-bold text-black/70">
                          <div className="w-1 h-1 rounded-full bg-blue-400" />
                          {t(key)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item.extraKeys && item.extraKeys.length > 0 && (
                  <div className={`space-y-2 ${item.includedKeys?.length ? "pt-3 border-t border-black/[0.05]" : ""}`}>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider block">Extras</span>
                    <div className="space-y-1.5">
                      {item.extraKeys.map((key) => (
                        <div key={key} className="flex items-center gap-2 text-xs font-bold text-black/70">
                          <div className="w-1 h-1 rounded-full bg-orange-400" />
                          {t(key)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {item.allergens.length > 0 && (
              <div className="pt-8 border-t border-black/5">
                <h5 className="text-[10px] font-black text-black/20 uppercase tracking-[0.2em] mb-5">Allergen Information</h5>
                <div className="grid grid-cols-5 gap-3">
                  {item.allergens.map((code) => {
                    const allergen = allergensMap[code];
                    const Icon = allergen?.icon;
                    return (
                      <div key={code} className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-black/[0.02] flex items-center justify-center border border-black/5">
                          {Icon ? <Icon size={18} className="text-black/40" /> : <span className="text-[10px] font-bold text-black/40">{code}</span>}
                        </div>
                        <span className="text-[9px] font-black text-black/20 uppercase">{code}</span>
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden flex items-center justify-center px-8">
        <div className="absolute inset-0">
          <ImageWithFallback src={foodIMg} alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative text-center z-10 px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10">
            {t("menu.title")}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <a href={menuPDF} download className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm">
              <Download size={20} />
              <span>{t("menu.downloadPDF")}</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Filter Nav */}
      <nav className="sticky top-0 bg-black/90 backdrop-blur-2xl z-40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {mainCategories.map((cat) => (
              <button
                key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border
                  ${selectedCategory === cat ? "bg-white text-black border-white" : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white"}`}
              >
                {t(`menu.categories.${cat}`) || cat}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-3">
            <div className="relative">
              <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="appearance-none bg-white/5 border border-white/10 pl-4 pr-10 py-2.5 rounded-xl text-[10px] font-black outline-none cursor-pointer hover:bg-white/10 transition-colors">
                <option value="all">DIETARY: ALL</option>
                <option value="veg">VEGETARIAN</option>
                <option value="halal">HALAL ONLY</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>
            <div className="relative">
              <select value={spicinessFilter} onChange={(e) => setSpicinessFilter(e.target.value)} className="appearance-none bg-white/5 border border-white/10 pl-4 pr-10 py-2.5 rounded-xl text-[10px] font-black outline-none cursor-pointer hover:bg-white/10 transition-colors">
                <option value="all">SPICE: ANY</option>
                <option value="0">NON-SPICY</option>
                <option value="1">MILD</option>
                <option value="2">MEDIUM</option>
                <option value="3">HOT</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
            </div>

            {/* 🆕 How to Order Guide Button */}
            {selectedCategory === "friedChicken" && (
              <div className="relative group ml-1">
                <button
                  onClick={() => setIsOrderGuideOpen(true)}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20"
                >
                  <Info size={14} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Guide</span>
                </button>
                
                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 hidden group-hover:block z-50">
                  <div className="bg-white text-black text-[10px] font-bold px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap animate-bounce">
                    {t("menu.guide.hover") || "Explore how to order HANKKI Chicken"}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Grid Area */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout key={item.id}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="group flex flex-col bg-[#0f0f0f] rounded-xl border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedDetailItem(item)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback src={item.image} alt={t(item.nameKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <h3 className="font-black text-base md:text-lg leading-tight tracking-tighter text-white">{t(item.nameKey)}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.halal && <FeatureTag label="Halal" colorClass="bg-blue-500/10 border-blue-500/20 text-blue-400" size="sm" />}
                    {item.vegetarian && <FeatureTag icon={Leaf} label="Veg" colorClass="bg-green-500/10 border-green-500/20 text-green-400" size="sm" />}
                    {item.spiciness > 0 && <SpicinessTags count={item.spiciness} size="sm" />}
                  </div>
                  <p className="text-[11px] md:text-xs text-white/40 line-clamp-2 leading-relaxed font-medium min-h-[2.8em]">{t(item.descKey)}</p>
                  <div className="flex justify-end border-t border-white/5 pt-3 mt-auto">
                    <span className="text-sm font-black text-white/90 tracking-tighter">€{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Centralized How to Order Modal --- */}
      <AnimatePresence>
        {isOrderGuideOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOrderGuideOpen(false)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* 장식용 배경 광원 */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

              {/* 1. Header (고정) */}
              <div className="relative z-10 flex justify-between items-center p-8 pb-4 bg-[#0f0f0f]">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                    <Drumstick size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-none">
                      {t("menu.guide.title") || "How to Order"}
                    </h2>
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">HANKKI Chicken Guide</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOrderGuideOpen(false)} 
                  className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all"
                >
                  <X size={28} />
                </button>
              </div>

              {/* 2. Scrollable Content (내부 스크롤) */}
              <div className="relative z-10 overflow-y-auto px-8 py-4 no-scrollbar flex-grow">
                <div className="grid gap-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="group bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem] hover:bg-white/[0.05] transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest">
                          {t(`menu.guide.step${step}.title`)}
                        </h4>
                        {step === 3 && (
                          <span className="text-[8px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-black uppercase">Important</span>
                        )}
                      </div>
                      <p className="text-white/80 text-sm font-medium leading-relaxed">
                        {t(`menu.guide.step${step}.desc`)}
                      </p>

                      {/* Step 3 시각적 옵션 박스 */}
                      {step === 3 && (
                        <div className="flex gap-2 mt-4">
                          <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                            <span className="block text-[8px] text-white/40 font-bold uppercase mb-1">Single</span>
                            <span className="text-[10px] text-white font-black">Whole</span>
                          </div>
                          <div className="flex-1 bg-orange-500/10 rounded-xl p-3 border border-orange-500/20 text-center">
                            <span className="block text-[8px] text-orange-500 font-bold uppercase mb-1">Popular</span>
                            <span className="text-[10px] text-orange-400 font-black">Half & Half</span>
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