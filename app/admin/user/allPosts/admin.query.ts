import prisma from '@/lib/prisma';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export const adminQueryUserPosts = async () => {
  const session = await getServerSession(authOptions);

  const posts = await prisma.user.findMany({
    where: {
      id: session?.user.id,
    },
    select: {
      id: true,
      posts: true,
    },
  });

  return posts[0];
};
