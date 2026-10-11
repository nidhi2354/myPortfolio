import { useEffect, useState } from "react";

/** Counts "3+" up from 0 when it appears. Non-numeric values ("MERN") render as-is. */
export default function CountUp({ value, duration = 1200 }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const [n, setN] = useState(match ? 0 : null);

  useEffect(() => {
    if (!match) return;
    const target = Number(match[1]);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{match ? `${n}${match[2]}` : value}</span>;
}
