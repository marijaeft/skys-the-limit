import { forwardRef, useCallback } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate as useRouterNavigate,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { withLang, stripLang } from "./index.js";
import productsEn from "./products-en.js";

/**
 * Language helpers for components:
 * - t: translate a key
 * - lang: "mk" | "en"
 * - lp(path): add the language prefix to an internal path
 * - money(n): formatted price ("1.090 ден" / "1,090 MKD")
 * - loc(product): product with translated title/subtitle/characteristics/content
 */
export function useLang() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "mk";

  const lp = useCallback((path) => withLang(path, lang), [lang]);

  const money = useCallback(
    (n) =>
      lang === "en"
        ? `${Number(n).toLocaleString("en-US")} MKD`
        : `${Number(n).toLocaleString("mk-MK")} ден`,
    [lang]
  );

  const loc = useCallback(
    (p) => {
      if (!p || lang === "mk") return p;
      const tr = productsEn[p.id];
      return tr ? { ...p, ...tr } : p;
    },
    [lang]
  );

  return { t, lang, lp, money, loc };
}

/** Same as react-router's Link, but keeps the current language. */
export const Link = forwardRef(function Link({ to, ...props }, ref) {
  const { lp } = useLang();
  return <RouterLink ref={ref} to={lp(to)} {...props} />;
});

/** Same as react-router's NavLink, but keeps the current language. */
export const NavLink = forwardRef(function NavLink({ to, ...props }, ref) {
  const { lp } = useLang();
  return <RouterNavLink ref={ref} to={lp(to)} {...props} />;
});

/** Same as react-router's useNavigate, but keeps the current language. */
export function useNavigate() {
  const navigate = useRouterNavigate();
  const { lp } = useLang();
  return useCallback((to, options) => navigate(typeof to === "string" ? lp(to) : to, options), [navigate, lp]);
}

/** Path of the current page in another language (for the language switcher). */
export function useSwitchLangPath() {
  const { pathname, search, hash } = useLocation();
  return (lang) => withLang(stripLang(pathname), lang) + search + hash;
}
