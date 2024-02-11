import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getUserPosts } from '../findPost';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ButtonClient } from './ButtonClient';
import { UpdateAdminDatasForm } from './UpdateAdminDatasForm';
import { adminActionDeletePost, adminActionPublishPost } from './admin.action';

export default async function pageAdmin() {
  const session = await getServerSession(authOptions);

  if (session === null || session.user.id === undefined) {
    redirect('/admin/error');
  }

  const getUserDatas = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
      selfDescription: true,
      name: true,
      image: true,
    },
  });

  const getAllUnpublishedPosts = await prisma.post.findMany({
    where: {
      published: false,
    },
  });

  const userPosts = await getUserPosts(session.user.id);

  const handleDeletePost = async (postId: string) => {
    'use server';

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath('/admin');
    redirect('/admin');
  };

  return (
    <div className="flex flex-col gap-6">
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
                        className="whitespace-nowrap overflow-hidden text-ellipsis sm:w-[100px]"
                        title={post.title}
                      >
                        {post.title}
                      </h3>

                      <Badge
                        variant={post.published ? 'default' : 'destructive'}
                      >
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
              <Link href={'/admin/user/allPosts'}>
                <Button>View more</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="flex-[2]">
            <CardHeader>
              <h2>Your informations</h2>
            </CardHeader>
            <CardContent>
              <UpdateAdminDatasForm userDatas={getUserDatas} />
            </CardContent>
          </Card>
        </div>
      </div>
      {getUserDatas?.role == 'ADMIN' && (
        <div>
          <Card className="px-4 pb-6">
            <CardHeader>
              <h2>All post to review</h2>
            </CardHeader>
            <div className="flex flex-col gap-4">
              {getAllUnpublishedPosts.map((unpublishedPost) => {
                return (
                  <Card
                    className="flex justify-between"
                    key={unpublishedPost.id}
                  >
                    <CardHeader>
                      <CardTitle>{unpublishedPost.title}</CardTitle>
                    </CardHeader>
                    <div className="flex items-center gap-2 pr-6">
                      <Link
                        href={`/admin/preview-unpblished-post/${unpublishedPost.id}`}
                      >
                        <Button variant={'secondary'}>Preview</Button>
                      </Link>

                      <ButtonClient
                        onClickFunction={adminActionPublishPost}
                        buttonText="Publish post"
                        postId={unpublishedPost.id}
                        variant={'default'}
                      />
                      <ButtonClient
                        onClickFunction={adminActionDeletePost}
                        buttonText="Delete post"
                        postId={unpublishedPost.id}
                        variant={'destructive'}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
