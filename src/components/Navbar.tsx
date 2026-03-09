import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, Globe } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { lang, t, setLang } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const langOptions = [
    { code: "en" as const, label: "English" },
    { code: "am" as const, label: "አማርኛ" },
    { code: "ar" as const, label: "العربية" },
  ];

  const navLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.jobs, path: "/jobs" },
    { label: t.nav.training, path: "/training" },
    { label: t.nav.register, path: "/register" },
    { label: t.nav.status, path: "/status" },
    { label: t.nav.contact, path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-primary-foreground font-body">
          <span>{t.nav.licensed}</span>
          <div className="hidden sm:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 hover:text-gold transition-colors font-medium"
                aria-label="Change language"
              >
                <Globe className="w-3 h-3" />
                {langOptions.find(l => l.code === lang)?.label}
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1 right-0 bg-card border border-border rounded-md shadow-lg z-50 min-w-[120px]">
                  {langOptions.filter(l => l.code !== lang).map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className="block w-full text-left px-3 py-1.5 text-xs text-foreground hover:bg-accent/10 transition-colors"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="https://wa.me/251900000000" className="flex items-center gap-1 hover:text-gold transition-colors">
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <a href="tel:+251111000000" className="flex items-center gap-1 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" /> +251 111 000 000
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container-wide flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="Horizon Manpower" className="h-10 w-10 object-contain" />
          <div>
            <span className="font-heading text-lg font-bold text-primary leading-none block">Horizon Manpower</span>
            <span className="text-xs text-muted-foreground font-body">International Employment Agency</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 text-sm font-medium font-body rounded-md transition-colors ${
                location.pathname === l.path
                  ? "text-accent bg-accent/10"
                  : "text-foreground hover:text-accent hover:bg-accent/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/employer" className="btn-gold ml-3 text-xs py-2 px-5">
            {t.nav.forEmployers}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle navigation"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-card animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {/* Language selector for mobile */}
            {langOptions.filter(l => l.code !== lang).map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium font-body rounded-md text-accent w-full"
              >
                <Globe className="w-4 h-4" />
                {l.label}
              </button>
            ))}
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium font-body rounded-md transition-colors ${
                  location.pathname === l.path
                    ? "text-accent bg-accent/10"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/employer" onClick={() => setOpen(false)} className="btn-gold w-full mt-3 text-xs py-2.5">
              {t.nav.forEmployers}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
