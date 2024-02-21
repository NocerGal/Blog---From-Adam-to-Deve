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
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export const LoginButton = () => {
  const mutation = useMutation({ mutationFn: async () => signIn() });

  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader className="gap-2">
          <GitHubLogoIcon height={32} width={32} className="m-auto" />
          <AlertDialogTitle>Connect with Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter className=" gap-2 m-auto">
            <Button onClick={async () => mutation.mutate()}>
              {mutation.isPending ? (
                <Loader2 className="mr-2 animate-spin" size={16} />
              ) : (
                <Loader2 className="mr-2 animate-spin" size={16} />
              )}
              Login with Github
            </Button>
            <AlertDialogCancel>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
