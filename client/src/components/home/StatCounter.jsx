import { useEffect, useRef, useState } from "react";

export default function StatCounter({ to = 0, duration = 900 }) {
  const [val, setVal] = useState(0);
  const start = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    const begin = performance.now();
    const from = 0;
    const animate = (t) => {
      const elapsed = t - begin;
      const p = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.floor(from + (to - from) * eased);
      if (current !== start.current) {
        start.current = current;
        setVal(current);
      }
      if (p < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration]);

  return <span>{val.toLocaleString("sq-AL")}</span>;
}
