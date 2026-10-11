"use client";
import Link from "next/link";
import { useProgress } from "./ProgressProvider";
import { Award, ArrowRight } from "lucide-react";

export function CertBadge(){
  const { isComplete } = useProgress();
  if(!isComplete) return null;
  return (
    <Link href="/certificate" className="flex items-center gap-3 rounded-[12px] border px-4 py-3 animate-in hover:bg-[var(--surface-raised)] transition" style={{ borderColor:"rgba(245,158,11,0.35)", background:"rgba(245,158,11,0.08)" }}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-black"><Award size={18} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Certificate ready</p>
        <p className="text-xs text-[var(--text-muted)]">All lessons and projects complete — claim yours.</p>
      </div>
      <ArrowRight size={16} className="shrink-0 text-[var(--text-muted)]" />
    </Link>
  );
}
