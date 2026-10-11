"use client";
import { useProgress } from "@/components/ProgressProvider";
import { Rocket, Check, Trophy } from "lucide-react";
import Link from "next/link";

export function ProjectShipButton({ projectId, title }: { projectId: string; title: string }){
  const { projectsDone, toggleProject, achievements } = useProgress();
  const done = !!projectsDone[projectId];
  const allDone = Object.values(projectsDone).filter(Boolean).length >= 3;

  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-[14px] border p-4 animate-in ${done ? "bg-[var(--accent-soft)]" : "bg-[var(--surface)]"}`} style={{ borderColor: done ? "rgba(245,158,11,0.3)" : "var(--border)" }}>
      <button
        onClick={()=> toggleProject(projectId)}
        className={`inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold transition ${done ? "bg-[var(--success)] text-white" : "bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)]"}`}
      >
        {done ? <><Check size={16} /> Shipped ✓</> : <><Rocket size={16} /> Mark as shipped</>}
      </button>
      <span className="text-sm text-[var(--text-muted)]">{done ? `You shipped ${title}.` : "Tap when you have deployed this project."}</span>
      {done && allDone && (
        <Link href="/certificate" className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black animate-bounce-subtle">
          <Trophy size={14} /> View certificate
        </Link>
      )}
    </div>
  );
}
