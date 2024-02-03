import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getAllPostById = async (postId: string) => {
  const findPostById = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      title: true,
      postDescription: true,
    },
  });

  return findPostById;
};

export type getAllPostByIdType = NonNullable<
  Prisma.PromiseReturnType<typeof getAllPostById>
>;
