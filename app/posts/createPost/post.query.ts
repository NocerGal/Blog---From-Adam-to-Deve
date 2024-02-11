'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export const postQueryPostId = async (postTitle: string) => {
  const session = await getServerSession(authOptions);

  const post = await prisma.post.findMany({
    where: {
      title: postTitle,
      authorId: session?.user.id,
    },
    select: {
      title: true,
      id: true,
      updatedAt: true,
      published: true,
    },
  });
  return post[0];
};
