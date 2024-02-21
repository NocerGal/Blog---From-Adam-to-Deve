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
import { Github, GithubIcon } from 'lucide-react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';

export const LoginButton = () => {
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
            <Button onClick={async () => signIn()}>Connect with Github</Button>
            <AlertDialogCancel>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
