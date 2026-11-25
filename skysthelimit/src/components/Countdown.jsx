import { useEffect, useState } from "react";
import { useLang } from "../i18n/routing.jsx";

export const BLACK_FRIDAY_END = new Date("2026-11-29T23:59:59+01:00").getTime();

export function useCountdown(end = BLACK_FRIDAY_END) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const left = Math.max(0, end - now);
  return {
    over: left === 0,
    days: Math.floor(left / 86400000),
    hours: Math.floor(left / 3600000) % 24,
    minutes: Math.floor(left / 60000) % 60,
    seconds: Math.floor(left / 1000) % 60,
  };
}

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown({ dark = true }) {
  const { t } = useLang();
  const c = useCountdown();
  if (c.over) return null;

  const units = [
    [c.days, t("bf.days")],
    [c.hours, t("bf.hours")],
    [c.minutes, t("bf.minutes")],
    [c.seconds, t("bf.seconds")],
  ];

  return (
    <div className="flex flex-col items-center gap-2" role="timer" aria-live="off">
      <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-white/60" : "text-stone-500"}`}>
        {t("bf.endsIn")}
      </p>
      <div className="flex gap-2 sm:gap-3">
        {units.map(([value, label]) => (
          <div
            key={label}
            className={`w-16 sm:w-20 rounded-2xl py-2.5 sm:py-3 text-center ${
              dark ? "bg-white/10 ring-1 ring-white/15" : "bg-white ring-1 ring-stone-200"
            }`}
          >
            <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${dark ? "text-white" : "text-stone-900"}`}>
              {pad(value)}
            </p>
            <p className={`text-[11px] uppercase tracking-wide ${dark ? "text-white/55" : "text-stone-500"}`}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
