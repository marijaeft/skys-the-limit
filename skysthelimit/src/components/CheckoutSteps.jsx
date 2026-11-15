import { FiCheck } from "react-icons/fi";

const STEPS = ["Кошничка", "Податоци", "Потврда"];

/** Small progress indicator for the checkout flow. `current` is 0-based. */
export default function CheckoutSteps({ current = 0 }) {
  return (
    <ol className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm mb-8 max-w-full">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-1.5 sm:gap-3">
            <span
              className={`flex items-center gap-2 rounded-full px-2 sm:px-3 py-1.5 font-semibold transition ${
                active
                  ? "bg-navy-950 text-white shadow"
                  : done
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-stone-100 text-stone-400"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  active ? "bg-white text-navy-950" : done ? "bg-emerald-600 text-white" : "bg-stone-300 text-white"
                }`}
              >
                {done ? <FiCheck size={12} /> : i + 1}
              </span>
              {/* on phones only the current step shows its name */}
              <span className={active ? "pr-1 sm:pr-0" : "hidden sm:inline"}>{label}</span>
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-3 sm:w-8 bg-stone-300" />}
          </li>
        );
      })}
    </ol>
  );
}
