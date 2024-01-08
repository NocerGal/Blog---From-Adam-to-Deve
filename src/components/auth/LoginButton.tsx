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
import { Github, MailIcon } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Loader from '../ui/loader';
export type LoginButtonProps = {};

export const LoginButton = (props: LoginButtonProps) => {
  // const mutation = useMutation({ mutationFn: async () => await signIn() });
  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with Gmail or Github</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            // disabled={mutation.isPending}
            // onClick={() => mutation.mutate()}
            onClick={async () => signIn()}
          >
            {/* {mutation.isPending ? (
              <Loader />
            ) : (
              <Github size={16} className="mr-2" />
            )} */}
            Connect with Github
          </Button>
          <Button onClick={async () => await signOut()}>
            <MailIcon size={16} className="mr-2" /> Disconnect
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
