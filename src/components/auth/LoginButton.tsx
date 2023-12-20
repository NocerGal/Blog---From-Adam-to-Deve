'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Github, MailIcon } from 'lucide-react';

import { signIn, signOut } from 'next-auth/react';
export type LoginButtonProps = {};

export const LoginButton = (props: LoginButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with Gmail or Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={async () => await signIn()}>
            <Github size={16} className="mr-2" /> Connect with Github
          </Button>
          <Button onClick={async () => await signOut()}>
            <MailIcon size={16} className="mr-2" /> Connect with Gmail
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
