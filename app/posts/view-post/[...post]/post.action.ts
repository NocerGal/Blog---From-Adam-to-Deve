'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const postActionIncrementLike = async (postId: string) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedBy: {
        connect: [{ id: userId }],
      },
    },
  });

  revalidatePath(`/posts/view-post/${postId}`);
};

export const postActionDecrementLike = async (postId: string) => {
  const session = await getServerSession(authOptions);

  const post = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedBy: {
        disconnect: [{ id: session?.user.id }],
      },
    },
  });
  revalidatePath(`/posts/view-post/${postId}`);
};
