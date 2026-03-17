import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Mail, Phone, Map, Sparkles, Heart, Users,Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import { Link } from "react-router";
import woltLogo from "../../assets/wolt_logo.png";
import teamImg from "../../assets/teamImg.png";
import hankkiRestaurantImg from "../../assets/hankki_restaurant_img.png";
import kitchenImg from "../../assets/kitchen_img.png";
import hankkiOutsideImg from "../../assets/hankkiOutsideImg.png";
import chickenImg from "../../assets/foodIMGs/Hankki  cover BEST 1.jpg"
import ContactSection from "../components/ContactSection";
import OpeningHours from "../components/OpeningHours";

export function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* 1. Hero Section - 깔끔한 인트로 */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback src={hankkiOutsideImg} alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        </div>
        <motion.div className="relative text-center z-10 px-4">
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            {t("about.title")}
          </motion.h1>
        </motion.div>
      </section>

      {/* 2. Story & Team Section - 하나의 흐름으로 묶음 */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div  
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}>
            <span className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">Since 2020</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-8">{t("about.ourStory")}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">{t("about.storyText")}</p>
          </motion.div>
          <motion.div className="rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-square shadow-2xl">
            <ImageWithFallback src={kitchenImg} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Our Team - 방향 교차 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div className="order-2 lg:order-1 rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-square shadow-2xl">
            <ImageWithFallback src={teamImg} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="order-1 lg:order-2" initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">{t("about.teamTitle")}</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">{t("about.teamText")}</p>
          </motion.div>
        </div>
      </section>

      {/* 3. Hansik Experience Section - 시각적으로 압도적인 섹션 */}
      <section className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hansik Intro */}
          <motion.div initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-8xl sm:text-9xl lg:text-[10rem] font-bold text-white/5 pointer-events-none select-none">Hansik</h2>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">{t("about.hansikTitle")}</h3>
            <p className="text-zinc-400 text-lg">{t("about.hansikText")}</p>
          </motion.div>

          {/* New Content: Chicken & Drinks Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Korean Fried Chicken Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-default"
            >
              <ImageWithFallback src={chickenImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-3xl font-bold mb-4">The Art of Chicken</h4>
                <p className="text-zinc-300">Hankki의 시그니처, 겉바속촉의 정석 한국식 치킨을 경험해보세요.</p>
              </div>
            </motion.div>

            {/* Soju & Makgeolli Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-default"
            >
              <ImageWithFallback src="https://images.unsplash.com/photo-1746439323248-53f4797638cd?..." className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-3xl font-bold mb-4">Soju & Makgeolli</h4>
                <p className="text-zinc-300">부드러운 막걸리와 깔끔한 소주, 한식의 풍미를 완성하는 최고의 조합입니다.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Opening Hours Section with Background Image */}
      <OpeningHours />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}




      {/* 4. Values Section - 아이콘형 레이아웃 */}
      // <section className="py-24 px-4 bg-black">
      //   <div className="max-w-7xl mx-auto">
      //     <div className="grid md:grid-cols-3 gap-12">
      //       {[1, 2, 3].map((i) => (
      //         <div key={i} className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-colors">
      //           <div className="mb-6 text-red-500">
      //             {i === 1 && <Sparkles size={40} />}
      //             {i === 2 && <Heart size={40} />}
      //             {i === 3 && <Users size={40} />}
      //           </div>
      //           <h3 className="text-2xl font-bold mb-4">{t(`about.value${i}Title`)}</h3>
      //           <p className="text-zinc-400 leading-relaxed">{t(`about.value${i}Text`)}</p>
      //         </div>
      //       ))}
      //     </div>
      //   </div>
      // </section>


      // previous version
            {/* Hero Section */}
      // <section className="relative h-[80vh] sm:h-[100vh] overflow-hidden flex items-center justify-center">
      //   <div className="absolute inset-0">
      //     <ImageWithFallback
      //       src={hankkiOutsideImg}
      //       alt="About Us"
      //       className="w-full h-full object-cover"
      //     />
      //     <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
      //       <motion.h1 
      //         initial={{ opacity: 0, y: 20 }}
      //         animate={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.6 }}
      //         className="text-4xl sm:text-5xl lg:text-6xl font-bold"
      //       >
      //         {t("about.title")}
      //       </motion.h1>
      //     </div>
      //   </div>
      // </section>


      {/* Our Story Section */}
      // <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      //   <div className="max-w-7xl mx-auto">
      //     <motion.h2 
      //       initial={{ opacity: 0, y: 20 }}
      //       whileInView={{ opacity: 1, y: 0 }}
      //       transition={{ duration: 0.5 }}
      //       viewport={{ once: true }}
      //       className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
      //     >
      //       {t("about.teamTitle")}
      //     </motion.h2>
      //     <motion.p 
      //       initial={{ opacity: 0, y: 20 }}
      //       whileInView={{ opacity: 1, y: 0 }}
      //       transition={{ duration: 0.5, delay: 0.2 }}
      //       viewport={{ once: true }}
      //       className="text-white/80 text-base sm:text-lg leading-relaxed mb-12 max-w-4xl"
      //     >
      //       {t("about.teamText")}
      //     </motion.p>
      //     <motion.div 
      //       initial={{ opacity: 0, y: 30 }}
      //       whileInView={{ opacity: 1, y: 0 }}
      //       transition={{ duration: 0.6, delay: 0.4 }}
      //       viewport={{ once: true }}
      //       className="rounded-2xl overflow-hidden"
      //     >
      //       <ImageWithFallback
      //         src={teamImg}
      //         alt="Our Story"
      //         className="w-full h-[300px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
      //       />
      //     </motion.div>
      //   </div>
      // </section>

      {/* Hansik Section */}
      // <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900 text-white overflow-hidden">

      //   <div className="max-w-7xl mx-auto relative z-10">
      //     <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      //       {/* Left Content */}
      //       <motion.div 
      //         initial={{ opacity: 0, x: -30 }}
      //         whileInView={{ opacity: 1, x: 0 }}
      //         transition={{ duration: 0.6 }}
      //         viewport={{ once: true }}
      //         className="space-y-6"
      //       >
      //         <h2 className="text-8xl sm:text-9xl lg:text-[10rem] font-bold text-white/5 pointer-events-none select-none">
      //           Hansik
      //         </h2>
      //         <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
      //           {t("about.hansikTitle")}
      //         </h3>
      //         <p className="text-white/70 text-base sm:text-lg leading-relaxed">
      //           {t("about.hansikText")}
      //         </p>
      //       </motion.div>

      //       {/* Right Images Grid */}
      //       <motion.div 
      //         initial={{ opacity: 0, x: 30 }}
      //         whileInView={{ opacity: 1, x: 0 }}
      //         transition={{ duration: 0.6 }}
      //         viewport={{ once: true }}
      //         className="grid grid-cols-2 gap-3 sm:gap-4"
      //       >
      //         <div className="rounded-xl overflow-hidden">
      //           <ImageWithFallback
      //             src="https://images.unsplash.com/photo-1560100927-c32f29063ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzaWRlJTIwZGlzaGVzJTIwYmFuY2hhbiUyMGNvbG9yZnVsJTIwdG9wJTIwdmlld3xlbnwxfHx8fDE3NzMzMTYxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //             alt="Korean Banchan"
      //             className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
      //           />
      //         </div>
      //         <div className="rounded-xl overflow-hidden">
      //           <ImageWithFallback
      //             src="https://images.unsplash.com/photo-1569409611632-b87901f4c74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5ncyUyMGNyaXNweSUyMGdvbGRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzczMzE2MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //             alt="Korean Fried Chicken"
      //             className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
      //           />
      //         </div>
      //         <div className="rounded-xl overflow-hidden col-span-2">
      //           <ImageWithFallback
      //             src="https://images.unsplash.com/photo-1539755530862-00f623c00f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwY291bnRlcnl8ZW58MXx8fHwxNzczMzE2MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //             alt="Korean Table Spread"
      //             className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
      //           />
      //         </div>
      //         <div className="rounded-xl overflow-hidden">
      //           <ImageWithFallback
      //             src="https://images.unsplash.com/photo-1645692396914-4ca9df38cce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBwbGF0ZWQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMzMTYxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //             alt="Korean Food Plating"
      //             className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
      //           />
      //         </div>
      //         <div className="rounded-xl overflow-hidden">
      //           <ImageWithFallback
      //             src="https://images.unsplash.com/photo-1746439323248-53f4797638cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0YWJsZSUyMHNldHRpbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzMxNzIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //             alt="Korean Table Setting"
      //             className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
      //           />
      //         </div>
      //       </motion.div>
      //     </div>
      //   </div>
      // </section>

      {/* Image Gallery Section */}
      // <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      //   <div className="max-w-7xl mx-auto">
      //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.1 }}
      //         viewport={{ once: true }}
      //         className="rounded-2xl overflow-hidden"
      //       >
      //         <ImageWithFallback
      //           src="https://images.unsplash.com/photo-1539755530862-00f623c00f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwY291bnRlcnl8ZW58MXx8fHwxNzczMzE2MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //           alt="Korean Food Spread"
      //           className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
      //         />
      //       </motion.div>
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.2 }}
      //         viewport={{ once: true }}
      //         className="rounded-2xl overflow-hidden"
      //       >
      //         <ImageWithFallback
      //           src="https://images.unsplash.com/photo-1746240085327-c6573979c5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBuZW9uJTIwc2lnbiUyMHJlZHxlbnwxfHx8fDE3NzMzMTYxOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //           alt="Restaurant Interior"
      //           className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
      //         />
      //       </motion.div>
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.3 }}
      //         viewport={{ once: true }}
      //         className="rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1"
      //       >
      //         <ImageWithFallback
      //           src="https://images.unsplash.com/photo-1645692396914-4ca9df38cce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBwbGF0ZWQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMzMTYxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      //           alt="Korean Fried Chicken"
      //           className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
      //         />
      //       </motion.div>
      //     </div>
      //   </div>
      // </section>

      {/* Our Values Section */}
      // <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
      //   <div className="max-w-7xl mx-auto">
      //     <motion.h2 
      //       initial={{ opacity: 0, y: 20 }}
      //       whileInView={{ opacity: 1, y: 0 }}
      //       transition={{ duration: 0.5 }}
      //       viewport={{ once: true }}
      //       className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
      //     >
      //       {t("about.ourValues")}
      //     </motion.h2>
      //     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.1 }}
      //         viewport={{ once: true }}
      //         className="text-center"
      //       >
      //         <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
      //           <Sparkles size={32} />
      //         </div>
      //         <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value1Title")}</h3>
      //         <p className="text-white/70 leading-relaxed">{t("about.value1Text")}</p>
      //       </motion.div>
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.2 }}
      //         viewport={{ once: true }}
      //         className="text-center"
      //       >
      //         <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
      //           <Heart size={32} />
      //         </div>
      //         <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value2Title")}</h3>
      //         <p className="text-white/70 leading-relaxed">{t("about.value2Text")}</p>
      //       </motion.div>
      //       <motion.div 
      //         initial={{ opacity: 0, y: 30 }}
      //         whileInView={{ opacity: 1, y: 0 }}
      //         transition={{ duration: 0.5, delay: 0.3 }}
      //         viewport={{ once: true }}
      //         className="text-center sm:col-span-2 lg:col-span-1"
      //       >
      //         <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
      //           <Users size={32} />
      //         </div>
      //         <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value3Title")}</h3>
      //         <p className="text-white/70 leading-relaxed">{t("about.value3Text")}</p>
      //       </motion.div>
      //     </div>
      //   </div>
      // </section>
      