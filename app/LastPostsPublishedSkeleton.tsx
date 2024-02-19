import { Skeleton } from '@/components/ui/skeleton';

export type LastPostsPublishedSkeletonProps = {};

export const LastPostsPublishedSkeleton = () => {
  return (
    <div className="mb-4">
      <h2 className="mb-4">Last posts</h2>
      <div className="flex flex-col md:flex-row gap-2 h-full w-full">
        {Array.from({ length: 3 })
          .slice(0, 3)
          .map((_, index) => (
            <div key={index} className="h-[140px] md:h-[198px] w-full md:w-1/3">
              <Skeleton className="h-full rounded-lg" key={index} />
            </div>
          ))}
      </div>
    </div>
  );
};
