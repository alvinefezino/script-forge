"use client";
import { useProgress } from "./ProgressProvider";
import { X, Trophy, Sparkles } from "lucide-react";
import { useEffect } from "react";

export function AchievementModal(){
  const { recentUnlocks, clearRecentUnlocks, xp, level } = useProgress();
  const cur = recentUnlocks[0];
  useEffect(()=>{
    if(cur) document.body.style.overflow="hidden";
    else document.body.style.overflow="";
    return ()=>{ document.body.style.overflow=""; };
  },[cur]);
  if(!cur) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] animate-fade-in" onClick={clearRecentUnlocks} />
      <div className="relative w-full max-w-[380px] overflow-hidden rounded-[16px] border bg-[var(--surface)] shadow-[0_20px_80px_rgba(0,0,0,0.6)] animate-modal-in" style={{ borderColor:"rgba(245,158,11,0.35)" }}>
        <button onClick={clearRecentUnlocks} className="absolute right-3 top-3 rounded-full border p-2 text-[var(--text-muted)] hover:text-white" style={{ borderColor:"var(--border)" }} aria-label="Close"><X size={14} /></button>
        <div className="px-6 pb-6 pt-8 text-center">
          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--accent)] text-black animate-bounce-subtle"><Trophy size={32} /></div>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold tracking-widest text-[var(--accent)]"><Sparkles size={12} aria-hidden /> ACHIEVEMENT UNLOCKED</p>
          <h3 className="mt-3 text-[22px] font-semibold tracking-tight">{cur.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{cur.desc}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black"><Trophy size={14} aria-hidden /> +{cur.xp} XP · Lv {level} · {xp} total</div>
          <button onClick={clearRecentUnlocks} className="mt-6 w-full rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-black hover:bg-[var(--accent-hover)] active:bg-[var(--accent-pressed)]">Continue</button>
          {recentUnlocks.length>1 && <p className="mt-3 text-xs text-[var(--text-faint)]">+{recentUnlocks.length-1} more — they will appear next</p>}
        </div>
      </div>
    </div>
  );
}
