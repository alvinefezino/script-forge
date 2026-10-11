"use client";
import { useProgress } from "./ProgressProvider";
import { X, Trophy, Flame, Star } from "lucide-react";

export function ToastStack(){
  const { toasts, dismissToast } = useProgress();
  if(!toasts.length) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 md:bottom-6 md:items-end md:px-6">
      {toasts.map(t=>(
        <div key={t.id} className="pointer-events-auto flex min-w-[280px] max-w-[360px] items-center gap-3 rounded-[12px] border bg-[var(--surface)] px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] animate-toast-in" style={{ borderColor: t.kind==="achievement" ? "rgba(245,158,11,0.35)" : "var(--border)" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ background: t.kind==="achievement" ? "var(--accent)" : t.kind==="streak" ? "rgba(245,158,11,0.14)" : "white", color: t.kind==="achievement"||t.kind==="streak" ? undefined : "black" }}>
            {t.kind==="achievement" ? <Trophy size={16} className="text-black" /> : t.kind==="streak" ? <Flame size={16} className="text-[var(--accent)]" /> : <Star size={16} fill="currentColor" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-none">{t.title}</p>
            {t.desc && <p className="mt-1 truncate text-xs leading-none text-[var(--text-muted)]">{t.desc}</p>}
          </div>
          <button onClick={()=>dismissToast(t.id)} className="shrink-0 rounded-full p-1 text-[var(--text-faint)] hover:text-white" aria-label="Dismiss"><X size={14} /></button>
        </div>
      ))}
    </div>
  );
}
