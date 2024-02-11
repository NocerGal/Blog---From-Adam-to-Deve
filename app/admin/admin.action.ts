'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { AdminFormSchema } from './admin.schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const adminActionEditUserDatas = async (datas: AdminFormSchema) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: datas,
  });
};

export const adminActionPublishPost = async (postId: string) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      published: true,
    },
  });
  revalidatePath('/admin');
  redirect('/admin');
};

export const adminActionDeletePost = async (postId: string) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  revalidatePath('/admin');
  redirect('/admin');
};
