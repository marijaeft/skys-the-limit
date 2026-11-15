import planners from "../data/planners-data.js";
import gifts from "../data/Combo.js";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addToCart } from "../data/Cart.js";
import { FiShoppingBag, FiTruck, FiCheck, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { GiButterfly } from "react-icons/gi";
import Recommendations from "./Recommendations.jsx";
import { discountPercent } from "./ProductCard.jsx";
import { DELIVERY_COST } from '../data/delivery.js';

const allProducts = [...planners, ...gifts];
const toNumber = (price) => parseInt(String(price).replace(/\D/g, ""), 10) || 0;

export default function PlannerDetails() {
  const { id } = useParams();
  const planner = allProducts.find((p) => p.id === parseInt(id, 10));
  const images = planner?.images ?? [];

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [added, setAdded] = useState(false);
  const imgRef = useRef(null);

  // Reset when navigating to another product (e.g. from recommendations)
  useEffect(() => {
    setQuantity(1);
    setActiveIndex(0);
    setLightboxIndex(null);
    setAdded(false);
  }, [id]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "ArrowRight") setLightboxIndex((i) => Math.min(images.length - 1, i + 1));
      else if (e.key === "ArrowLeft") setLightboxIndex((i) => Math.max(0, i - 1));
      else if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd = (e) => {
      const deltaX = startX - e.changedTouches[0].clientX;
      if (deltaX > 50) setLightboxIndex((i) => Math.min(images.length - 1, i + 1));
      else if (deltaX < -50) setLightboxIndex((i) => Math.max(0, i - 1));
    };
    imgEl.addEventListener("touchstart", onStart);
    imgEl.addEventListener("touchend", onEnd);
    return () => {
      imgEl.removeEventListener("touchstart", onStart);
      imgEl.removeEventListener("touchend", onEnd);
    };
  }, [lightboxIndex, images.length]);

  if (!planner) {
    return <p className="text-center text-stone-500 text-lg mt-32">Производот не е пронајден.</p>;
  }

  const fullPrice = toNumber(planner.price);
  const unitPrice = planner.sale ? toNumber(planner.discountedPrice) : fullPrice;
  const percent = discountPercent(planner);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(planner.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
      <nav className="text-sm text-stone-500 mb-8">
        <Link to="/" className="hover:text-stone-900">Почетна</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-stone-900">Планери</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-800">{planner.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Gallery */}
        <div className="md:sticky md:top-28 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-stone-50 ring-1 ring-stone-200/70">
            <img
              src={images[activeIndex]}
              alt={planner.title}
              className="w-full aspect-square object-cover cursor-zoom-in"
              onClick={() => setLightboxIndex(activeIndex)}
            />
          </div>
          {images.length > 1 && (
            <div className={`grid gap-2 sm:gap-3 ${images.length >= 6 ? "grid-cols-6" : images.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-2xl overflow-hidden bg-stone-50 ring-2 transition ${
                    idx === activeIndex ? "ring-navy-900" : "ring-transparent hover:ring-stone-300"
                  }`}
                >
                  <img src={img} alt={`${planner.title} ${idx + 1}`} className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 leading-tight">{planner.title}</h1>
          {planner.subtitle && <p className="text-stone-600 text-lg mt-3 leading-relaxed">{planner.subtitle}</p>}

          <div className="flex items-baseline flex-wrap gap-3 mt-6">
            <span className="text-3xl font-bold text-stone-900">
              {(unitPrice * quantity).toLocaleString("mk-MK")} ден
            </span>
            {percent > 0 && (
              <>
                <span className="text-lg text-stone-400 line-through">
                  {(fullPrice * quantity).toLocaleString("mk-MK")} ден
                </span>
                <span className="rounded-full bg-rose-100 text-rose-700 text-sm font-semibold px-3 py-1">
                  Заштеди {percent}%
                </span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <div className="flex items-center rounded-full ring-1 ring-stone-300 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-11 h-12 text-xl text-stone-700 disabled:opacity-30"
                aria-label="Намали количина"
              >
                −
              </button>
              <input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-10 text-center text-lg outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Количина"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-12 text-xl text-stone-700"
                aria-label="Зголеми количина"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 min-w-[220px] h-12 flex items-center justify-center gap-2 rounded-full text-white font-semibold shadow-lg transition-all duration-300 active:scale-[0.97] ${
                added ? "bg-emerald-600" : "bg-navy-950 hover:bg-navy-900 hover:shadow-xl"
              }`}
            >
              {added ? <FiCheck size={20} /> : <FiShoppingBag size={20} />}
              <span>{added ? "Додадено во кошничка" : "Додади во кошничка"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mt-5 text-sm text-stone-600">
            <FiTruck className="text-amber-600" size={18} />
            <span>Достава {DELIVERY_COST} ден · плаќање при достава</span>
          </div>

          <div className="mt-10 rounded-3xl bg-[#fbf7f2] p-6 sm:p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-4">Карактеристики</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-stone-700">
              {planner.characteristics.map((c, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FiCheck className="text-amber-600 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 mb-4">Содржина</h2>
            <ul className="space-y-3 text-stone-700 leading-relaxed">
              {planner.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <GiButterfly className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Recommendations excludeId={planner.id} />

      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setLightboxIndex(null)}
            aria-label="Затвори"
          >
            <FiX size={28} />
          </button>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              ref={imgRef}
              src={images[lightboxIndex]}
              alt={planner.title}
              className="max-w-full sm:max-w-5xl max-h-[80vh] sm:max-h-[90vh] rounded-2xl shadow-2xl select-none"
            />
            {lightboxIndex > 0 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-stone-900 shadow"
                aria-label="Претходна"
              >
                <FiChevronLeft size={24} />
              </button>
            )}
            {lightboxIndex < images.length - 1 && (
              <button
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-stone-900 shadow"
                aria-label="Следна"
              >
                <FiChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
