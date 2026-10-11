"use client";
import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [w, setW] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        setW(p * 100);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
      <div className="h-full bg-[var(--accent)] transition-[width] duration-75 ease-out" style={{ width: `${w}%` }} />
    </div>
  );
}
