'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { authentificatedAction } from '@/lib/action';
import { revalidatePath } from 'next/cache';

const dataPropsType = z.object({
  title: z.string(),
  imageUrl: z.string().optional(),
  postDescription: z.string(),
  tag: z.string(),
  content: z.string(),
});

export const postActionCreate = authentificatedAction(
  dataPropsType,

  async (props, { userId }) => {
    const title = props.title;
    const postDescription = props.postDescription;
    const imageUrl = props.imageUrl;
    const content = props.content;
    const tag = props.tag;

    const newPost = await prisma.post.create({
      data: {
        title: title,
        postDescription: postDescription,
        content: content,
        createdAt: new Date(),
        image: imageUrl,
        authorId: userId,
      },
    });

    const updateTags = await prisma.tag.update({
      where: { id: tag },
      data: {
        posts: {
          connect: [{ id: newPost.id }],
        },
      },
    });

    revalidatePath('/admin');

    return { message: 'Your post has been posted', newPost };
  }
);
