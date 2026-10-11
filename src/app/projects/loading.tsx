import { Skeleton } from "@/components/Skeleton";
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-6">
      <div className="pt-8 sm:pt-12">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="mt-4 h-10 w-80" />
        <Skeleton className="mt-3 h-16 w-full max-w-[60ch]" />
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
        <Skeleton className="h-56" />
      </div>
    </div>
  );
}