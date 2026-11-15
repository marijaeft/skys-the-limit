import Reveal from "./Reveal.jsx";
import planners from "../data/planners-data.js";
import ProductCard from "./ProductCard.jsx";

export default function Planners() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-20">
      <Reveal className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Продавница</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">Планери и дневници</h1>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {planners.slice().reverse().map((planner, i) => (
          <ProductCard delay={(i % 4) * 90}
            key={planner.id}
            product={planner}
            image={planner.collection === 2027 ? planner.cardImage : planner.images[0]}
            badge={planner.collection === 2027 ? "Ново 2027" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
