'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export const postsQueryPostsLikedByUser = async () => {
  const session = await getServerSession(authOptions);

  const postsLiked = await prisma.user.findMany({
    where: {
      id: session?.user.id,
    },
    select: {
      likedPosts: true,
    },
  });

  return postsLiked;
};
