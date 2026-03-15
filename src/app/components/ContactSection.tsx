import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Facebook, Map } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import woltLogo from '../../assets/wolt_logo.png';

interface ContactSectionProps {
  isVertical?: boolean;
}

const ContactSection = ({ isVertical = false }: ContactSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col h-full ${!isVertical ? 'w-full max-w-7xl mx-auto px-8 py-16' : 'w-full'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        // mb-12에서 mb-8로 줄여 제목과 내용 사이 간격을 좁혔습니다.
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-white"
      >
        {t("contact.title")}
      </motion.h2>

      <div className={`flex flex-col gap-8 ${!isVertical ? 'lg:flex-row lg:items-stretch' : 'flex-grow'}`}>
        {/* 연락처 정보 영역 */}
        <div className={`space-y-6 text-white flex flex-col justify-center ${!isVertical ? 'lg:w-[35%]' : 'w-full'}`}>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl"><MapPin size={24} /></div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.address")}</h3>
                <p className="text-white/70">Brabanter Str. 42, 50672, Köln</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.email")}</h3>
                <a href="mailto:info@hankki.de" className="text-white/70 hover:text-white">info@hankki.de</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl"><Phone size={24} /></div>
              <div>
                <h3 className="font-bold mb-1">{t("contact.phone")}</h3>
                <a href="tel:+4922167811694" className="text-white/70 hover:text-white">+49 (0)221 6781 1694</a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-2">
            <h3 className="font-bold mb-4">{t("contact.followUs")}</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {[Map, Instagram, Facebook].map((Icon, i) => (
                <motion.a key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
                  <Icon size={24} />
                </motion.a>
              ))}
              <motion.a whileHover={{ scale: 1.05 }} href="#" className="ml-2">
                <img src={woltLogo} alt="Wolt" className="h-10 w-auto" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* 지도 영역 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`bg-white/5 rounded-3xl overflow-hidden border border-white/10 flex-grow shadow-2xl 
    w-full h-[350px] 
    ${!isVertical 
      ? 'lg:w-[65%] lg:min-h-[500px]' 
      : 'lg:w-full lg:h-full'
    }`}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.128165013073!2d6.935327411211493!3d50.93984277157165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25e57e8646d7%3A0xea23383b1a644651!2sHankki%20K%C3%B6ln!5e0!3m2!1sen!2sde!4v1773606804908!5m2!1sen!2sde" 
            width="100%" height="100%" style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy" title="Hankki Map"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;