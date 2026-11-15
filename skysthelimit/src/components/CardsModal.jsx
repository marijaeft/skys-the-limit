import { useEffect, useRef, useState } from "react";
import { FiX, FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import cards from "../data/cards-data.js";
import { addToCart } from "../data/Cart.js";

const toNumber = (price) => parseInt(String(price).replace(/\D/g, ""), 10) || 0;
const unitPrice = (card) => toNumber(card.sale ? card.discountedPrice : card.price);

/**
 * Pop-up for picking greeting cards from the cart.
 * Picks are kept here and only added to the cart when "Готово" is pressed;
 * closing with X / backdrop / Esc discards them.
 */
export default function CardsModal({ open, onClose }) {
  const [picked, setPicked] = useState({}); // { cardId: qty }
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null); // { startY, startT, active }

  // start fresh every time the modal opens
  useEffect(() => {
    if (open) {
      setPicked({});
      setDragY(0);
      setDragging(false);
    }
  }, [open]);

  // ---- swipe down on the grabber to close (mobile) ----
  const onTouchStart = (e) => {
    if (window.innerWidth >= 640) return; // bottom sheet only on phones
    drag.current = { startY: e.touches[0].clientY, startT: Date.now(), active: false };
  };

  const onTouchMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dy = e.touches[0].clientY - d.startY;
    if (!d.active) {
      if (dy > 4) {
        d.active = true;
        d.startY = e.touches[0].clientY;
        setDragging(true);
      }
      return;
    }
    setDragY(Math.max(0, dy));
  };

  const onTouchEnd = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.active) return;
    setDragging(false);
    const elapsed = Math.max(1, Date.now() - d.startT);
    const fast = dragY / elapsed > 0.6; // quick flick
    if (dragY > 120 || (fast && dragY > 40)) {
      setDragY(window.innerHeight); // slide out, then close
      setTimeout(onClose, 220);
    } else {
      setDragY(0); // spring back
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const add = (id) => setPicked((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const remove = (id) =>
    setPicked((p) => {
      const next = { ...p };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const count = Object.values(picked).reduce((n, q) => n + q, 0);
  const total = cards.reduce((sum, c) => sum + (picked[c.id] || 0) * unitPrice(c), 0);

  const confirm = () => {
    Object.entries(picked).forEach(([id, qty]) => {
      for (let i = 0; i < qty; i++) addToCart(Number(id));
    });
    onClose();
  };

  return (
    <div
      className="backdrop-in fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/50 sm:p-6"
      style={dragY ? { backgroundColor: `rgb(0 0 0 / ${Math.max(0, 0.5 - dragY / 1200)})` } : undefined}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Додади честитка"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: dragY ? `translateY(${dragY}px)` : undefined,
          transition: dragging ? "none" : "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="sheet-in relative w-full sm:max-w-4xl h-[88vh] sm:h-auto sm:max-h-[88vh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
      >
        {/* drag handle (mobile) */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          className="sm:hidden flex justify-center w-full pt-3 pb-3 -mb-2 touch-none cursor-grab"
          aria-label="Повлечи надолу за затворање"
        >
          <span className="h-1.5 w-12 rounded-full bg-stone-300" />
        </div>

        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 pt-3 sm:pt-6 pb-4 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">Додади честитка</h2>
            <p className="text-sm text-stone-500 mt-1">Допри на честитка за да ја избереш. Можеш да избереш повеќе.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-stone-100 text-stone-600"
            aria-label="Затвори без додавање"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {cards.slice().reverse().map((card) => {
              const qty = picked[card.id] || 0;
              const selected = qty > 0;
              return (
                <div
                  key={card.id}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden bg-stone-50 ring-2 transition ${
                    selected ? "ring-navy-900 shadow-md" : "ring-transparent hover:ring-stone-300"
                  }`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => add(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        add(card.id);
                      }
                    }}
                    className="relative w-full pt-[100%] cursor-pointer"
                    aria-label={`Избери ${card.title}`}
                  >
                    <img
                      src={card.cardImage}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                    />

                    {/* desktop hover hint */}
                    <span className="hidden md:flex absolute inset-0 items-center justify-center bg-navy-950/0 group-hover:bg-navy-950/20 transition">
                      <span className="flex items-center gap-1.5 rounded-full bg-white text-navy-950 font-semibold text-sm px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition">
                        <FiPlus /> {selected ? "Уште една" : "Избери"}
                      </span>
                    </span>

                    {selected && (
                      <span key={qty} className="bump absolute top-2 left-2 flex items-center gap-1 rounded-full bg-navy-950 text-white text-xs font-bold px-2.5 py-1 shadow">
                        <FiCheck size={12} /> {qty}
                      </span>
                    )}

                    {/* quantity controls in the image corner */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-2 bottom-2 flex items-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/5"
                    >
                    {selected && (
                      <>
                        <button
                          onClick={() => remove(card.id)}
                          className="h-9 w-9 flex items-center justify-center text-stone-700 hover:text-navy-950 active:scale-90 transition"
                          aria-label={`Одземи ${card.title}`}
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold tabular-nums">{qty}</span>
                      </>
                    )}
                    <button
                      onClick={() => add(card.id)}
                      className="h-9 w-9 flex items-center justify-center text-navy-950 active:scale-90 transition"
                      aria-label={`Додади ${card.title}`}
                    >
                      <FiPlus size={18} />
                    </button>
                    </div>
                  </div>

                  <p className="px-3 py-2.5 text-[13px] sm:text-sm text-stone-800 leading-snug line-clamp-2 bg-white">
                    {card.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* footer with running total */}
        <div className="border-t border-stone-100 px-5 sm:px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-4 bg-white sm:rounded-b-3xl">
          <div className="min-w-0">
            {count > 0 ? (
              <>
                <p className="text-sm text-stone-500">
                  {count} {count === 1 ? "честитка" : "честитки"}
                </p>
                <p className="text-xl font-bold text-stone-900">+{total} ден</p>
              </>
            ) : (
              <p className="text-sm text-stone-500">Избери честитка</p>
            )}
          </div>
          <button
            onClick={confirm}
            disabled={count === 0}
            className="shrink-0 rounded-full bg-navy-950 text-white px-7 sm:px-8 py-3 font-semibold hover:bg-navy-900 active:scale-95 transition disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
