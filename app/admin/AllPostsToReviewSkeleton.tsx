import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const AllPostsToReviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <Card>
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="h-[66px] w-full" key={index} />
          ))}
        </div>
      </Card>
    </div>
  );
};
