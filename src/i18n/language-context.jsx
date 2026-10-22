import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import strings from "./strings";

// why: one pattern for all copy — UI strings live in strings.js, content that
// differs per language lives in constants.js as { en, sv } and is read with
// tr(). A small context replaces an i18n library: two languages, no plurals
// beyond what the string functions handle.

const KEY = "portfolio-lang";
const SUPPORTED = ["en", "sv"];

const LanguageContext = createContext(null);

// Order: ?lang= link param, then the visitor's saved choice, then the browser
// language. Each read is guarded (storage can throw in private mode).
const initialLanguage = () => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED.includes(fromUrl)) return fromUrl;
  } catch {
    /* ignore */
  }
  try {
    const saved = window.localStorage.getItem(KEY);
    if (SUPPORTED.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  try {
    if ((navigator.language || "").toLowerCase().startsWith("sv")) return "sv";
  } catch {
    /* ignore */
  }
  return "en";
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // why: only an explicit choice is saved — opening a shared ?lang=sv link
  // should not overwrite the visitor's own stored preference.
  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* non-essential preference */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: strings[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
