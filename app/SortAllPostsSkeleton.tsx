import { Button } from '@/components/ui/button';
import { CardPost } from './CardPost';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SortAllPostsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button>All</Button>
        {Array.from({ length: 2 }).map((_, index) => (
          <Button
            key={index}
            className="h-[36px] w-[55px]"
            variant="secondary"
          ></Button>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-[140px] ">
            <Card className="w-full h-full rounded-lg" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
};
