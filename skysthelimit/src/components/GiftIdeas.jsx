import Reveal from "./Reveal.jsx";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck } from "react-icons/fi";
import { FREE_SHIPPING_FROM } from "../data/delivery.js";

export default function GiftIdeas() {
  return (
    <Reveal className="w-full max-w-6xl mx-auto bg-white border border-neutral-200 rounded-3xl px-6 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-all duration-300 mt-6 mb-12">
      <div className="text-center sm:text-left max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Комбо попуст</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-2">
          Колку повеќе, толку поевтино – <span className="text-navy-950 font-semibold">до −40%</span>
        </h2>
        <p className="text-md sm:text-lg text-neutral-500 mt-4 leading-relaxed">
          Креирај свое комбо од планери – за себе, за пријателите или како подарок. Попустот расте со секој планер.
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
          <FiTruck /> Бесплатна достава над {FREE_SHIPPING_FROM.toLocaleString("mk-MK")} ден
        </p>
      </div>

      <Link
        to="/gifts"
        className="group shrink-0 inline-flex items-center gap-2 bg-navy-50 hover:bg-navy-100 ring-1 ring-navy-200 text-navy-950 font-semibold text-md sm:text-lg px-6 py-3 rounded-full transition-all duration-300 active:scale-[0.97]"
      >
        Креирај свое комбо
        <FiArrowRight className="text-amber-600 transition-transform group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}
