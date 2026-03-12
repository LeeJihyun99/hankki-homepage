import { Link } from "react-router";
import { MapPin, Mail, Phone, Facebook, Instagram, ChevronLeft, ChevronRight, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage from "../assets/6c35f0f7124035f09deb108d08f6dbfffe20b903.png";
import { useState } from "react";

const menuItems = [
  {
    name: "home.menu.item1.name",
    description: "home.menu.item1.desc",
    image: "https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBjcmlzcHklMjBnb2xkZW58ZW4xfHx8fDE3NzI5MzI3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "home.menu.item2.name",
    description: "home.menu.item2.desc",
    image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwd2luZ3MlMjBzcGljeSUyMHNhdWNlfGVufDF8fHx8MTc3MjkzMjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "home.menu.item3.name",
    description: "home.menu.item3.desc",
    image: "https://images.unsplash.com/photo-1747228469031-c5fc60b9d9f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBjcmlzcHklMjBnb2xkZW58ZW4xfHx8fDE3NzI5MzI3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
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
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black"
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
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Carousel */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <Slider {...sliderSettings}>
                {menuItems.map((item, index) => (
                  <div key={index} className="relative h-[400px] sm:h-[500px]">
                    <ImageWithFallback
                      src={item.image}
                      alt={t(item.name)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>

            {/* Content Card */}
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Chicken
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                {t(menuItems[currentSlide].description)}
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-lg"
              >
                <span>Go to menu</span>
                <ChevronRight size={24} />
              </Link>
            </motion.div>
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
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="max-w-7xl mx-auto">
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
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 mt-1" size={20} />
                <p className="text-white/80">Brabanter Str. 42, 50672, Köln</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="flex-shrink-0" size={20} />
                <a href="mailto:hankki.koeln@gmail.com" className="text-white/80 hover:text-white">
                  hankki.koeln@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="flex-shrink-0" size={20} />
                <a href="tel:+4922167811694" className="text-white/80 hover:text-white">
                  +49 (0)221 6781 1694
                </a>
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Google Maps"
                >
                  <Map size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <Link
                to="/contact"
                className="inline-block border border-white px-8 py-3 text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300 mt-8"
              >
                Make a reservation
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-2xl overflow-hidden h-64 lg:h-full min-h-[300px] flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 text-white/40" />
                <p className="text-white/40">Map Location</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}