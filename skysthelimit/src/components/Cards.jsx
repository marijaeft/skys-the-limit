import cards from "../data/cards-data.js";
import ProductCard from "./ProductCard.jsx";
import Reveal from "./Reveal.jsx";

export default function Cards() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 pt-28 sm:pt-32 pb-20">
            <Reveal className="text-center mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Честитки</p>
                <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mt-3">Кажи го со честитка</h1>
                <p className="text-stone-600 mt-3 max-w-xl mx-auto">
                    Рачно дизајнирани честитки на квалитетна хартија – совршен додаток на секој подарок.
                </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.slice().reverse().map((card, i) => (
                    <ProductCard
                        key={card.id}
                        product={card}
                        to={`/card/${card.id}`}
                        delay={(i % 3) * 90}
                    />
                ))}
            </div>
        </section>
    );
}
