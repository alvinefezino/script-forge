"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Progress = Record<string, boolean>;
const KEY = "sf_progress_v1";

const Ctx = createContext<{
  done: Progress;
  toggle: (id: string) => void;
  completedCount: number;
}>({ done: {}, toggle: () => {}, completedCount: 0 });

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState<Progress>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {}
  }, [done]);

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const completedCount = Object.values(done).filter(Boolean).length;

  return <Ctx.Provider value={{ done, toggle, completedCount }}>{children}</Ctx.Provider>;
}

export function useProgress() {
  return useContext(Ctx);
}
