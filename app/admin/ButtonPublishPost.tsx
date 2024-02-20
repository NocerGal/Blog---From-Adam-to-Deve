'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminActionPublishPost } from './admin.action';

type ButtonPublishPostProps = {
  postId: string;
  buttonText: string;
};

export const ButtonPublishPost = ({
  postId,
  buttonText,
}: ButtonPublishPostProps) => {
  const handleButtonClick = async (postId: string) => {
    const { data, serverError } = await adminActionPublishPost({
      postId: postId,
    });

    if (!data) {
      toast.error('Error to delete this post');
    }
    toast.success(data?.message);
  };

  return (
    <Button onClick={() => handleButtonClick(postId)} variant="default">
      {buttonText}
    </Button>
  );
};
