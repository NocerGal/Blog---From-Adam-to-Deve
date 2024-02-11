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
import { MailIcon } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Loader from '../ui/loader';
export type LoginButtonProps = {};

export const LoginButton = (props: LoginButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect</AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col items-center">
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with Gmail or Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={async () => signIn()}>Connect with Github</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
