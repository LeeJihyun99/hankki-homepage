import { Link } from "react-router";
import { MapPin, Mail, Phone, Facebook, Instagram, ChevronLeft, ChevronRight, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import menuIMG1 from "../../assets/home_menu_section_items/home_menu_chickenwithbeer.png";
import menuIMG2 from "../../assets/home_menu_section_items/home_menu_budaejjigae_soju.png";
import menuIMG3 from "../../assets/home_menu_section_items/home_menu_pancakewithmakgeoli.png";
import woltLogo from "../../assets/wolt_logo.png";

const menuItems = [
  {
    name: "Chicken & Beer (Chimaek)",
    description: "Crunchy, golden-fried Korean chicken paired with a refreshing ice-cold Cass beer—the ultimate soul food combo.",
    image: menuIMG1,
  },
  {
    name: "Budae Jjigae & Soju",
    description: "A hearty, spicy army base stew loaded with ham, sausage, and ramen, perfectly complemented by a smooth shot of Soju.",
    image: menuIMG2,
  },
  {
    name: "Seafood Pancake & Makgeolli",
    description: "Crispy Haemul Pajeon bursting with fresh seafood, traditionally enjoyed with a bowl of sweet and tangy milky rice wine.",
    image: menuIMG3,
  },
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
      aria-label="Next"
    >
      <ChevronRight size={24} className="text-white" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
      aria-label="Previous"
    >
      <ChevronLeft size={24} className="text-white" />
    </button>
  );
}

export function Home() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    // dots: false,
    // dotsClass: "slick-dots custom-dots-left",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // arrows: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);

    },
  };

  return (
    <div>
      {/* Hero Section - Simplified */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/85"></div>
        
        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 tracking-wider"
          >
            HANKKI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl mb-8 text-white/90"
          >
            Experience authentic korean flavours in the heart of Cologne
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/menu"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go to menu
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <Link to="/about" className="block">
            <div className="text-center space-y-6 cursor-pointer group">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              >
                About Us
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
              >
                {t("home.aboutText")}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1569409611632-b87901f4c74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5ncyUyMGNyaXNweSUyMGdvbGRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzczMzE2MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="About Hankki"
                  className="w-full h-[250px] sm:h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>
          </Link>
        </div>
      </motion.section>

      {/* Menu Section - Carousel with Content Side by Side */}
      {/* Menu Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-8 sm:px-16 lg:px-24 bg-black overflow-hidden" 
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
          >
            Menu
          </motion.h2>
          
          <div className="relative"> {/* Container for outside arrows */}
            <Slider {...sliderSettings}>
              {menuItems.map((item, index) => (
                <div key={index} className="outline-none">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4">
                    {/* Image Column */}
                    <div className="rounded-2xl overflow-hidden h-[300px] sm:h-[450px]">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Text Column - Now slides with the image */}
                    <div className="space-y-6">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                        {item.description}
                      </p>
                      <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-lg font-medium"
                      >
                        <span>View full menu</span>
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </motion.section>

      {/* Opening Hours Section - Image Background */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Opening Hours Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
          >
            Opening Hours
          </motion.h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Monday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium text-white">{t("days.monday")}</span>
              <span className="text-white/70">{t("home.closed")}</span>
            </motion.div>
            {/* Tuesday - Friday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium text-white">{t("days.tuesday")} - {t("days.friday")}</span>
              <div className="text-right">
                <p className="text-white/90">5:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">(Kitchen until 10:30 PM)</p>
              </div>
            </motion.div>
            {/* Saturday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium text-white">{t("days.saturday")}</span>
              <div className="text-right">
                <p className="text-white/90">12:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">(Kitchen until 10:30 PM)</p>
              </div>
            </motion.div>
            {/* Sunday */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium text-white">{t("days.sunday")}</span>
              <div className="text-right">
                <p className="text-white/90">12:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">(Kitchen until 10:00 PM)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-8 sm:px-8 lg:px-8 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          {/* Contact Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16"
          >
            Contact
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 mb-8">
                {/* Address */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("contact.address")}</h3>
                    <p className="text-white/70">Brabanter Str. 42, 50672, Köln</p>
                  </div>
                </motion.div>
                {/* Email */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("contact.email")}</h3>
                    <a
                      href="mailto:info@hankki.de"
                      className="text-white/70 hover:text-white"
                    >
                       info@hankki.de
                    </a>
                  </div>
                </motion.div>
                {/* Phone */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("contact.phone")}</h3>
                    <a
                      href="tel:+4922167811694"
                      className="text-white/70 hover:text-white"
                    >
                      +49 (0)221 6781 1694
                    </a>
                  </div>
                </motion.div>
              </div>
              {/* Social Media */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <h3 className="font-semibold mb-4">{t("contact.followUs")}</h3>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://maps.app.goo.gl/dormANvFEaFrd4PF9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors"
                    aria-label="Google Maps"
                  >
                    <Map size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.instagram.com/hankki.koeln/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://www.facebook.com/Hankki.Koeln/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </motion.a>
                </div>
              </motion.div>
              {/* Wolt Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }} // social media보다 약간 늦게 나오도록 delay 조정
                viewport={{ once: true }}
                className="mt-8" // social media 세션과의 간격 조정
              >
                {/* <h3 className="font-semibold mb-4">{t("contact.orderOnWolt")}</h3> 번역 키 추가 필요 */}
                <motion.a
                  whileHover={{ scale: 1.05 }} // 호버 시 살짝 커지는 효과
                  whileTap={{ scale: 0.95 }}
                  href="https://wolt.com/ko/deu/cologne/restaurant/hankki" // Hankki Wolt 상점 주소로 수정해주세요
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label="Order on Wolt"
                >
                  <img src={woltLogo} alt="Wolt" className="h-14 w-auto" /> {/* 로고 높이 조정 */}
                </motion.a>
              </motion.div>
              {/* Reservation Link */}
              <Link
                to="/contact"
                className="inline-block border border-white px-8 py-3 text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300 mt-8"
              >
                Make a reservation
              </Link>
            
            </motion.div>
            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 w-full h-[400px] lg:h-full min-h-[400px]"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2514.123456789!2d6.9385!3d50.9389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf250000000001%3A0x000000000000000!2zQnJhYmFudGVyIFN0ci4gNDIsIDUwNjcyIEvDtmxuLCBHZXJtYW55!5e0!3m2!1sko!2sde!4v1710000000000!5m2!1sko!2sde" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} // 이 부분을 수정했습니다!
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Hankki Köln Map"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
