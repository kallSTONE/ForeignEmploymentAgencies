import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingContactWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const { t, isRtl } = useLanguage();

  const quickLinksPosition = isRtl ? "right-3 md:right-5" : "left-3 md:left-5";
  const quickLinksMobilePosition = isRtl ? "right-4" : "left-4";
  const chatPosition = isRtl ? "left-4 md:left-6" : "right-4 md:right-6";

  return (
    <>
      <aside
        className={`fixed ${quickLinksMobilePosition} bottom-4 z-50 md:hidden flex items-center gap-2 rounded-full border border-border bg-card/95 backdrop-blur px-2 py-2 shadow-xl`}
        aria-label={t.common.quickContacts}
      >
        <Link
          to="/contact"
          className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.visitContactPage}
          title={t.common.visitContactPage}
        >
          <Mail className="w-4 h-4" />
        </Link>

        <a
          href="https://wa.me/251900000000"
          className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.writeWhatsApp}
          title={t.common.writeWhatsApp}
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <a
          href="tel:+251111000000"
          className="w-9 h-9 rounded-full bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.callNow}
          title={t.common.callNow}
        >
          <Phone className="w-4 h-4" />
        </a>
      </aside>

      <aside className={`fixed ${quickLinksPosition} top-[45%] -translate-y-1/2 z-40 hidden md:flex flex-col overflow-hidden rounded-xl shadow-lg border border-border`}>
        <Link
          to="/contact"
          className="w-12 h-12 bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.visitContactPage}
          title={t.common.visitContactPage}
        >
          <Mail className="w-5 h-5" />
        </Link>

        <a
          href="https://wa.me/251900000000"
          className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.writeWhatsApp}
          title={t.common.writeWhatsApp}
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <a
          href="tel:+251111000000"
          className="w-12 h-12 bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center transition-colors"
          aria-label={t.common.callNow}
          title={t.common.callNow}
        >
          <Phone className="w-5 h-5" />
        </a>
      </aside>

      <div className={`fixed ${chatPosition} bottom-4 md:bottom-6 z-50`}>
        {chatOpen && (
          <div className="w-[300px] max-w-[calc(100vw-2rem)] mb-3 rounded-xl border border-border bg-card shadow-2xl overflow-hidden animate-fade-in">
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-semibold">{t.common.chatTitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label={t.common.closeChat}
                className="text-primary-foreground/90 hover:text-primary-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 py-3">
              <p className="text-sm font-semibold font-body text-foreground mb-1">{t.common.chatGreeting}</p>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{t.common.chatPrompt}</p>

              <div className="mt-4 space-y-2">
                <Link to="/contact" className="block text-center text-sm bg-secondary hover:bg-secondary/80 text-foreground rounded-md px-3 py-2 transition-colors font-body">
                  {t.common.visitContactPage}
                </Link>
                <a href="https://wa.me/251900000000" className="block text-center text-sm bg-accent text-accent-foreground rounded-md px-3 py-2 hover:opacity-90 transition-opacity font-body">
                  {t.common.writeWhatsApp}
                </a>
                <a href="tel:+251111000000" className="block text-center text-sm border border-border rounded-md px-3 py-2 hover:bg-secondary transition-colors font-body">
                  {t.common.callNow}
                </a>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl flex items-center justify-center transition-colors"
          aria-label={chatOpen ? t.common.closeChat : t.common.openChat}
          title={chatOpen ? t.common.closeChat : t.common.openChat}
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}
