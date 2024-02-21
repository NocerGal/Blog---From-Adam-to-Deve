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
import { Heart, Loader2, LogOut, Settings, User } from 'lucide-react';
import { Session } from 'next-auth';
import { createHash } from 'crypto';
import { useMutation } from '@tanstack/react-query';

export type LoggedInButtonProps = {
  user: Session['user'];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut({ callbackUrl: '/' });
    },
  });

  function hashName(name: string) {
    return createHash('sha256').update(name).digest('hex');
  }

  const hashedName =
    props.user.name == null || props.user.name == undefined
      ? 'error'
      : hashName(props.user.name);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <AlertDialog>
          <DropdownMenuTrigger className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={
                  props.user.image ??
                  `https://api.dicebear.com/7.x/lorelei/svg?seed=${hashedName}`
                }
                alt={props.user.name ?? 'user picture'}
              />

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
            <DropdownMenuSeparator />
            <Link href="/posts/posts-liked">
              <DropdownMenuItem className="flex gap-2 cursor-pointer">
                <Heart className="cursor-pointer" size={18} />
                Liked Posts
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button onClick={() => mutation.mutate()} variant="destructive">
                  {mutation.isPending ? (
                    <Loader2 className="mr-2 animate-spin" size={16} />
                  ) : (
                    <LogOut className="mr-2" size={16} />
                  )}
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
