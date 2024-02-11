'use server';

import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { ModifyPostFormSchema } from './post.schema';

export const postActionUpdatePost = async (
  data: ModifyPostFormSchema,
  postId: string
) => {
  const session = await getServerSession(authOptions);

  await prisma.post.update({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
    data: data,
  });
};
