import { useState, useMemo } from "react";
import { MapPin, Mail, Phone, Facebook, Instagram, Map } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";
import woltLogo from "../../assets/wolt_logo.png";
import Swal from 'sweetalert2';
import ContactSection from "../components/ContactSection";
import OpeningHours from "../components/OpeningHours";
import hankkiOutsideImg from "../../assets/hankkiOutsideImg.png";

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    note: "", // Note 필드 추가
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 날짜 제한: 오늘 이전 및 오늘 날짜 선택 방지 (내일부터 가능)
  const minDate = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  }, []);

  // 영업시간 데이터에 따른 타임 슬롯 생성 로직
  const getTimeSlots = () => {
    if (!formData.date) return [];
    
    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay(); // 0: 일, 1: 월, 2: 화...

    if (day === 1) return []; // 월요일 휴무

    const slots = [];
    // 화-토: 5:00 PM 시작 / 일: 12:00 PM 시작
    let startHour = (day >= 2 && day <= 5) ? 17 : 12;
    // 주방 마감 시간 기준 (화-토 10:30 PM, 일 10:00 PM)
    let endHour = (day === 0) ? 22 : 22.5; 

    for (let h = startHour; h <= Math.floor(endHour); h++) {
      for (let m of ["00", "30"]) {
        if (h === 22 && m === "30" && day === 0) break; // 일요일 10:30 제외
        const timeValue = `${h}:${m}`;
        const displayTime = h >= 12 
          ? `${h === 12 ? 12 : h - 12}:${m} PM` 
          : `${h}:${m} AM`;
        slots.push({ value: timeValue, label: displayTime });
      }
    }
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SCRIPT_WEB_APP_URL;
  console.log("google sheet url", GOOGLE_SHEET_URL);

  try {
    // 1. 구글 시트로 데이터 전송
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // 2. 성공 알림창 (SweetAlert2)
    Swal.fire({
      text: t("contact.submitAlert"),
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#000000',
      background: '#1a1a1a',
      color: '#ffffff',
      customClass: {
        popup: 'rounded-3xl'
      }
    });

    // 3. 전송 성공 시 폼 초기화
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
      note: "",
    });

  } catch (error) {
    console.error("Submission error:", error);
    // 에러 발생 시 알림
    Swal.fire({
      title: 'Error',
      text: 'Something went wrong. Please try again or call us.',
      icon: 'error',
      confirmButtonColor: '#000000',
      background: '#1a1a1a',
      color: '#ffffff',
    });
  } finally {
    setIsSubmitting(false); // 로딩 종료
  }
};

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Reservation submitted:", formData);
    
  //   // 요청하신 영어 성공 메시지
  //   Swal.fire({
  //   text: t("contact.submitAlert"),
  //   icon: 'success',
  //   confirmButtonText: 'OK',
  //   confirmButtonColor: '#000000', // 버튼 색상을 브랜드 컬러인 블랙으로 변경
  //   background: '#1a1a1a', // 다크 모드 배경
  //   color: '#ffffff'
  // });
    
  //   // 폼 초기화
  //   setFormData({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     guests: "",
  //     date: "",
  //     time: "",
  //     note: "",
  //   });
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
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
            {t("contact.title")}
          </motion.h1>
        </motion.div>
      </section>

      {/* Contact & Reservation Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left: Contact Info & Map */}
            <div className="flex flex-col h-full">
              <ContactSection isVertical={true} />
            </div>

            {/* Right: Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col h-full"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">{t("contact.reservation")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">{t("contact.name")} *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40" placeholder={t("contact.namePlaceholder")} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">{t("contact.phoneNumber")} *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40" placeholder={t("contact.phonePlaceholder")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">{t("contact.emailAddress")} *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40" placeholder={t("contact.emailPlaceholder")} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">{t("contact.numberOfGuests")} *</label>
                      <select name="guests" value={formData.guests} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none [&>option]:bg-black">
                        <option value="" disabled>{t("contact.selectGuests")}</option>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? t("contact.guest") : t("contact.guestsPlural")}</option>
                        ))}
                        <option value="7+">7+ {t("contact.guestsPlural")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">{t("contact.date")} *</label>
                      <input type="date" name="date" min={minDate} value={formData.date} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none [&::-webkit-calendar-picker-indicator]:invert" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">{t("contact.time")} *</label>
                    <select name="time" value={formData.time} onChange={handleChange} required disabled={!formData.date} className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none [&>option]:bg-black">
                      <option value="" disabled>{!formData.date ? "Select date first" : t("contact.selectTime")}</option>
                      {getTimeSlots().map(slot => (
                        <option key={slot.value} value={slot.value}>{slot.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Special Notes</label>
                    <textarea name="note" value={formData.note} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/40 resize-none" placeholder="Allergies, special occasions, etc." />
                  </div>
                </div>

                <div className="mt-8">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-white text-black font-bold py-4 rounded-full transition-colors">
                    {t("contact.submit")}
                  </motion.button>

                  <div className="text-center mt-4 space-y-2">
                    <p className="text-red-500 font-bold text-sm">{t("contact.alert")}</p>
                    <p className="text-xs text-white/60">{t("contact.required")}</p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours Section*/}
      <OpeningHours />
    </div>
  );
}



