'use server';

import prisma from '@/lib/prisma';

export const adminQueryUnpublishedPost = async (postId: string) => {
  const unpublishedPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      content: true,
      image: true,
    },
  });

  return unpublishedPost;
};
