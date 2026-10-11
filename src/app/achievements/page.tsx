"use client";
import { useProgress } from "@/components/ProgressProvider";
import { ACHIEVEMENTS } from "@/lib/gamification";
import { Trophy, Lock, Check, Flame } from "lucide-react";
import Link from "next/link";

export default function AchievementsPage(){
  const { achievements, xp, level } = useProgress();
  const unlocked = new Set(achievements);
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight sm:text-[26px]">Achievements</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{achievements.length}/{ACHIEVEMENTS.length} unlocked · Lv {level} · {xp} XP</p>
        </div>
        <Link href="/certificate" className="hidden sm:inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Certificate</Link>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map(a=>{
          const done = unlocked.has(a.id);
          return (
            <div key={a.id} className={`rounded-[14px] border p-4 transition ${done ? "bg-[var(--surface)] animate-in" : "bg-[var(--surface)] opacity-60"}`} style={{ borderColor: done ? "rgba(245,158,11,0.3)" : "var(--border)" }}>
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${done ? "bg-[var(--accent)] text-black animate-bounce-subtle" : "bg-[var(--surface-raised)] text-[var(--text-faint)]"}`}>{done ? (a.icon==="flame" ? <Flame size={18} /> : <Trophy size={18} />) : <Lock size={14} />}</div>
                {done && <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black"><Check size={12} /> +{a.xp} XP</span>}
              </div>
              <h3 className="mt-3 text-sm font-semibold">{a.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{a.desc}</p>
              {!done && <p className="mt-2 text-[11px] font-semibold tracking-widest text-[var(--text-faint)]">LOCKED</p>}
            </div>
          );
        })}
      </div>
      <div className="mt-8 rounded-[14px] border p-4 sm:p-5 animate-in" style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
        <div className="flex items-center gap-2 text-sm font-semibold"><Trophy size={16} className="text-[var(--accent)]" /> Keep going</div>
        <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">Complete lessons and projects to unlock more. Each achievement gives XP and levels you up.</p>
        <div className="mt-3 flex gap-2">
          <Link href="/learn/m1l1" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black">Continue learning</Link>
          <Link href="/roadmap" className="rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor:"var(--border)" }}>View roadmap</Link>
        </div>
      </div>
    </div>
  );
}
