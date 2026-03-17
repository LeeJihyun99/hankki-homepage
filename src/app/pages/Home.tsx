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
import hankkiRestaurantIMG from "../../assets/hankki_restaurant_img.png";
import ContactSection from '../components/ContactSection';
import OpeningHours from "../components/OpeningHours";

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
      <section className="relative h-screen overflow-hidden flex items-center justify-center px-8">
        <div className="absolute inset-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black"></div>
        </div>
        
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
              onClick={() => window.scrollTo(0, 0)}
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
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black border-t"
      >
        {/* About Us Content */}
        <div className="max-w-7xl mx-auto px-8">
          <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="block">
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
                  src={hankkiRestaurantIMG}
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
                        onClick={() => window.scrollTo(0, 0)}
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
      <OpeningHours />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
