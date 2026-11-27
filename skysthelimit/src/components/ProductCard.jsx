import { useNavigate, useLang } from "../i18n/routing.jsx";
import { FiShoppingBag } from "react-icons/fi";
import { addToCart } from "../data/Cart.js";
import Reveal from "./Reveal.jsx";

const toNumber = (price) => parseInt(String(price).replace(/\D/g, ""), 10) || 0;

export function discountPercent(product) {
  if (!product.sale || !product.discountedPrice) return 0;
  const full = toNumber(product.price);
  const now = toNumber(product.discountedPrice);
  if (!full || now >= full) return 0;
  return Math.round(((full - now) / full) * 100);
}

/**
 * Shared product card used across the shop.
 * `to` overrides the detail link (cards live under /card/:id).
 */
export default function ProductCard({ product: rawProduct, to, image, imageBg, badge, dark = false, delay = 0, compact = false }) {
  const navigate = useNavigate();
  const { t, money, loc } = useLang();
  const product = loc(rawProduct);
  const href = to || `/product/${product.id}`;
  const percent = discountPercent(product);
  const onSale = percent > 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <Reveal delay={delay} className="h-full">
    <article
      onClick={() => navigate(href)}
      className={`group relative flex flex-col w-full h-full cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10 backdrop-blur"
          : "bg-white ring-1 ring-stone-200/70 shadow-sm hover:shadow-xl"
      }`}
    >
      <div className={`relative aspect-square overflow-hidden ${imageBg || (dark ? "bg-white/5" : "bg-stone-50")}`}>
        <img
          src={image || product.bannerImg || product.cardImage || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageBg ? "drop-shadow-[0_14px_18px_rgba(60,45,30,0.28)]" : ""}`}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {badge && (
            <span className="rounded-full text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-navy-950 shadow-sm shadow-amber-900/20 ring-1 ring-amber-100/60">
              {badge}
            </span>
          )}
          {onSale && (
            <span className="rounded-full bg-rose-500 text-white text-xs font-bold px-2.5 py-1">
              −{percent}%
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={t("product.addToCartAria", { title: product.title })}
          className={`absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white/95 active:scale-95 text-navy-950 shadow-lg text-sm font-semibold ${compact ? "h-10 w-10 justify-center sm:h-auto sm:w-auto sm:px-4 sm:py-2" : "px-4 py-2"} transition-all duration-300 hover:bg-navy-950 hover:text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0`}
        >
          <FiShoppingBag size={16} />
          <span className={compact ? "hidden sm:inline" : ""}>{t("product.addToCart")}</span>
        </button>
      </div>

      <div className="flex flex-col gap-1 px-5 py-4 text-left">
        <h3 className={`font-serif text-xl leading-tight ${dark ? "text-white" : "text-stone-900"}`}>
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          {onSale ? (
            <>
              <span className={`text-lg font-bold ${dark ? "text-amber-300" : "text-rose-600"}`}>
                {money(toNumber(product.discountedPrice))}
              </span>
              <span className={`text-sm line-through ${dark ? "text-white/50" : "text-stone-400"}`}>
                {money(toNumber(product.price))}
              </span>
            </>
          ) : (
            <span className={`text-lg font-bold ${dark ? "text-amber-300" : "text-stone-900"}`}>
              {money(toNumber(product.price))}
            </span>
          )}
        </div>
      </div>
    </article>
    </Reveal>
  );
}
