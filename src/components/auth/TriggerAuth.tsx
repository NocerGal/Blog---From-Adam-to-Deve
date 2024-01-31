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
        <AlertDialogHeader>
          <AlertDialogTitle>{props.alertTitle}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={async () =>
              props.optionalCallBackUrl === null
                ? signIn()
                : signIn('github', props.optionalCallBackUrl)
            }
          >
            Connect with Github
          </Button>
          <Button onClick={async () => await signOut({ callbackUrl: '/' })}>
            <MailIcon size={16} className="mr-2" /> Disconnect
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
