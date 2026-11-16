import Reveal from "./Reveal.jsx";
import { Link, useLang } from "../i18n/routing.jsx";
import RichText from "../i18n/RichText.jsx";
import { FiArrowRight, FiTruck } from "react-icons/fi";
import { FREE_SHIPPING_FROM } from "../data/delivery.js";

export default function GiftIdeas() {
  const { t, money } = useLang();
  return (
    <Reveal className="w-full max-w-6xl mx-auto bg-white border border-neutral-200 rounded-3xl px-6 sm:px-12 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-all duration-300 mt-6 mb-12">
      <div className="text-center sm:text-left max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{t("home.giftEyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-2">
          <RichText k="home.giftTitle" b="text-navy-950 font-semibold" />
        </h2>
        <p className="text-md sm:text-lg text-neutral-500 mt-4 leading-relaxed">
          {t("home.giftText")}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
          <FiTruck /> {t("home.giftFree", { amount: money(FREE_SHIPPING_FROM) })}
        </p>
      </div>

      <Link
        to="/gifts"
        className="group shrink-0 inline-flex items-center gap-2 bg-navy-50 hover:bg-navy-100 ring-1 ring-navy-200 text-navy-950 font-semibold text-md sm:text-lg px-6 py-3 rounded-full transition-all duration-300 active:scale-[0.97]"
      >
        {t("home.giftButton")}
        <FiArrowRight className="text-amber-600 transition-transform group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}
