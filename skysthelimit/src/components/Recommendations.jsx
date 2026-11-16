import Reveal from "./Reveal.jsx";
import { useMemo } from "react";
import planners from "../data/planners-data.js";
import cards from "../data/cards-data.js";
import ProductCard from "./ProductCard.jsx";
import { useLang } from "../i18n/routing.jsx";

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Random „Можеби ќе ти се допадне и…“ picks shown under every product.
 * Mostly planners/combos, plus one greeting card as a small add-on.
 */
export default function Recommendations({ excludeId, count = 4 }) {
  const { t } = useLang();
  const picks = useMemo(() => {
    const main = shuffle(planners.filter((p) => p.id !== excludeId));
    const card = shuffle(cards.filter((c) => c.id !== excludeId))[0];
    const chosen = main.slice(0, card ? count - 1 : count);
    if (card) chosen.splice(Math.floor(Math.random() * (chosen.length + 1)), 0, { ...card, isCard: true });
    return chosen;
  }, [excludeId, count]);

  return (
    <section className="mt-24">
      <Reveal className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">{t("shop.recoEyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-2">{t("shop.recoTitle")}</h2>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {picks.map((p, i) => (
          <ProductCard compact delay={(i % 4) * 90}
            key={p.id}
            product={p}
            to={p.isCard ? `/card/${p.id}` : undefined}
            badge={p.collection === 2027 ? t("badge.new") : undefined}
          />
        ))}
      </div>
    </section>
  );
}
