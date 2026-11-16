import planners from "../data/planners-data.js";
import collection from "../data/NewCollection.js";
import ProductCard from "./ProductCard.jsx";
import Reveal from "./Reveal.jsx";
import { FiCalendar, FiFeather, FiStar } from "react-icons/fi";
import { useLang } from "../i18n/routing.jsx";

const highlights = [
  { icon: FiCalendar, key: "home.h1" },
  { icon: FiStar, key: "home.h2" },
  { icon: FiFeather, key: "home.h3" },
];

export default function NewCollection() {
  const { t } = useLang();
  const products = collection
    .map((id) => planners.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07142b] via-[#0c1f3f] to-[#081530] py-24 px-4">
      {/* navy glows with a touch of gold */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#1d4e89]/45 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-[#1a5f8f]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 backdrop-blur">
            {t("home.eyebrow")}
          </span>
          <h2 className="font-serif text-5xl sm:text-7xl mt-6 leading-[1.02] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100">
            {t("home.title")}
          </h2>
          <p className="text-white/70 mt-6 leading-relaxed">
            {t("home.text")}
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {highlights.map(({ icon: Icon, key }) => (
              <li
                key={key}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 backdrop-blur"
              >
                <span className="text-amber-300">{Icon({})}</span>
                {t(key)}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} badge={t("badge.new2027")} dark delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
