import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapPin, Mail, Phone, Map, Sparkles, Heart, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import { Link } from "react-router";

export function About() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1709639681732-41abd75a23a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwZWxlZ2FudCUyMGRhcmslMjBhbWJpYW5jZXxlbnwxfHx8fDE3NzMzMTcyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            >
              {t("about.title")}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8"
          >
            {t("about.ourStory")}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-12 max-w-4xl"
          >
            {t("about.storyText")}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1569409611632-b87901f4c74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5ncyUyMGNyaXNweSUyMGdvbGRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzczMzE2MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Our Story"
              className="w-full h-[300px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Hansik Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900 text-white overflow-hidden">
        {/* Large Background Text with Low Opacity */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h2 className="text-[10rem] sm:text-[15rem] lg:text-[20rem] xl:text-[25rem] font-bold text-white/5 leading-none whitespace-nowrap">
            HANSIK
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {t("about.hansikTitle")}
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                {t("about.hansikText")}
              </p>
            </motion.div>

            {/* Right Images Grid */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560100927-c32f29063ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzaWRlJTIwZGlzaGVzJTIwYmFuY2hhbiUyMGNvbG9yZnVsJTIwdG9wJTIwdmlld3xlbnwxfHx8fDE3NzMzMTYxODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean Banchan"
                  className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1569409611632-b87901f4c74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjB3aW5ncyUyMGNyaXNweSUyMGdvbGRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzczMzE2MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean Fried Chicken"
                  className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden col-span-2">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1539755530862-00f623c00f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwY291bnRlcnl8ZW58MXx8fHwxNzczMzE2MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean Table Spread"
                  className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645692396914-4ca9df38cce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBwbGF0ZWQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMzMTYxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean Food Plating"
                  className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1746439323248-53f4797638cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0YWJsZSUyMHNldHRpbmclMjBlbGVnYW50fGVufDF8fHx8MTc3MzMxNzIyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Korean Table Setting"
                  className="w-full h-[140px] sm:h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1539755530862-00f623c00f52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwY291bnRlcnl8ZW58MXx8fHwxNzczMzE2MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Korean Food Spread"
                className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1746240085327-c6573979c5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBuZW9uJTIwc2lnbiUyMHJlZHxlbnwxfHx8fDE3NzMzMTYxOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Restaurant Interior"
                className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden sm:col-span-2 lg:col-span-1"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1645692396914-4ca9df38cce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmcmllZCUyMGNoaWNrZW4lMjBwbGF0ZWQlMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMzMTYxOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Korean Fried Chicken"
                className="w-full h-[250px] sm:h-[300px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
          >
            {t("about.ourValues")}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value1Title")}</h3>
              <p className="text-white/70 leading-relaxed">{t("about.value1Text")}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value2Title")}</h3>
              <p className="text-white/70 leading-relaxed">{t("about.value2Text")}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{t("about.value3Title")}</h3>
              <p className="text-white/70 leading-relaxed">{t("about.value3Text")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section with Background Image */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image with Low Opacity */}
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
            {t("home.openingHours")}
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
                <Map size={48} className="mx-auto mb-4 text-white/40" />
                <p className="text-white/40">Map Location</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}