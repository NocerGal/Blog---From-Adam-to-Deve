'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authentificatedAction } from '@/lib/action';
import { z } from 'zod';

const postActionIncrementLikeProps = z.object({
  postId: z.string(),
});

const postActionDecrementLikeProps = z.object({
  postId: z.string(),
});

export const postActionIncrementLike = authentificatedAction(
  postActionIncrementLikeProps,
  async (props, { userId }) => {
    const postId = props.postId;
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

    return {
      message: 'You like this post!',
      post,
    };
  }
);

export const postActionDecrementLike = authentificatedAction(
  postActionDecrementLikeProps,
  async (props, { userId }) => {
    const postId = props.postId;
    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedBy: {
          disconnect: [{ id: userId }],
        },
      },
    });
    revalidatePath(`/posts/view-post/${postId}`);

    return {
      message: 'You have unlike this post!',
      post,
    };
  }
);
