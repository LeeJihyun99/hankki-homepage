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
import alcoholImg from "../../assets/alcohol.png";

export function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* 1. Hero Section - 깔끔한 인트로 */}
      <section className="relative h-[50vh] flex items-center justify-center">
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
      <section className="bg-black py-16"> {/* py-32에서 py-16으로 변경 */}
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
              <ImageWithFallback src={alcoholImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
