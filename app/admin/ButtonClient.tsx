'use client';

import { Button } from '@/components/ui/button';

type ButtonClientType = {
  postId: string;
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
  postId,
  buttonText,
  variant,
}: ButtonClientType) {
  return (
    <Button onClick={() => onClickFunction(postId)} variant={variant}>
      {buttonText}
    </Button>
  );
}
