import { useEffect, useRef, useState } from "react";

const canAnimate =
  typeof window !== "undefined" &&
  "IntersectionObserver" in window &&
  !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades its children up when they scroll into view.
 * Content is visible by default; it only hides once JS is running,
 * and a fallback timer always reveals it, so nothing can get stuck hidden.
 */
export default function Reveal({ children, delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState(canAnimate ? "hidden" : "shown");

  useEffect(() => {
    if (!canAnimate) return;
    const el = ref.current;
    if (!el) return;
    const show = () => setState("shown");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    const fallback = setTimeout(show, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${state === "shown" ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </div>
  );
}
