import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export type AllUserPostsSkeletonProps = {};

export const AllUserPostsSkeleton = (props: AllUserPostsSkeletonProps) => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[197px] w-full" />
      ))}
    </Card>
  );
};
