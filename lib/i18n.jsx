import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate } from "@/lib/translations";

const STORAGE_KEY = "mw-lang";
const LanguageContext = createContext({ lang: "de", setLang: () => {} });

function readInitialLang() {
  if (typeof window === "undefined") return "de";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "de";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const { lang, setLang } = useContext(LanguageContext);
  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);
  return { lang, setLang, t };
}