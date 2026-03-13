import { useState } from "react";
import { MapPin, Mail, Phone, Facebook, Instagram, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import woltLogo from "../../assets/wolt_logo.png";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Reservation submitted:", formData);
    alert("Thank you for your reservation! We will contact you shortly.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBjaGlja2VuJTIwd2luZ3MlMjBzcGljeSUyMHNhdWNlfGVufDF8fHx8MTc3MjkzMjc0Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            >
              {t("contact.title")}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Contact & Reservation Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-8 sm:px- lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">{t("Contact")}</h2>
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

            </motion.div>

            {/* Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                {t("contact.reservation")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.phoneNumber")} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder={t("contact.phonePlaceholder")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.emailAddress")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("contact.numberOfGuests")} *
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors [&>option]:bg-black [&>option]:text-white"
                    >
                      <option value="" disabled>
                        {t("contact.selectGuests")}
                      </option>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? t("contact.guest") : t("contact.guestsPlural")}
                        </option>
                      ))}
                      <option value="7+">7+ {t("contact.guestsPlural")}</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium mb-2"
                    >
                      {t("contact.date")} *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium mb-2"
                  >
                    {t("contact.time")} *
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors [&>option]:bg-black [&>option]:text-white"
                  >
                    <option value="" disabled>
                      {t("contact.selectTime")}
                    </option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="21:30">9:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:00">11:00 PM</option>
                    <option value="23:30">11:30 PM</option>
                  </select>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-4 rounded-full hover:bg-white/90 transition-colors"
                >
                  {t("contact.submit")}
                </motion.button>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="text-sm text-white/60 text-center"
                >
                  {t("contact.required")}
                </motion.p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative py-16 sm:py-20 border-t border-white/10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTczNDQxMjU2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Restaurant ambiance"
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
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
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
              <span className="text-lg font-medium">{t("days.monday")}</span>
              <span className="text-white/70">{t("home.closed")}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium">{t("days.tuesday")} - {t("days.friday")}</span>
              <div className="text-right">
                <p className="text-white/90">5:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">({t("home.kitchenUntil")} 10:30 PM)</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium">{t("days.saturday")}</span>
              <div className="text-right">
                <p className="text-white/90">12:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">({t("home.kitchenUntil")} 10:30 PM)</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-between items-center border-b border-white/20 pb-4"
            >
              <span className="text-lg font-medium">{t("days.sunday")}</span>
              <div className="text-right">
                <p className="text-white/90">12:00 PM - 12:00 AM</p>
                <p className="text-sm text-white/60">({t("home.kitchenUntil")} 10:00 PM)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}


