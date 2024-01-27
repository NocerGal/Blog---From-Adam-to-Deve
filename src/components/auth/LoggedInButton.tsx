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
import { Heart, LogOut, Settings, User } from 'lucide-react';

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
            <div className="hidden sm:block">{props.user.name}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/admin">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Settings className="cursor-pointer" size={18} />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/admin/user/allPosts">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <User className="cursor-pointer" size={18} />
                Your Posts
              </DropdownMenuItem>
            </Link>
            <Link href="/likedPost">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Heart className="cursor-pointer" size={18} />
                azraLiked Posts
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <LogOut className="hover:bg-destructive" size={18} />
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

                <Button onClick={() => signOut()} variant="destructive">
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
