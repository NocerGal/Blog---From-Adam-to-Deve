import { Skeleton } from '@/components/ui/skeleton';

export type UserInformationsSkeletonProps = {};

export const UserInformationsSkeleton = (
  props: UserInformationsSkeletonProps
) => {
  return <Skeleton className="flex-[2] h-[496px]" />;
};
