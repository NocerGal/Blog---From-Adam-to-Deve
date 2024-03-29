import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const postQueryAllPosts = async () => {
  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      postDescription: true,
      updatedAt: true,
      author: true,
      tags: true,
    },
  });

  const getAllPostsSortByDate = allPosts.sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return getAllPostsSortByDate;
};

export type getAllPostsType = NonNullable<
  Prisma.PromiseReturnType<typeof postQueryAllPosts>
>;

export type postType = getAllPostsType[0];

export const postQueryPublishedPosts = async () => {
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      published: true,
      id: true,
      title: true,
      postDescription: true,
      updatedAt: true,
      author: true,
      tags: true,
    },
  });

  const getAllPostsSortByDate = allPosts.sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return getAllPostsSortByDate;
};
