import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Instagram, Facebook, Map } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
import woltLogo from '../../assets/wolt_logo.png'; 

interface ContactSectionProps {
  isVertical?: boolean;
  showTitle?: boolean; 
}

const ContactSection = ({ isVertical = false, showTitle = true }: ContactSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className={`flex flex-col h-full bg-black ${!isVertical ? 'w-full max-w-7xl mx-auto px-8 py-16' : 'w-full'}`}>
      
      {showTitle && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-16 text-white py-8 tracking-tighter"
        >
          {t("contact.title")}
        </motion.h2>
      )}

      <div className={`flex flex-col gap-12 ${!isVertical ? 'lg:flex-row lg:items-stretch' : 'flex-grow'}`}>
        {/* 연락처 정보 영역 (왼쪽) */}
        <div className={`space-y-10 text-white flex flex-col justify-center ${!isVertical ? 'lg:w-[35%]' : 'w-full'}`}>
          <div className="space-y-8">
            
            {/* Address */}
            <div className="flex items-start gap-5 group">
              <div className="mt-1">
                <MapPin size={22} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">{t("contact.address")}</h3>
                <p className="text-lg text-white font-medium leading-snug">Brabanter Str. 42,<br /> 50672, Köln</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5 group">
              <div className="mt-1">
                <Mail size={22} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">{t("contact.email")}</h3>
                <a href="mailto:info@hankki.de" className="text-lg text-white font-medium hover:text-white/60 transition-colors border-b border-white/10 hover:border-white/40">info@hankki.de</a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5 group">
              <div className="mt-1">
                <Phone size={22} className="text-white/40 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">{t("contact.phone")}</h3>
                <a href="tel:+4922167811694" className="text-lg text-white font-medium hover:text-white/60 transition-colors border-b border-white/10 hover:border-white/40">+49 (0)221 6781 1694</a>
              </div>
            </div>
          </div>

          {/* Social Icons & Wolt */}
          <div className="pt-10 border-t border-white/5 mt-4">
            <div className="flex flex-wrap gap-4 items-center">
              {[
                { Icon: Map, href: "https://maps.app.goo.gl/S2Qu3BGrdBqbHH62A" },
                { Icon: Instagram, href: "https://www.instagram.com/hankki_koeln/" }, // 인스타그램 주소 예시
                { Icon: Facebook, href: "https://www.facebook.com/Hankki.Koeln/" }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ scale: 1.1, y: -2 }} 
                  whileTap={{ scale: 0.95 }} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/40 hover:text-white transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
              
              {/* Wolt 로고 */}
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }} 
                href="https://wolt.com/en/nor/oslo/restaurant/hankki-oslo?srsltid=AfmBOooX8vDN6LGm3mC7IOdH_BG8HRJni8WMpv0uiS2h_vZ8aRPKQnNL"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4"
              >
                <img 
                  src={woltLogo} 
                  alt="Wolt" 
                  className="h-10 w-auto object-contain" 
                />
              </motion.a>
            </div>
          </div>
        </div>

        {/* 지도 영역 (오른쪽) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={`overflow-hidden flex-grow shadow-2xl min-h-[450px] rounded-[3rem] border border-white/10
            ${!isVertical ? 'lg:w-[65%]' : 'w-full'}
          `}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.453261623861!2d6.936669976865207!3d50.9338575524316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25032338531d%3A0x6e8869f0612c3f91!2sBrabanter%20Str.%2042%2C%2050672%20K%C3%B6ln%2C%20Germany!5e0!3m2!1sen!2skr!4v1715600000000!5m2!1sen!2skr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen 
            loading="lazy" 
            title="Hankki Köln Map"
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;