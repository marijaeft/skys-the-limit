import Reveal from "./Reveal.jsx";
import planners from "../data/planners-data.js";
import { sortForDisplay } from "../data/displayOrder.js";
import { BUNDLE_TIERS } from "../data/pricing.js";
import ProductCard from "./ProductCard.jsx";
import { Link, useLang } from "../i18n/routing.jsx";
import { FiArrowRight } from "react-icons/fi";

export default function DiscountedItems() {
  const { t } = useLang();
  const discounted = sortForDisplay(planners.filter((planner) => planner.sale === true));

  // nothing on sale: point people to the combo discount instead of an empty page
  if (discounted.length === 0) {
    return (
      <section className="w-full max-w-3xl mx-auto px-4 pt-28 sm:pt-32 pb-20 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">{t("shop.saleEyebrow")}</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">{t("shop.saleEmptyTitle")}</h1>
          <p className="text-stone-600 mt-4 text-lg">{t("shop.saleEmptyText")}</p>
          <ol className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {BUNDLE_TIERS.map((tier, i) => (
              <li key={tier.min} className="rounded-2xl bg-white ring-1 ring-stone-200 px-2 py-3">
                <p className="text-2xl font-bold text-navy-950">−{tier.pct}%</p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {i === BUNDLE_TIERS.length - 1
                    ? t("combo.tierPlus", { count: tier.min })
                    : t("combo.tier", { count: tier.min })}
                </p>
              </li>
            ))}
          </ol>
          <Link
            to="/gifts"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-950 hover:bg-navy-900 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-navy-950/25 transition active:scale-[0.97]"
          >
            {t("shop.saleEmptyButton")}
            <FiArrowRight className="text-amber-300 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-20">
      <Reveal className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-600">{t("shop.saleEyebrow")}</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">{t("shop.saleTitle")}</h1>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounted.map((p, i) => (
          <ProductCard delay={(i % 4) * 90} key={p.id} product={p} badge={p.collection === 2027 ? t("badge.new2027") : undefined} />
        ))}
      </div>
    </section>
  );
}
