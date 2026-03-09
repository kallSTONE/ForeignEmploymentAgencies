import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { en } from "@/translations/en";
import { am } from "@/translations/am";
import { ar } from "@/translations/ar";

type Lang = "en" | "am" | "ar";
type Translations = typeof en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Lang, Translations> = { en, am, ar };
const rtlLangs: Lang[] = ["ar"];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "en"
  );

  const isRtl = rtlLangs.includes(lang);

  const setLang = useCallback((next: Lang) => {
    localStorage.setItem("lang", next);
    setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
