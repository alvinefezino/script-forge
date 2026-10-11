import { Skeleton } from "@/components/Skeleton";
export default function Loading() {
  return (
    <div className="mx-auto max-w-[900px] px-4 pb-24 sm:px-6">
      <Skeleton className="mt-8 h-6 w-40" />
      <Skeleton className="mt-4 h-10 w-72" />
      <Skeleton className="mt-3 h-20 w-full" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}