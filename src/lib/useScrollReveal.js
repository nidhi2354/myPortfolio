import { useLayoutEffect } from "react";

// Elements that fade/slide in when they scroll into view. Hero has its own entrance animation.
const TARGETS = [
  ".rule",
  ".section-title",
  ".section-sub",
  ".grid-2 > .card",
  ".grid-3 > .card",
  ".steps > .card",
  ".tl-item",
  ".contact-grid > .card",
].join(",");

export default function useScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const els = [...document.querySelectorAll(TARGETS)];
    els.forEach((el) => {
      el.classList.add("reveal");
      // Stagger siblings a little so grids cascade instead of popping in together.
      const index = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = `${Math.min(index, 5) * 90}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("in");
          io.unobserve(el);
          // Hand the element back to its normal styles (hover effects etc.) once revealed.
          setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.style.transitionDelay = "";
          }, 1200);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
