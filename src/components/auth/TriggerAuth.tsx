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
import { MailIcon } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

type TriggerAuthType = {
  trigger: React.ReactElement;
  alertTitle: string;
  optionalCallBackUrl?: SignInOptions;
};

export default function TriggerAuth(props: TriggerAuthType) {
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
          <Button
            onClick={async () =>
              props.optionalCallBackUrl === null
                ? signIn()
                : signIn('github', props.optionalCallBackUrl)
            }
          >
            <AlertDialogTitle>Connect with Github</AlertDialogTitle>
          </Button>
          <AlertDialogCancel>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
