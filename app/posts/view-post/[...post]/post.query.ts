'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export const postQueryPostDatas = async (postid: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postid,
    },
    select: {
      title: true,
      postDescription: true,
      content: true,
      image: true,
      likedBy: true,
      authorId: true,
    },
  });

  return post;
};

export type postQueryPostDatasTypes = Prisma.PromiseReturnType<
  typeof postQueryPostDatas
>;

export const postQueryAuthorDatas = async (authorId: string) => {
  const authorDatas = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
    select: {
      selfDescription: true,
      name: true,
      image: true,
    },
  });

  return authorDatas;
};

export const postQueryIsUserLike = async (postId: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const user = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      likedBy: true,
    },
  });

  const isUserLiked = user?.likedBy.some((user) => {
    return user.id === userId;
  });

  return isUserLiked;
};
