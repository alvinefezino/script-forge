"use client";
import Link from "next/link";
import type { Module } from "@/data/curriculum";
import { useProgress } from "@/components/ProgressProvider";
import { Clock, BookOpen, ChevronRight } from "lucide-react";

export function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const { done } = useProgress();
  const completed = mod.lessons.filter((l) => done[l.id]).length;
  const totalMins = mod.lessons.reduce((s, l) => s + parseInt(l.duration), 0);
  return (
    <Link
      href={`/modules/${mod.slug}`}
      className="group flex flex-col rounded-[14px] border bg-[var(--surface)] p-4 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)] sm:p-5"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest" style={{ borderColor: "var(--border)", color: mod.track === "TypeScript" ? "var(--accent)" : "var(--text-muted)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: mod.track === "TypeScript" ? "var(--accent)" : "var(--text-muted)" }} aria-hidden />
          {mod.track.toUpperCase()}
        </span>
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold tracking-widest text-black">{mod.level.toUpperCase()}</span>
      </div>
      <p className="mt-3 text-[11px] font-medium tracking-widest text-[var(--text-faint)]">MODULE {(index + 1).toString().padStart(2, "0")}</p>
      <h3 className="mt-1 text-[18px] font-semibold leading-5 tracking-tight group-hover:text-white">{mod.title}</h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[var(--text-muted)]">{mod.blurb}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-[var(--text-faint)]">
        <span className="inline-flex items-center gap-1.5"><BookOpen size={14} />{mod.lessons.length} lessons</span>
        <span className="inline-flex items-center gap-1.5"><Clock size={14} />{totalMins} min</span>
      </div>
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${(completed / mod.lessons.length) * 100}%`, background: completed === mod.lessons.length ? "var(--success)" : "var(--accent)" }} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)]">{completed}/{mod.lessons.length} completed</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white">Open <ChevronRight size={14} /></span>
        </div>
      </div>
    </Link>
  );
}
