import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import mk from "./mk.js";
import en from "./en.js";

export const LANGS = ["mk", "en"];
export const DEFAULT_LANG = "mk";

/** Language is taken from the URL: "/en/..." is English, everything else Macedonian. */
export function langFromPath(pathname) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LANG;
}

/** Remove the language prefix: "/en/cart" -> "/cart", "/en" -> "/". */
export function stripLang(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

/** Add the language prefix to an internal path. */
export function withLang(path, lang) {
  if (typeof path !== "string" || !path.startsWith("/")) return path;
  const clean = stripLang(path);
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

i18n.use(initReactI18next).init({
  resources: { mk: { translation: mk }, en: { translation: en } },
  lng: typeof window !== "undefined" ? langFromPath(window.location.pathname) : DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
