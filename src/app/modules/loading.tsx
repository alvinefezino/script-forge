import { ModuleCardSkeleton } from "@/components/Skeleton";
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6 pt-6 sm:pt-8">
      <div className="h-4 w-24 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-6 rounded-[16px] border p-5 sm:p-7" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="h-5 w-32 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
        <div className="mt-4 h-8 w-2/3 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
        <div className="mt-3 h-4 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
        <div className="h-4 w-5/6 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      </div>
      <div className="mt-6 grid gap-3">
        <div className="h-[72px] animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
        <div className="h-[72px] animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
        <div className="h-[72px] animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
        <div className="h-[72px] animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
      </div>
    </div>
  );
}