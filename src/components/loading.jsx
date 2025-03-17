import { Skeleton } from "src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="h-10 w-32 mb-6">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Kitap Görseli Skeleton */}
        <div className="relative h-[400px] w-full md:col-span-1">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* Kitap Detayları Skeleton */}
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>

          <Skeleton className="h-[1px] w-full" />

          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="pt-4">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
