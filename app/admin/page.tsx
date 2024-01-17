export type pageAdminProps = {};

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getUserPosts } from '../findPost';
import { Badge } from '@/components/ui/badge';

export default async function pageAdmin() {
  const session = await getServerSession(authOptions);
  if (session === null || session.user.id === undefined) {
    return;
  }

  const userPosts = await getUserPosts(session.user.id);

  async function updateUserDatas(formData: FormData) {
    'use server';
    const session = await getServerSession(authOptions);
    const FormSchema = z.object({
      name: z.string().min(3).max(10),
      image: z.string().url(),
    });

    const name = String(formData.get('userName'));
    const image = String(formData.get('urlImage'));

    const safeData = FormSchema.safeParse({
      name,
      image,
    });

    if (!safeData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        'error',
        'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
      );

      redirect('/admin/errordatas');
    }

    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: safeData.data,
    });

    revalidatePath('/admin');
    redirect('/admin');
  }

  return (
    <div>
      <h1 className="mb-4">Settings page</h1>
      <div className="flex flex-col sm:flex-row gap-4 ">
        <Card className="flex-1">
          <CardHeader>
            <h2>Your posts</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {userPosts.slice(0, 3).map((post, index) => (
              <Card className="p-4" key={index}>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <h3
                      className="whitespace-nowrap overflow-hidden text-ellipsis w-[100px]"
                      title={post.title}
                    >
                      {post.title}
                    </h3>

                    <Badge variant={post.published ? 'default' : 'destructive'}>
                      {post.published ? 'Published' : 'Unpublised'}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">
                      {post.updatedAt.toLocaleDateString()}
                    </span>
                    <a
                      href={`/posts/modify-post/${post.id}`}
                      className="bg-muted hover:bg-muted-foreground transition-all py-1 px-2 rounded-lg"
                    >
                      Modify
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="flex-[2]">
          <CardHeader>
            <h2>Your informations</h2>
          </CardHeader>
          <CardContent>
            <form action={updateUserDatas}>
              <div className="mb-4">
                <div className="flex flex-col gap-2">
                  <div>
                    <Label htmlFor="userName">Username</Label>
                    <Input
                      defaultValue={session?.user?.name ?? 'Your username'}
                      name="userName"
                      id="userName"
                    />
                  </div>
                  <div>
                    <Label htmlFor="urlImage">Image</Label>
                    <Input
                      defaultValue={session?.user?.image ?? 'no URL'}
                      name="urlImage"
                      id="urlImage"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-muted rounded-[0.5rem] py-1 px-2 hover:bg-muted-foreground hover:text-foreground transition-all"
              >
                Save changes
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
