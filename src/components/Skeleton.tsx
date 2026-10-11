export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-[10px] ${className}`} style={{ background: "var(--surface-raised)", border: "1px solid var(--border)" }} aria-hidden />;
}

export function ModuleCardSkeleton() {
  return (
    <div className="rounded-[14px] border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
        <div className="h-5 w-16 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
      </div>
      <div className="mt-3 h-3 w-16 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-2 h-5 w-3/4 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-2 h-4 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      <div className="mt-4 flex gap-3">
        <div className="h-3 w-20 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
        <div className="h-3 w-14 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
      </div>
      <div className="mt-4 h-1.5 w-full animate-pulse rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

export function LessonListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-[14px] border p-4 sm:p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
            <div className="h-3 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          </div>
          <div className="hidden h-9 w-9 shrink-0 animate-pulse rounded-full sm:block" style={{ background: "var(--surface-raised)" }} />
        </div>
      ))}
    </div>
  );
}

export function LessonPageSkeleton() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="pt-6 sm:pt-8 flex justify-between gap-3">
        <div className="h-4 w-28 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
        <div className="h-6 w-32 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
      </div>
      <div className="mt-4 h-1.5 w-full animate-pulse rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="h-4 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="h-4 w-5/6 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="h-[280px] w-full animate-pulse rounded-[14px]" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
          <div className="h-24 w-full animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
        </div>
        <div className="hidden lg:block">
          <div className="h-[420px] w-full animate-pulse rounded-[14px]" style={{ background: "var(--surface)" }} />
        </div>
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
      <div className="pt-8 sm:pt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="h-6 w-72 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
          <div className="h-12 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="h-12 w-3/4 animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="h-4 w-full animate-pulse rounded" style={{ background: "var(--surface-raised)" }} />
          <div className="flex gap-3">
            <div className="h-11 w-40 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
            <div className="h-11 w-32 animate-pulse rounded-full" style={{ background: "var(--surface-raised)" }} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 animate-pulse rounded-[12px]" style={{ background: "var(--surface)" }} />
            <div className="h-16 animate-pulse rounded-[12px]" style={{ background: "var(--surface)" }} />
            <div className="h-16 animate-pulse rounded-[12px]" style={{ background: "var(--surface)" }} />
          </div>
        </div>
        <div className="h-[360px] animate-pulse rounded-[16px]" style={{ background: "var(--surface)" }} />
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ModuleCardSkeleton />
        <ModuleCardSkeleton />
        <ModuleCardSkeleton />
        <ModuleCardSkeleton />
        <ModuleCardSkeleton />
        <ModuleCardSkeleton />
      </div>
    </div>
  );
}