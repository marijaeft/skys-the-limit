/** Subtle "you save" note. Shows nothing when there are no savings. */
export default function SavingsBadge({ pricing, className = "" }) {
  const { savings } = pricing;
  if (savings <= 0) return null;

  return (
    <p
      className={`flex items-baseline justify-between gap-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800 ${className}`}
    >
      <span>🎉 Заштедуваш</span>
      <span className="font-semibold whitespace-nowrap">{savings.toLocaleString("mk-MK")} ден</span>
    </p>
  );
}
