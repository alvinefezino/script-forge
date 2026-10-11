import { Skeleton } from "@/components/Skeleton";
export default function Loading() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 pb-24 sm:px-6">
      <Skeleton className="mt-8 h-10 w-64" />
      <Skeleton className="mt-4 h-24 w-full" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    </div>
  );
}