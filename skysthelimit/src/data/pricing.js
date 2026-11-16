import planners from "./planners-data.js";
import { DELIVERY_COST, FREE_SHIPPING_FROM } from "./delivery.js";

export const BUNDLE_TIERS = [
  { min: 2, pct: 10 },
  { min: 3, pct: 15 },
  { min: 5, pct: 25 },
  { min: 6, pct: 30 },
  { min: 9, pct: 40 },
];

const plannerIds = new Set(planners.map((p) => p.id));

export const toNumber = (price) => parseInt(String(price).replace(/\D/g, ""), 10) || 0;
export const regularPrice = (p) => toNumber(p.price);
export const currentPrice = (p) => toNumber(p.sale ? p.discountedPrice : p.price);
export const isBundleEligible = (p) => plannerIds.has(p.id);

const round10 = (n) => Math.round(n / 10) * 10;

export function tierFor(count) {
  let pct = 0;
  for (const t of BUNDLE_TIERS) if (count >= t.min) pct = t.pct;
  return pct;
}

export function nextTier(count) {
  const t = BUNDLE_TIERS.find((t) => t.min > count);
  return t ? { need: t.min - count, pct: t.pct } : null;
}

/** Price of one unit of `p` when `count` planners are in the order. */
export function bundleUnitPrice(p, count) {
  const now = currentPrice(p);
  const pct = tierFor(count);
  if (!isBundleEligible(p) || pct === 0) return now;
  return round10(now * (1 - pct / 100));
}

export function priceOrder(items) {
  const count = items.filter(isBundleEligible).reduce((n, i) => n + i.quantity, 0);
  const pct = tierFor(count);

  const lines = items.map((item) => {
    const unitBefore = currentPrice(item);
    const unit = bundleUnitPrice(item, count);
    return { ...item, unitBefore, unit, total: unit * item.quantity, totalBefore: unitBefore * item.quantity };
  });

  const before = lines.reduce((s, l) => s + l.totalBefore, 0);
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const comboDiscount = before - subtotal;
  const regularTotal = lines.reduce((s, l) => s + regularPrice(l) * l.quantity, 0);
  const freeShipping = subtotal >= FREE_SHIPPING_FROM;
  const delivery = freeShipping ? 0 : DELIVERY_COST;

  return {
    lines,
    count,
    pct,
    next: nextTier(count),
    before,
    comboDiscount,
    regularTotal,
    savings: regularTotal - subtotal,
    subtotal,
    delivery,
    freeShipping,
    toFreeShipping: Math.max(0, FREE_SHIPPING_FROM - subtotal),
    total: subtotal + delivery,
  };
}
