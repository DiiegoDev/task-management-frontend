import { Skeleton } from "@/components/ui/skeleton";

export function TaskSkeleton() {
  return (
    <div className="w-full border mt-10 p-1 flex flex-col gap-1">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
}
