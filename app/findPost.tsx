import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getUserPosts = async (authorId: string) => {
  const userPosts = prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    select: {
      title: true,
      id: true,
      updatedAt: true,
      published: true,
    },
  });

  return userPosts;
};
