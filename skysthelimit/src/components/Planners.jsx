import Reveal from "./Reveal.jsx";
import planners from "../data/planners-data.js";
import { sortForDisplay } from "../data/displayOrder.js";
import ProductCard from "./ProductCard.jsx";
import { useLang } from "../i18n/routing.jsx";

export default function Planners() {
  const { t } = useLang();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-20">
      <Reveal className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{t("shop.plannersEyebrow")}</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">{t("shop.plannersTitle")}</h1>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortForDisplay(planners).map((planner, i) => (
          <ProductCard delay={(i % 4) * 90}
            key={planner.id}
            product={planner}
            badge={planner.collection === 2027 ? t("badge.new2027") : undefined}
          />
        ))}
      </div>
    </section>
  );
}
