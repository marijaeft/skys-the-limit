import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGS } from "../i18n/index.js";
import { useLang, useSwitchLangPath } from "../i18n/routing.jsx";

/** МК | EN toggle. Keeps the visitor on the same page in the other language. */
export default function LanguageSwitcher({ className = "", onSwitch }) {
  const { t, lang } = useLang();
  const { i18n } = useTranslation();
  const pathFor = useSwitchLangPath();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`inline-flex items-center rounded-full bg-stone-100 p-1 text-xs font-semibold ${className}`}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            to={pathFor(l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : t("lang.switchTo")}
            onClick={() => {
              // switch the language before the new page renders, so it renders in the right language
              if (i18n.language !== l) i18n.changeLanguage(l);
              onSwitch?.();
            }}
            className={`rounded-full px-3 py-1.5 transition ${
              active ? "bg-navy-950 text-white shadow-sm" : "text-stone-500 hover:text-navy-950"
            }`}
          >
            {t(`lang.${l}`)}
          </Link>
        );
      })}
    </div>
  );
}
