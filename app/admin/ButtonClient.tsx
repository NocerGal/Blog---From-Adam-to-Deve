'use client';

import { Button } from '@/components/ui/button';

type ButtonClientType = {
  unpublishedPostId: string;
  buttonText: string;
  onClickFunction: (postId: string) => void;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
};

export function ButtonClient({
  onClickFunction,
  unpublishedPostId,
  buttonText,
  variant,
}: ButtonClientType) {
  return (
    <Button
      onClick={() => onClickFunction(unpublishedPostId)}
      variant={variant}
    >
      {buttonText}
    </Button>
  );
}
