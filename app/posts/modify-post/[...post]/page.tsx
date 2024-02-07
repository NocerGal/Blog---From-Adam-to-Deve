import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

import { revalidatePath } from 'next/cache';
import FormUpdatePost from './formUpdatePost';

export default async function PageCreatPost({
  params,
}: {
  params: { post: string };
}) {
  const getPostDatas = await prisma.post.findUnique({
    where: {
      id: params.post[0],
    },
    select: {
      id: true,
      title: true,
      postDescription: true,
      content: true,
      author: true,
    },
  });

  const session = await getServerSession(authOptions);

  if (!getPostDatas || !getPostDatas.author) {
    return <p>Unable to get datas</p>;
  }

  if (!session) {
    return <p>There is not opened session</p>;
  }

  if (getPostDatas.author.id !== session.user.id) {
    return (
      <div>
        <p>Unhautorized to modify post</p>
        <p>You are not the creator of the post</p>
      </div>
    );
  }
  if (params == null || params == undefined) {
    return <p>Error there is no defined user</p>;
  }

  if (!getPostDatas || !getPostDatas.content) {
    return;
  }

  const handleRevalidateAdminPath = async () => {
    'use server';
    revalidatePath('/admin');
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3">
          Modify your article with markdown. Check this{' '}
          <Link
            className="underline hover:text-border"
            href="https://remarkjs.github.io/react-markdown/"
            target="_blank"
          >
            example
          </Link>{' '}
          to write your article
        </p>
        <FormUpdatePost
          postId={params.post}
          postTitle={getPostDatas.title}
          postDescription={getPostDatas.postDescription}
          postContent={getPostDatas.content}
          revalidatePath={handleRevalidateAdminPath}
        />
      </div>
    </div>
  );
}
