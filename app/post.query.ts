import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const postQueryAllTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {},
      },
    },
  });

  return tags;
};

export const postQueryUsedTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: { published: true },
      },
    },
  });

  return tags;
};

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

export const postQueryPostsByAuthor = async (authorId: string) => {
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

  const userPostsSortByDate = (await userPosts).sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return userPostsSortByDate;
};

export type userPostType = NonNullable<
  Prisma.PromiseReturnType<typeof postQueryPostsByAuthor>
>;
