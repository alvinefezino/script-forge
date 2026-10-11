import { LessonListSkeleton } from "@/components/Skeleton";
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="pt-6 sm:pt-8 h-4 w-28 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-6 rounded-[16px] border p-5 sm:p-7" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="h-5 w-24 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
        <div className="mt-3 h-8 w-3/4 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
        <div className="mt-3 h-4 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      </div>
      <div className="mt-6">
        <LessonListSkeleton count={5} />
      </div>
    </div>
  );
}