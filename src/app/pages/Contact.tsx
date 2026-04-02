import { useState, useMemo } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import Swal from 'sweetalert2';
import ContactSection from "../components/ContactSection";
import OpeningHours from "../components/OpeningHours";
import hankkiOutsideImg from "../../assets/hankkiOutsideImg.png";

// 모드 타입 정의
type FormMode = "new" | "cancel" | "change";

export function Contact() {
  const { t } = useLanguage();
  
  // 모드 상태: 'new' (신규), 'cancel' (취소), 'change' (변경)
  const [mode, setMode] = useState<FormMode>("new");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
    note: "",
    resId: "", // 취소 및 변경 시 필요한 고유 ID
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 오늘 이후부터 예약 가능하도록 설정
  const minDate = useMemo(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  }, []);

  // 시간대 생성 로직
  const getTimeSlots = () => {
    if (!formData.date) return [];
    const selectedDate = new Date(formData.date);
    const day = selectedDate.getDay();
    if (day === 1) return []; // 월요일 휴무
    const slots = [];
    let startHour = (day >= 2 && day <= 5) ? 17 : 12;
    let endHour = (day === 0) ? 22 : 22.5; 
    for (let h = startHour; h <= Math.floor(endHour); h++) {
      for (let m of ["00", "30"]) {
        if (h === 22 && m === "30" && day === 0) break;
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

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // CORS 에러 방지를 위해 추가
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ ...formData, mode }),
      });

      // 모드에 따른 알림 텍스트 설정
      let successTitle = mode === "new" ? "Request Sent" : mode === "change" ? "Change Requested" : "Cancelled";
      let successText = mode === "new" 
        ? "We have received your request. Please check your email!" 
        : "Your request has been processed. Please check your email!";

      // --- 블랙 & 화이트 스타일 적용 ---
      Swal.fire({
        title: `<span style="color: white; font-weight: bold;">${successTitle}</span>`,
        html: `<span style="color: rgba(255,255,255,0.8);">${successText}</span>`,
        icon: 'success',
        iconColor: '#ffffff', // 아이콘도 화이트로
        background: '#000000', // 배경은 블랙
        confirmButtonText: 'OK',
        confirmButtonColor: '#ffffff', // 버튼 배경은 화이트
        buttonsStyling: false,
        customClass: {
          confirmButton: 'px-10 py-2 rounded-full font-bold text-black transition-opacity hover:opacity-80', // 버튼 텍스트는 블랙
          popup: 'rounded-3xl border border-white/20', // 팝업 테두리에 살짝 화이트 라인
        }
      });

      setFormData({
        name: "", email: "", phone: "", guests: "", date: "", time: "", note: "", resId: "",
      });

    } catch (error) {
      console.error("Submission error:", error);
      
      // 에러 발생 시에도 블랙/화이트 유지
      Swal.fire({
        title: '<span style="color: white;">Error</span>',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        iconColor: '#ff4444', // 에러는 식별을 위해 약간의 레드만 섞거나 화이트(#ffffff)로 통일 가능
        background: '#000000',
        confirmButtonColor: '#ffffff',
        customClass: {
          confirmButton: 'px-10 py-2 rounded-full font-bold text-black'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback src={hankkiOutsideImg} alt="Contact Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black"></div>
        </div>
        <motion.div className="relative text-center z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
          >
            {t("contact.title")}
          </motion.h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Info */}
            <ContactSection isVertical={true} showTitle={false}/>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">
                {mode === "new" ? t("contact.reservation") : mode === "cancel" ? "Cancel Reservation" : "Change Reservation"}
              </h2>

              {/* Mode Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button onClick={() => setMode("new")} className={`flex-1 py-3 px-2 rounded-xl font-bold transition-all text-sm ${mode === "new" ? "bg-white text-black" : "bg-white/5 text-white/60"}`}>
                  New Booking
                </button>
                <button onClick={() => setMode("change")} className={`flex-1 py-3 px-2 rounded-xl font-bold transition-all text-sm ${mode === "change" ? "bg-amber-600 text-white" : "bg-white/5 text-white/60"}`}>
                  Change
                </button>
                <button onClick={() => setMode("cancel")} className={`flex-1 py-3 px-2 rounded-xl font-bold transition-all text-sm ${mode === "cancel" ? "bg-red-600 text-white" : "bg-white/5 text-white/60"}`}>
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Cancel 모드일 때만 다른 폼을 보여줌 */}
                  {mode === "cancel" ? (
                    <motion.div key="cancel-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Reservation ID *</label>
                        <input type="text" name="resId" value={formData.resId} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:border-red-500/50 outline-none" placeholder="RES123456" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">{t("contact.emailAddress")} *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:border-red-500/50 outline-none" placeholder={t("contact.emailPlaceholder")} />
                      </div>
                    </motion.div>
                  ) : (
                    /* New 및 Change 모드는 입력 필드 공유 */
                    <motion.div key="booking-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      {mode === "change" && (
                        <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-2xl">
                          <label className="block text-sm font-medium mb-2 text-amber-500">Current Reservation ID *</label>
                          <input type="text" name="resId" value={formData.resId} onChange={handleChange} required className="w-full bg-black/40 border border-amber-600/50 rounded-xl px-4 py-3 text-white outline-none" placeholder="Enter ID to change" />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">{t("contact.name")} *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none" placeholder={t("contact.namePlaceholder")} />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">{t("contact.phoneNumber")} *</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none" placeholder={t("contact.phonePlaceholder")} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">{t("contact.emailAddress")} *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none" placeholder={t("contact.emailPlaceholder")} />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">{t("contact.numberOfGuests")} *</label>
                          <select name="guests" value={formData.guests} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none [&>option]:bg-black">
                            <option value="" disabled>{t("contact.selectGuests")}</option>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? t("contact.guest") : t("contact.guestsPlural")}</option>
                            ))}
                            <option value="7+">7+ {t("contact.guestsPlural")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">{t("contact.date")} *</label>
                          <input type="date" name="date" min={minDate} value={formData.date} onChange={handleChange} required className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none [&::-webkit-calendar-picker-indicator]:invert" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">{t("contact.time")} *</label>
                        <select name="time" value={formData.time} onChange={handleChange} required disabled={!formData.date} className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none [&>option]:bg-black">
                          <option value="" disabled>{!formData.date ? "Select date first" : t("contact.selectTime")}</option>
                          {getTimeSlots().map(slot => (
                            <option key={slot.value} value={slot.value}>{slot.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Special Notes</label>
                        <textarea name="note" value={formData.note} onChange={handleChange} rows={3} className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white outline-none resize-none" placeholder="Allergies, special occasions, etc." />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} 
                    type="submit" disabled={isSubmitting}
                    className={`w-full font-bold py-4 rounded-full transition-colors ${
                      mode === "new" ? "bg-white text-black" : 
                      mode === "change" ? "bg-amber-600 text-white" : "bg-red-600 text-white"
                    } ${isSubmitting ? "opacity-50" : ""}`}
                  >
                    {isSubmitting ? "Sending..." : mode === "new" ? t("contact.submit") : mode === "change" ? "Request Change" : "Cancel Reservation"}
                  </motion.button>

                  <div className="text-center mt-4 space-y-2">
                    {mode === "new" && <p className="text-red-500 font-bold text-sm">{t("contact.alert")}</p>}
                    <p className="text-xs text-white/40">{t("contact.required")}</p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <OpeningHours />
    </div>
  );
}




