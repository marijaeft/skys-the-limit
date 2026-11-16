import Reveal from "./Reveal.jsx";
import planners from "../data/planners-data.js";
import popular from "../data/MostPopular.js";
import ProductCard from "./ProductCard.jsx";
import { useLang } from "../i18n/routing.jsx";

export default function MostPopular() {
  const { t } = useLang();
  const popularPlanners = planners.filter((planner) => popular.includes(planner.id));

  return (
    <section className="py-20 px-4">
      <Reveal className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{t("home.popularEyebrow")}</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">{t("home.popularTitle")}</h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {popularPlanners.map((p, i) => (
          <ProductCard delay={(i % 4) * 90} key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
