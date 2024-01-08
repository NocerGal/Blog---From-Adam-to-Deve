'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { signOut } from 'next-auth/react';

import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';

import { Session } from 'next-auth';

export type LoggedInButtonProps = {
  user: Session['user'];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <AlertDialog>
          <DropdownMenuTrigger className="flex gap-2 items-center">
            <Avatar>
              {props.user?.image && (
                <AvatarImage
                  src={
                    props.user.image ??
                    `https://api.dicebear.com/7.x/lorelei/svg?seed=${props.user.name}`
                  }
                  alt={props.user.name ?? 'user picture'}
                />
              )}

              <AvatarFallback>{props.user?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {props.user.name}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/admin">
              <DropdownMenuItem className="flex gap-2">
                <Settings size={18} />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="posts">
              <DropdownMenuItem className="flex gap-2">
                <User size={18} />
                Your Posts
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2">
                <LogOut size={18} />
                LogOut
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="destructive">Cancel</Button>
                </AlertDialogCancel>

                <Button onClick={() => signOut()} variant="secondary">
                  Logout
                </Button>
              </AlertDialogFooter>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </div>
  );
};
