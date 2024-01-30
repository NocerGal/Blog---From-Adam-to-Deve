import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getAllPosts = async () => {
  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      postDescription: true,
      updatedAt: true,
      author: true,
    },
  });

  const getAllPostsSortByDate = (await allPosts).sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return getAllPostsSortByDate;
};

export type getAllPostsType = NonNullable<
  Prisma.PromiseReturnType<typeof getAllPosts>
>;

export type postType = getAllPostsType[0];
