import React, { useState, useEffect } from 'react';
import { getCart, addToCart, removeOneFromCart, removeFromCart, setQuantity, MAX_QTY } from '../data/Cart.js';
import planners from '../data/planners-data.js';
import cards from '../data/cards-data.js';
import { useNavigate, Link } from 'react-router-dom';
import gifts from '../data/Combo.js';
import { DELIVERY_COST, FREE_SHIPPING_FROM } from '../data/delivery.js';
import CardsModal from './CardsModal.jsx';
import { FiGift, FiPercent, FiArrowRight, FiTruck, FiShoppingBag, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import Recommendations from './Recommendations.jsx';
import CheckoutSteps from './CheckoutSteps.jsx';
import { priceOrder, regularPrice } from '../data/pricing.js';
import SavingsBadge from './SavingsBadge.jsx';

export default function Cart() {
  const [cart, setCart] = useState(getCart());
  const [cardsOpen, setCardsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onCartUpdated = () => setCart(getCart());
    window.addEventListener('cartUpdated', onCartUpdated);
    return () => window.removeEventListener('cartUpdated', onCartUpdated);
  }, []);

  if (Object.keys(cart).length === 0) {
    return (
      <div className="w-full min-w-0 px-4 pt-28 sm:pt-32 pb-20">
        <div className="relative max-w-2xl mx-auto overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-2xl shadow-navy-950/20">
          <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#1d4e89]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
              <FiShoppingBag className="text-amber-300" size={40} />
              <span className="absolute ml-16 -mt-14 text-amber-200 text-xl animate-pulse">✦</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl mt-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100">
              Кошничката е празна
            </h1>
            <p className="text-white/75 mt-3 text-lg leading-relaxed">
              Но тоа лесно се поправа. Пронајди го планерот што ќе ти ја организира годината
              – или подари нешто посебно.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('/products')}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-amber-300 hover:bg-amber-200 px-7 py-4 text-lg font-semibold text-navy-950 shadow-lg shadow-amber-400/20 transition active:scale-[0.98]"
              >
                Разгледај ги планерите
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/gifts')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-7 py-4 font-semibold text-white ring-1 ring-white/30 hover:bg-white/10 transition active:scale-[0.98]"
              >
                <FiGift /> Креирај комбо
              </button>
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
              <FiTruck /> Бесплатна достава над {FREE_SHIPPING_FROM} ден · комбо попуст до −40%
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <Recommendations />
        </div>
      </div>
    );
  }

  const allProducts = [...planners, ...gifts, ...cards];

  const pricing = priceOrder(
    allProducts.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] }))
  );
  const cartItems = pricing.lines.map((l) => ({ ...l, displayPrice: l.unit, totalPrice: l.total }));
  const finalTotal = pricing.total;
  const goToCheckout = () => navigate('/order', { state: { cartItems } });

  return (
    <div className="w-full min-w-0 max-w-4xl mx-auto px-4 pt-28 sm:pt-32 pb-36 sm:pb-16">
      <CheckoutSteps current={0} />
      <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 text-center mb-8">Вашата кошничка</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-3xl ring-1 ring-stone-200 shadow-sm p-3 sm:p-4 mb-3 flex gap-4 items-center"
        >
          <img
            src={item.cardImage || item.images?.[0]}
            alt={item.title}
            className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 object-cover rounded-2xl bg-stone-100"
          />

          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg sm:text-xl leading-tight text-stone-900">{item.title}</h3>
            <p className="mt-1 text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
              {item.unit < regularPrice(item) && (
                <span className="line-through text-stone-400">{regularPrice(item)} ден</span>
              )}
              <span className={item.unit < regularPrice(item) ? "text-rose-600 font-semibold" : "text-stone-700 font-semibold"}>
                {item.unit} ден
              </span>
              {item.unit < item.unitBefore && (
                <span className="rounded-full bg-gradient-to-r from-amber-200 to-amber-300 px-2 py-0.5 text-[11px] font-bold text-navy-950">
                  КОМБО −{pricing.pct}%
                </span>
              )}
            </p>

            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center rounded-full ring-1 ring-stone-300">
                <button
                  onClick={() => removeOneFromCart(item.id)}
                  className="h-8 w-8 flex items-center justify-center text-stone-700 hover:text-navy-950 active:scale-90 transition"
                  aria-label="Намали количина"
                >
                  <FiMinus size={14} />
                </button>
                <QtyInput id={item.id} value={item.quantity} />
                <button
                  onClick={() => addToCart(item.id)}
                  disabled={item.quantity >= MAX_QTY}
                  className="h-8 w-8 flex items-center justify-center text-stone-700 hover:text-navy-950 active:scale-90 transition disabled:opacity-30"
                  aria-label="Зголеми количина"
                >
                  <FiPlus size={14} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center gap-1 text-sm text-stone-500 hover:text-rose-600 transition"
              >
                <FiTrash2 size={14} /> <span className="hidden sm:inline">Отстрани</span>
              </button>
            </div>
          </div>

          {item.quantity > 1 && (
            <div className="hidden sm:block text-right font-semibold text-stone-900 whitespace-nowrap">
              {(item.displayPrice * item.quantity).toLocaleString('mk-MK')} ден
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={() => setCardsOpen(true)}
          className="sm:flex-1 flex h-14 items-center justify-center gap-2 rounded-full bg-navy-50 hover:bg-navy-100 ring-1 ring-navy-200 text-navy-950 font-semibold px-6 transition active:scale-[0.97]"
        >
          <FiGift size={18} className="text-amber-600" />
          Додади честитка
        </button>
        <Link
          to="/gifts"
          className="group sm:flex-1 flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/80 ring-1 ring-amber-200 hover:ring-amber-300 hover:shadow-sm pl-2 pr-5 text-amber-950 transition active:scale-[0.97]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-400 text-navy-950 shadow-sm">
            <FiPercent size={18} />
          </span>
          <span className="flex-1 text-left leading-tight">
            <span className="block text-sm sm:text-base font-semibold">Додади повеќе планери</span>
            <span className="block text-xs text-amber-800/80">до −40% + бесплатна достава</span>
          </span>
          <FiArrowRight size={18} className="shrink-0 text-amber-700 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <CardsModal open={cardsOpen} onClose={() => setCardsOpen(false)} />

      {/* order summary */}
      <div className="mt-6 rounded-3xl bg-white ring-1 ring-stone-200 shadow-sm p-5 sm:p-7">
        <dl className="space-y-2 text-stone-600">
          <div className="flex justify-between">
            <dt>Производи</dt>
            <dd>{pricing.subtotal.toLocaleString('mk-MK')} ден</dd>
          </div>
          <div className="flex justify-between">
            <dt>Достава</dt>
            <dd className={pricing.freeShipping ? 'font-semibold text-emerald-700' : ''}>
              {pricing.freeShipping ? 'Бесплатна' : `${DELIVERY_COST} ден`}
            </dd>
          </div>
          <div className="flex justify-between items-baseline border-t border-stone-100 pt-3">
            <dt className="font-semibold text-stone-900">Вкупно за плаќање</dt>
            <dd className="text-3xl font-bold text-stone-900">{finalTotal.toLocaleString('mk-MK')} ден</dd>
          </div>
        </dl>
        <SavingsBadge pricing={pricing} className="mt-4" />

        <button
          onClick={goToCheckout}
          className="group relative mt-6 hidden sm:flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-navy-950 via-navy-700 to-navy-950 bg-[length:200%_100%] bg-left hover:bg-right px-8 py-5 text-xl font-semibold text-white shadow-xl shadow-navy-950/30 transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <span className="shine-loop" />
          Завршете ја вашата нарачка
          <FiArrowRight className="arrow-nudge text-amber-300" size={22} />
        </button>
        <p className="mt-3 hidden sm:flex items-center justify-center gap-2 text-xs text-stone-500">
          <FiTruck className="shrink-0" /> Плаќање во готово при достава
        </p>
      </div>

      {/* sticky checkout bar on phones */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-xs text-stone-500">Вкупно</p>
            <p className="text-lg font-bold text-stone-900">{finalTotal.toLocaleString('mk-MK')} ден</p>
          </div>
          <button
            onClick={goToCheckout}
            className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy-950 to-navy-700 px-5 py-3.5 font-semibold text-white shadow-lg shadow-navy-950/30 active:scale-[0.98] transition"
          >
            <span className="shine-loop" />
            Заврши нарачка <FiArrowRight className="arrow-nudge text-amber-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

function QtyInput({ id, value }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);

  const commit = () => {
    if (draft.trim() === '' || Number(draft) !== value) setQuantity(id, draft || 1);
    else setDraft(String(value));
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={3}
      value={draft}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, '');
        setDraft(digits === '' ? '' : String(Math.min(MAX_QTY, Number(digits))));
      }}
      onBlur={commit}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.select()}
      aria-label="Количина"
      className="w-9 bg-transparent text-center text-sm font-semibold tabular-nums outline-none focus:bg-navy-50 rounded-md"
    />
  );
}
