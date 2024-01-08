import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getAllPosts = async () => {
  const post = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      postDescription: true,
      updatedAt: true,
      author: true,
    },
  });

  return post;
};

export type getAllPostsType = NonNullable<
  Prisma.PromiseReturnType<typeof getAllPosts>
>;

export type postType = getAllPostsType[0];
