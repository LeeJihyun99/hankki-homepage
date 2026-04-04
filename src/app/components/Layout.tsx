import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, Twitter, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import logoIMG from "../../assets/hankki_logo.png";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [leftHero, setLeftHero] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Check if we've scrolled past the hero section (assuming hero is about 70vh)
      const heroHeight = window.innerHeight * 0.7;
      setLeftHero(scrollPosition > heroHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll states when navigating to non-home pages
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      setLeftHero(true);
    } else {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      const heroHeight = window.innerHeight * 0.7;
      setLeftHero(scrollPosition > heroHeight - 80);
    }
  }, [isHomePage]);

  const navLinks = [
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.menu"), path: "/menu" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const languages = [
    { code: "en" as const, label: "EN" },
    { code: "de" as const, label: "DE" },
    { code: "kr" as const, label: "KR" },
  ];

  const currentLanguageLabel = languages.find(l => l.code === language)?.label || "EN";

  const navbarBg = isHomePage && !leftHero 
    ? "bg-transparent" 
    : "bg-black/90 backdrop-blur-sm";

  const navbarShadow = scrolled ? "shadow-lg" : "";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg} ${navbarShadow} ${!isHomePage || leftHero ? 'border-b border-white/10' : ''}`}>
        {/* 컨테이너: max-w를 설정하고 mx-auto로 중앙 정렬하여 로고가 너무 벽에 붙지 않게 조절 */}
        <div className="max-w-9xl mx-auto px-6 sm:px-10 lg:px-18">
          <div className="flex justify-between items-center h-20 sm:h-28 md:h-28">
            
            {/* Logo: h-단위를 키워 더 크게 표시 */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center group">
              <img 
                src={logoIMG} 
                alt="Hankki" 
                className="
                h-12                 /* 기본 모바일 (0~639px) */
                sm:h-16              /* 소형 태블릿 (640px~767px) */
                md:h-18              /* 태블릿/노트북 (768px~1023px) */
                lg:h-18 
                object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`text-sm tracking-wider transition-colors ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                {currentLanguageLabel}
                <ChevronDown size={16} />
              </button>
              
              {languageDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setLanguageDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 bg-black border border-white/20 rounded-2xl overflow-hidden shadow-xl z-20 min-w-[120px]">
                    {/* 현재 선택된 언어를 제외하고 렌더링 */}
                    {languages
                      .filter((lang) => lang.code !== language) 
                      .map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageDropdownOpen(false);
                          }}
                          className="block w-full text-left px-6 py-3 text-sm text-white hover:bg-white/10 transition-colors"
                        >
                          {lang.label}
                        </button>
                      ))}
                  </div>
                </>
              )}
            </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

      {/* Mobile Navigation */}
        {mobileMenuOpen && (    
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 animate-in fade-in slide-in-from-top-4">
            <div className="px-8 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-lg tracking-widest ${
                    isActive(link.path) ? "text-white font-bold" : "text-white/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 w-full bg-white rounded-full px-4 py-2 text-black text-sm font-medium"
              >
                {currentLanguageLabel}
                <ChevronDown size={16} />
              </button>
              
              {languageDropdownOpen && (
                <div className="mt-2 space-y-2">
                  {/* 현재 언어를 제외한 나머지 언어만 표시 */}
                  {languages
                    .filter((lang) => lang.code !== language)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageDropdownOpen(false);
                          setMobileMenuOpen(false); // 언어 변경 후 메뉴 닫기
                        }}
                        className="block w-full text-left px-4 py-2 text-sm rounded-full text-white/60 hover:bg-white/10 transition-colors"
                      >
                        {lang.label}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </nav>

      {/* Main Content */}
      <main className={isHomePage ? "" : "pt-16 sm:pt-20"}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm text-center sm:text-left">
              <p>Hankki</p>
              <p className="text-xs mt-1">{t("footer.tagline")}</p>
            </div>
            <div className="flex gap-4">
Impressum
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}