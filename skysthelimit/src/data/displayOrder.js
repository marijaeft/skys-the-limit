// Order in which planners are shown in the shop, sale and combo lists.
// Listed ids come first (in this order), the rest follow newest first, and LAST ids go at the end.
const FIRST = [11, 12, 13, 2, 3, 4, 14, 1];
const LAST = [10];

export function sortForDisplay(list) {
  const rank = (p) => {
    const f = FIRST.indexOf(p.id);
    if (f !== -1) return f;
    const l = LAST.indexOf(p.id);
    if (l !== -1) return 10000 + l;
    return 1000 - p.id;
  };
  return list.slice().sort((a, b) => rank(a) - rank(b));
}
