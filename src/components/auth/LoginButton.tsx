'use client';
import { useMutation } from '@tanstack/react-query';

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with Gmail or Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={async () => signIn()}>Connect with Github</Button>
          <Button onClick={async () => await signOut()}>
            <MailIcon size={16} className="mr-2" /> Disconnect
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
