import Reveal from "./Reveal.jsx";
import planners from "../data/planners-data.js";
import { sortForDisplay } from "../data/displayOrder.js";
import ProductCard from "./ProductCard.jsx";
import { useLang } from "../i18n/routing.jsx";

export default function DiscountedItems() {
  const { t } = useLang();
  const discounted = sortForDisplay(planners.filter((planner) => planner.sale === true));

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
