'use client';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { signIn } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export const LoginLikeButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={async () => mutation.mutate}>
            {mutation.isPending ? (
              <Loader2 size={16} className="animate-spin mr-2" />
            ) : (
              ''
            )}
            Connect with Github
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
