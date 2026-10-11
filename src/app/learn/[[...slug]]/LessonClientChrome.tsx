"use client";
import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";
import { Check } from "lucide-react";

export function LessonClientChrome({ lessonId, nextHref, prevHref, nextLabel }: { lessonId: string; nextHref: string | null; prevHref: string | null; nextLabel: string | null }) {
  const { done, toggle } = useProgress();
  const isDone = !!done[lessonId];
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        onClick={() => toggle(lessonId)}
        className={`inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold ${isDone ? "bg-[var(--success)] text-white" : "bg-white text-black hover:bg-zinc-100"}`}
      >
        <Check size={16} /> {isDone ? "Completed" : "Mark as completed"}
      </button>
      {nextHref ? (
        <Link href={nextHref} className="inline-flex h-11 items-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-black hover:bg-[var(--accent-hover)]">
          Next: {nextLabel}
        </Link>
      ) : null}
    </div>
  );
}