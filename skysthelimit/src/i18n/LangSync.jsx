import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGS, DEFAULT_LANG, langFromPath, stripLang, withLang } from "./index.js";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function setLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * The URL decides the language ("/en/..." = English). This keeps i18next, <html lang>,
 * the page title/description and the canonical + hreflang links in sync with it.
 * No automatic redirects, so shared links always open in the language they were shared in.
 */
export default function LangSync() {
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();
  const lang = langFromPath(pathname);

  useLayoutEffect(() => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);

  useEffect(() => {
    const origin = window.location.origin;
    const clean = stripLang(pathname);
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    setMeta('meta[name="description"]:not([lang])', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.title"));
    setMeta('meta[property="og:description"]', "content", t("meta.description"));
    setMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_US" : "mk_MK");
    setMeta('meta[property="og:url"]', "content", origin + withLang(clean, lang));
    setLink("canonical", origin + withLang(clean, lang));
    LANGS.forEach((l) => setLink("alternate", origin + withLang(clean, l), l));
    setLink("alternate", origin + withLang(clean, DEFAULT_LANG), "x-default");
  }, [lang, pathname, t]);

  return null;
}
