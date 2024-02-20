'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { adminActionDeletePost } from './admin.action';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

type ButtoButtonDeletePostClientType = {
  postId: string;
  buttonText: string;
};

export function ButtoButtonDeletePostClient({
  postId,
  buttonText,
}: ButtoButtonDeletePostClientType) {
  const router = useRouter();
  const handleButtonClick = async (postId: string) => {
    const { data } = await adminActionDeletePost({
      postId: postId,
    });
    if (!data) {
      toast.error('Error to delete this post');
    }
    toast.success('You successfully deleted this post');

    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex bg-destructive rounded-lg px-4 py-2 hover:bg-destructive/90">
        Delete post
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Are sure to delete this post?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
            onClick={() => handleButtonClick(postId)}
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
