import { useLang } from "../i18n/routing.jsx";

/** Subtle "you save" note. Shows nothing when there are no savings. */
export default function SavingsBadge({ pricing, className = "" }) {
  const { t, money } = useLang();
  const { savings } = pricing;
  if (savings <= 0) return null;

  return (
    <p
      className={`flex items-baseline justify-between gap-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 ${className}`}
    >
      <span>{t("cart.savings")}</span>
      <span className="font-semibold whitespace-nowrap">{money(savings)}</span>
    </p>
  );
}
