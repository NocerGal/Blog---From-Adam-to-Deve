import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const LikedPostsSkeleton = () => {
  return (
    <Card className="flex flex-col gap-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-[216px] w-full" />
      ))}
    </Card>
  );
};
