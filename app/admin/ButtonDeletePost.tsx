'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminActionDeletePost } from './admin.action';

type ButtoButtonDeletePostClientType = {
  postId: string;
  buttonText: string;
};

export function ButtoButtonDeletePostClient({
  postId,
  buttonText,
}: ButtoButtonDeletePostClientType) {
  const handleButtonClick = async (postId: string) => {
    const { data, serverError } = await adminActionDeletePost({
      postId: postId,
    });

    if (!data) {
      toast.error('Error to delete this post');
    }
    toast.success('You successfully deleted this post');
  };

  return (
    <Button onClick={() => handleButtonClick(postId)} variant="destructive">
      {buttonText}
    </Button>
  );
}
