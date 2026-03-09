import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="Horizon" className="h-8 w-8 object-contain brightness-200" />
              <span className="font-heading text-lg font-bold">Horizon Manpower</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed font-body mb-4">
              {t.nav.licensed}
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/251900000000" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://t.me/horizonmanpower" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t.nav.home}</h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: t.nav.about, path: "/about" },
                { label: t.nav.jobs, path: "/jobs" },
                { label: t.nav.register, path: "/register" },
                { label: t.nav.training, path: "/training" },
                { label: t.nav.status, path: "/status" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="opacity-70 hover:opacity-100 hover:text-gold transition-all">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t.home.countriesTitle}</h4>
            <ul className="space-y-2 font-body text-sm opacity-70">
              <li>🇸🇦 Saudi Arabia</li>
              <li>🇦🇪 United Arab Emirates</li>
              <li>🇶🇦 Qatar</li>
              <li>🇰🇼 Kuwait</li>
              <li>🇴🇲 Oman</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold mb-4">{t.contact.title}</h4>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-start gap-2 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2 opacity-70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+251 111 000 000</span>
              </li>
              <li className="flex items-center gap-2 opacity-70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@horizonmanpower.et</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body opacity-50">
          <span>© {new Date().getFullYear()} Horizon Manpower PLC. All rights reserved.</span>
          <span>{t.nav.licensed}</span>
        </div>
      </div>
    </footer>
  );
}
