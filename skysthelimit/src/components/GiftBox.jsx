import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLang } from "../i18n/routing.jsx";
import RichText from "../i18n/RichText.jsx";
import { FiPlus, FiMinus, FiCheck, FiShoppingBag, FiArrowRight, FiGift, FiTruck } from "react-icons/fi";
import planners from "../data/planners-data.js";
import { sortForDisplay } from "../data/displayOrder.js";
import { addToCart, removeOneFromCart, getCart, MAX_QTY } from "../data/Cart.js";
import cards from "../data/cards-data.js";
import gifts from "../data/Combo.js";
import { BUNDLE_TIERS, priceOrder, bundleUnitPrice, currentPrice, regularPrice, tierFor, isBundleEligible } from "../data/pricing.js";
import { FREE_SHIPPING_FROM } from "../data/delivery.js";
import OrderPerks from "./OrderPerks.jsx";
import Reveal from "./Reveal.jsx";
import SavingsBadge from "./SavingsBadge.jsx";


export default function GiftBox() {
  const { t, money: fmt, loc } = useLang();
  const navigate = useNavigate();
  // the combo page edits the cart directly, so planners already in the cart count too
  const [picked, setPicked] = useState(getCart());
  useEffect(() => {
    const sync = () => setPicked(getCart());
    window.addEventListener("cartUpdated", sync);
    return () => window.removeEventListener("cartUpdated", sync);
  }, []);

  const list = useMemo(() => sortForDisplay(planners), []);
  const items = [...planners, ...gifts, ...cards]
    .filter((p) => picked[p.id])
    .map((p) => ({ ...p, quantity: picked[p.id] }));
  const pricing = priceOrder(items);
  // preview price if one more planner is added
  const previewCount = pricing.count + 1;

  const add = (id) => addToCart(id);
  const remove = (id) => removeOneFromCart(id);
  const goToCart = () => navigate("/cart");

  return (
    <div className="w-full min-w-0 px-4 pt-28 sm:pt-32 pb-40 lg:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">{t("combo.eyebrow")}</p>
          <h1 className="font-serif text-4xl sm:text-6xl text-stone-900 mt-3 leading-tight">{t("combo.title")}</h1>
          <p className="text-stone-600 mt-4 text-lg">
            <RichText k="combo.intro" b="font-semibold text-navy-950" />
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100 px-4 py-1.5 text-sm font-medium">
            <FiTruck /> {t("combo.free", { amount: fmt(FREE_SHIPPING_FROM) })}
          </p>
        </Reveal>

        {/* tier ladder */}
        <Reveal className="mt-10">
          <ol className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 max-w-3xl mx-auto">
            {BUNDLE_TIERS.map((tier, i) => {
              const reached = pricing.count >= tier.min;
              const current = pricing.pct === tier.pct && reached;
              const last = i === BUNDLE_TIERS.length - 1;
              return (
                <li
                  key={tier.min}
                  className={`rounded-2xl px-2 py-3 text-center transition-all duration-300 ${
                    current
                      ? "bg-navy-950 text-white shadow-lg shadow-navy-950/20 scale-[1.04]"
                      : reached
                      ? "bg-navy-100 text-navy-950"
                      : "bg-white ring-1 ring-stone-200 text-stone-700"
                  }`}
                >
                  <p className={`text-2xl font-bold ${current ? "text-amber-300" : ""}`}>−{tier.pct}%</p>
                  <p className={`text-xs mt-0.5 ${current ? "text-white/80" : "text-stone-500"}`}>
                    {last ? t("combo.tierPlus", { count: tier.min }) : t("combo.tier", { count: tier.min })}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* planner picker */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {list.map((rawP, i) => {
              const p = loc(rawP);
              const qty = picked[p.id] || 0;
              const selected = qty > 0;
              const now = currentPrice(p);
              const countIfAdded = selected ? pricing.count : previewCount;
              const comboNow = bundleUnitPrice(p, countIfAdded);
              const showCombo = tierFor(countIfAdded) > 0 && comboNow < now;
              return (
                <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 ring-2 ${
                      selected ? "ring-navy-950 shadow-lg" : "ring-stone-200 hover:ring-stone-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => add(p.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          add(p.id);
                        }
                      }}
                      className="relative w-full pt-[100%] cursor-pointer bg-stone-50"
                      aria-label={t("combo.addToComboAria", { title: p.title })}
                    >
                      <img
                        src={p.cardImage}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                      />
                      {selected && (
                        <span key={qty} className="bump absolute top-3 left-3 flex items-center gap-1 rounded-full bg-navy-950 px-2.5 py-1 text-xs font-bold text-white shadow">
                          <FiCheck size={12} /> {qty}
                        </span>
                      )}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-3 right-3 flex items-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/5"
                      >
                        {selected && (
                          <>
                            <button
                              onClick={() => remove(p.id)}
                              className="h-9 w-9 flex items-center justify-center text-stone-700 hover:text-navy-950 active:scale-90 transition"
                              aria-label={t("combo.removeAria", { title: p.title })}
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold tabular-nums">{qty}</span>
                          </>
                        )}
                        <button
                          onClick={() => add(p.id)}
                          disabled={qty >= MAX_QTY}
                          className="h-9 w-9 flex items-center justify-center text-navy-950 active:scale-90 transition disabled:opacity-30"
                          aria-label={t("combo.addAria", { title: p.title })}
                        >
                          <FiPlus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
                      <h3 className="font-serif text-base sm:text-lg leading-tight text-stone-900 line-clamp-2">{p.title}</h3>
                      <div className="mt-auto pt-1 flex flex-wrap items-baseline gap-x-2">
                        {showCombo ? (
                          <>
                            <span className="text-base sm:text-lg font-bold text-navy-950">{fmt(comboNow)}</span>
                            <span className="text-xs sm:text-sm text-stone-400 line-through">{fmt(regularPrice(p))}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-base sm:text-lg font-bold text-stone-900">{fmt(now)}</span>
                            {now < regularPrice(p) && (
                              <span className="text-xs sm:text-sm text-stone-400 line-through">{fmt(regularPrice(p))}</span>
                            )}
                          </>
                        )}
                      </div>
                      {showCombo && (
                        <p className="text-[11px] sm:text-xs font-semibold text-amber-700">
                          {selected ? t("combo.comboPrice") : t("combo.priceIfAdded")}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* summary */}
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <Summary pricing={pricing} onAdd={goToCart} />
          </aside>
        </div>

        {/* custom / corporate requests */}
        <Reveal className="mt-16 max-w-3xl mx-auto rounded-3xl bg-navy-50 ring-1 ring-navy-100 p-6 sm:p-8 text-center">
          <FiGift className="mx-auto text-amber-600" size={32} />
          <h2 className="font-serif text-2xl sm:text-3xl text-navy-950 mt-3">{t("combo.corpTitle")}</h2>
          <p className="text-stone-600 mt-2">{t("combo.corpText")}</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-950 hover:bg-navy-900 px-6 py-3 font-semibold text-white transition active:scale-[0.97]"
          >
            {t("combo.corpButton")} <FiArrowRight className="text-amber-300" />
          </Link>
        </Reveal>
      </div>

      {/* mobile / tablet bottom bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-semibold text-navy-950 mb-2 text-center">
            {pricing.next
              ? pricing.count === 0
                ? t("combo.barPick", { need: pricing.next.need, pct: pricing.next.pct })
                : t("combo.barMore", { need: pricing.next.need, pct: pricing.next.pct }) +
                  (pricing.pct ? t("combo.barNow", { pct: pricing.pct }) : "")
              : t("combo.barMax", { pct: pricing.pct })}
            {pricing.freeShipping && t("combo.barFree")}
          </p>
          <div className="flex items-center gap-3">
            <div className="shrink-0 min-w-[5.5rem]">
              <p className="text-xs text-stone-500">
                {t("combo.count", { count: pricing.count })}
              </p>
              <p className="text-lg font-bold text-stone-900 leading-tight">{fmt(pricing.subtotal)}</p>
              {pricing.savings > 0 && (
                <p className="text-xs font-semibold text-emerald-700">{t("combo.youSave", { amount: fmt(pricing.savings) })}</p>
              )}
            </div>
            <button
              onClick={goToCart}
              disabled={pricing.count === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-navy-950 px-5 py-3.5 font-semibold text-white shadow-lg shadow-navy-950/25 transition active:scale-[0.98] disabled:bg-stone-300 disabled:shadow-none"
            >
              <FiShoppingBag /> {t("combo.toCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ pricing, onAdd }) {
  const { t, money: fmt, loc } = useLang();
  return (
    <div className="rounded-3xl bg-white ring-1 ring-stone-200 shadow-sm p-6">
      <h2 className="font-serif text-2xl text-stone-900">{t("combo.summaryTitle")}</h2>
      {pricing.count === 0 ? (
        <p className="text-sm text-stone-500 mt-2">{t("combo.summaryEmpty")}</p>
      ) : (
        <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-1">
          {pricing.lines.filter(isBundleEligible).map((l) => (
            <li key={l.id} className="flex items-center gap-3 text-sm">
              <img src={l.cardImage} alt="" className="h-10 w-10 rounded-lg object-cover bg-stone-100" />
              <span className="flex-1 min-w-0 truncate text-stone-800">
                {l.quantity}× {loc(l).title}
              </span>
              <span className="font-semibold text-stone-900 whitespace-nowrap">{fmt(l.total)}</span>
            </li>
          ))}
        </ul>
      )}

      <OrderPerks pricing={pricing} className="mt-5 !grid-cols-1" />

      <dl className="mt-5 space-y-1.5 text-sm border-t border-stone-100 pt-4">
        <div className="flex justify-between text-stone-600">
          <dt>{t("combo.priceNoCombo")}</dt>
          <dd>{fmt(pricing.before)}</dd>
        </div>
        {pricing.comboDiscount > 0 && (
          <div className="flex justify-between items-center font-semibold text-emerald-700">
            <dt className="flex items-center gap-2">
              {t("combo.saveWithCombo")}
              <span className="rounded-full bg-gradient-to-r from-amber-200 to-amber-300 px-2 py-0.5 text-xs font-bold text-navy-950">−{pricing.pct}%</span>
            </dt>
            <dd>−{fmt(pricing.comboDiscount)}</dd>
          </div>
        )}
        <div className="flex justify-between items-baseline border-t border-stone-100 pt-2">
          <dt className="font-semibold text-stone-900">{t("combo.total")}</dt>
          <dd className="text-2xl font-bold text-stone-900">{fmt(pricing.subtotal)}</dd>
        </div>
      </dl>

      <SavingsBadge pricing={pricing} className="mt-4" />

      <button
        onClick={onAdd}
        disabled={pricing.count === 0}
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy-950 via-navy-700 to-navy-950 bg-[length:200%_100%] bg-left hover:bg-right px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-navy-950/25 transition-all duration-500 active:scale-[0.98] disabled:from-stone-300 disabled:via-stone-300 disabled:to-stone-300 disabled:shadow-none"
      >
        <FiShoppingBag /> {t("combo.toCart")}
        <FiArrowRight className="text-amber-300 transition-transform group-hover:translate-x-1" />
      </button>
      <p className="mt-2 text-center text-xs text-stone-500">{t("combo.instant")}</p>
    </div>
  );
}
