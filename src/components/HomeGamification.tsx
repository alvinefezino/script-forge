"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useProgress } from "./ProgressProvider";
import { Flame, Trophy, Award, Star, ChevronRight } from "lucide-react";

function firstName(user:any){
  const f=user?.user_metadata?.full_name as string|undefined;
  if(f && f.trim()) return f.trim().split(/\s+/)[0];
  return null;
}

export function HomeGamification(){
  const { user } = useAuth();
  const { streak, xp, level, xpInfo, completedCount, isComplete, achievements } = useProgress();
  const name = user ? firstName(user) : null;
  if(!user) return null;
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="mt-6 rounded-[16px] border p-4 sm:p-5 animate-in" style={{ borderColor:"var(--border)", background:"var(--surface)" }}>
        {name && <p className="text-[22px] font-semibold tracking-tight sm:text-[26px]">Welcome {name}</p>}
        {!name && <p className="text-sm text-[var(--text-muted)]">Welcome back</p>}
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--bg)" }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[var(--text-muted)]"><Flame size={12} className="text-[var(--accent)]" /> STREAK</div>
            <p className="mt-1 text-xl font-semibold">{streak} day{streak===1?"":"s"}</p>
            <p className="text-xs text-[var(--text-faint)]">Keep it alive — learn daily</p>
          </div>
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--bg)" }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[var(--text-muted)]"><Star size={12} /> LEVEL {level}</div>
            <p className="mt-1 text-xl font-semibold">{xp} XP</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background:"var(--surface-raised)" }}><div className="h-full bg-[var(--accent)] transition-all duration-700" style={{ width: `${Math.round(xpInfo.pct*100)}%` }} /></div>
            <p className="mt-1 text-[11px] text-[var(--text-faint)]">{xpInfo.into}/{xpInfo.span} to Lv {level+1}</p>
          </div>
          <div className="rounded-[12px] border p-3" style={{ borderColor:"var(--border)", background:"var(--bg)" }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[var(--text-muted)]"><Trophy size={12} /> PROGRESS</div>
            <p className="mt-1 text-xl font-semibold">{completedCount}/27</p>
            <p className="text-xs text-[var(--text-faint)]">{achievements.length} achievements · {isComplete ? "Certificate ready" : `${27-completedCount} to go`}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/achievements" className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium hover:bg-[var(--surface-raised)]" style={{ borderColor:"var(--border)" }}>Achievements <ChevronRight size={14} /></Link>
          <Link href="/certificate" className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold ${isComplete ? "bg-[var(--accent)] text-black" : "border text-[var(--text-muted)]"}`} style={isComplete?{}:{ borderColor:"var(--border)"}}><Award size={14} /> {isComplete ? "View certificate" : "Certificate locked"}</Link>
        </div>
      </div>
    </div>
  );
}
