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
        <div className="w-full px-8 sm:px-8 md:px-8 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 max-w-none">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logoIMG} alt="Hankki" className="h-10 sm:h-14" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
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
                    <div className="absolute right-0 mt-2 bg-black border border-white/20 rounded-2xl overflow-hidden shadow-xl z-20">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLanguageDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-6 py-3 text-sm transition-colors ${
                            language === lang.code
                              ? "bg-white text-black"
                              : "text-white hover:bg-white/10"
                          }`}
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
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm tracking-wider ${
                    isActive(link.path)
                      ? "text-white"
                      : "text-white/60"
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
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-full transition-colors ${
                          language === lang.code
                            ? "bg-white text-black"
                            : "text-white/60 hover:bg-white/10"
                        }`}
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
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}