import { Link } from "react-router-dom";
import { FiTruck, FiPercent, FiCheck } from "react-icons/fi";
import { FREE_SHIPPING_FROM } from "../data/delivery.js";
import { BUNDLE_TIERS } from "../data/pricing.js";

const maxTier = BUNDLE_TIERS[BUNDLE_TIERS.length - 1];

/** One quiet line of hints for the checkout (no boxes, no progress bars). */
export function OrderHints({ pricing, className = "" }) {
  const { count, next, freeShipping } = pricing;
  const showCombo = count > 0 && next;
  if (!showCombo && freeShipping) return null;

  return (
    <p className={`text-xs text-stone-500 leading-relaxed ${className}`}>
      {showCombo && (
        <Link to="/gifts" className="underline decoration-stone-300 underline-offset-2 hover:text-navy-900">
          Додај уште еден планер за поголем попуст
        </Link>
      )}
      {showCombo && !freeShipping && <span className="mx-1.5">·</span>}
      {!freeShipping && <>Бесплатна достава над {FREE_SHIPPING_FROM} ден</>}
    </p>
  );
}

/** Progress towards the next combo tier and free shipping. Takes priceOrder() output. */
export default function OrderPerks({ pricing, className = "" }) {
  const { count, pct, next, freeShipping, toFreeShipping, subtotal } = pricing;
  const tierProgress = Math.min(1, count / maxTier.min);
  const shipProgress = Math.min(1, subtotal / FREE_SHIPPING_FROM);

  return (
    <div className={`grid sm:grid-cols-2 gap-3 ${className}`}>
      <div className="rounded-2xl bg-navy-50 ring-1 ring-navy-100 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-navy-950">
          {next ? <FiPercent className="text-amber-600" /> : <FiCheck className="text-emerald-600" />}
          {next
            ? count === 0
              ? `Земи ${next.need} планери за −${next.pct}%`
              : `Додај уште ${next.need} ${next.need === 1 ? "планер" : "планери"} за −${next.pct}%`
            : `Максимален комбо попуст −${pct}%`}
        </p>
        <div className="mt-2 h-2 rounded-full bg-white overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-500 transition-all duration-500"
            style={{ width: `${tierProgress * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-stone-500">
          {pct > 0 ? `Сега: −${pct}% на планерите` : "Колку повеќе планери, толку поголем попуст – до −40%"}
        </p>
      </div>

      <div className="rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
          {freeShipping ? <FiCheck className="text-emerald-600" /> : <FiTruck className="text-emerald-700" />}
          {freeShipping ? "Достава: бесплатна!" : `Уште ${toFreeShipping.toLocaleString("mk-MK")} ден до бесплатна достава`}
        </p>
        <div className="mt-2 h-2 rounded-full bg-white overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
            style={{ width: `${shipProgress * 100}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-stone-500">
          Бесплатна достава за нарачки над {FREE_SHIPPING_FROM.toLocaleString("mk-MK")} ден
        </p>
      </div>
    </div>
  );
}
