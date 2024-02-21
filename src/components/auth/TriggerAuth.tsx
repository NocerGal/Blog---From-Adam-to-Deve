'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import React from 'react';

import { Button } from '../ui/button';
import { SignInOptions, signIn, signOut } from 'next-auth/react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { useMutation } from '@tanstack/react-query';
import { Loader2, LogIn } from 'lucide-react';

type TriggerAuthType = {
  trigger: React.ReactElement;
  alertTitle: string;
  optionalCallBackUrl?: SignInOptions;
};

export default function TriggerAuth(props: TriggerAuthType) {
  const mutation = useMutation({
    mutationFn: async () =>
      props.optionalCallBackUrl === null
        ? signIn()
        : signIn('github', props.optionalCallBackUrl),
  });

  return (
    <AlertDialog>
      {/* asChild indique qu'on utlise un élément enfant pour activer le déclencheur */}
      <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-2">
          <GitHubLogoIcon height={32} width={32} className="m-auto" />
          <AlertDialogTitle className="m-auto">
            Connect with Github
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className=" gap-2 m-auto">
          <Button onClick={async () => mutation.mutate()}>
            <AlertDialogTitle className="flex">
              {mutation.isPending ? (
                <Loader2 className="mr-2 my-auto animate-spin" size={16} />
              ) : (
                <LogIn className="my-auto mr-2" size={16} />
              )}
              Login with Github
            </AlertDialogTitle>
          </Button>
          <AlertDialogCancel>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
