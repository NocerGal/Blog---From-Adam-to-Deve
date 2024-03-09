'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ButtonClientType = {
  postId: string;
  buttonText: string;
  onClickFunction: (postId: any) => any;
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
  const handleButtonClick = async (postId: string) => {
    const { data, serverError } = await onClickFunction({ postid: postId });

    if (!data) {
      toast.error('Error to delete this post', serverError);
    }
    toast.success('You successfully deleted this post');
  };

  return (
    <Button onClick={() => handleButtonClick(postId)} variant={variant}>
      {buttonText}
    </Button>
  );
}
