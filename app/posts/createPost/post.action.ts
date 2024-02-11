'use server';

import prisma from '@/lib/prisma';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

type dataProps = {
  title: string;
  imageUrl?: string;
  postDescription: string;
  tag: string;
  content: string;
};

export const postActionCreate = async (data: dataProps) => {
  const session = await getServerSession(authOptions);
  await prisma.post.create({
    data: {
      title: data.title,
      postDescription: data.postDescription,
      content: data.content,
      createdAt: new Date(),
      authorId: session?.user.id,
    },
  });

  const newPostId = await prisma.post.findFirst({
    where: {
      title: data.title,
      authorId: session?.user.id,
    },
  });

  await prisma.tag.update({
    where: { id: data.tag },
    data: {
      posts: {
        connect: [{ id: newPostId?.id }],
      },
    },
  });
};
