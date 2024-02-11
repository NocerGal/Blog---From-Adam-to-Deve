'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export const postQueryDatas = async (postId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      postDescription: true,
      content: true,
      author: true,
    },
  });
  return post;
};

export type postQueryDatasType = NonNullable<
  Prisma.PromiseReturnType<typeof postQueryDatas>
>;
