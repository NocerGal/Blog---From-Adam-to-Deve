'use client';

import { Button } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

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

export function ButtonClient(props: ButtonClientType) {
  return (
    <Button
      onClick={() => props.onClickFunction(props.unpublishedPostId)}
      variant={props.variant}
    >
      {props.buttonText}
    </Button>
  );
}
