'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authentificatedAction } from '@/lib/action';
import { z } from 'zod';
import firstLetterIntoUppercase from '@/utils/firstLetterIntoUppercase';

const adminActionEditUserDatasType = z.object({
  selfDescription: z.string().optional(),
  name: z.string(),
  image: z.string().optional(),
});

const adminActionPublishPostType = z.object({
  postId: z.string(),
});

const adminActionDeletePostType = z.object({
  postId: z.string(),
});

const adminActionCreateTagType = z.object({
  newTag: z.string(),
});

const userActionDeletePostType = z.object({
  postId: z.string(),
});

export const adminActionEditUserDatas = authentificatedAction(
  adminActionEditUserDatasType,
  async (props, { userId }) => {
    const updateUserDatas = await prisma.user.update({
      where: {
        id: userId,
      },
      data: props,
    });
    revalidatePath('/admin');
    return {
      message: 'You successfully updated your informations',
      updateUserDatas,
    };
  }
);

export const adminActionPublishPost = authentificatedAction(
  adminActionPublishPostType,
  async (props, { isUserAdmin }) => {
    const postId = props.postId;

    if (!isUserAdmin) {
      throw new Error('You are unauthorized to publish post');
    }

    const publishPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: true,
      },
    });

    revalidatePath('/admin');

    return { message: 'You successfully publish this post!' };
  }
);

export const adminActionDeletePost = authentificatedAction(
  adminActionDeletePostType,
  async (props, { isUserAdmin }) => {
    const postId = props.postId;

    if (!isUserAdmin) {
      throw new Error('You are unauthorized to delete post');
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath('/admin');

    return { message: 'You successfully deleted this post', deletePost };
  }
);

export const userActionDeletePost = authentificatedAction(
  userActionDeletePostType,
  async (props, { userId }) => {
    const postId = props.postId;

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    revalidatePath('/admin');

    return { message: 'You successfully deleted this post', deletePost };
  }
);

export const adminActionCreateTag = authentificatedAction(
  adminActionCreateTagType,
  async (props, { isUserAdmin }) => {
    const newTag = firstLetterIntoUppercase(props.newTag);

    if (!isUserAdmin) {
      throw new Error('You are not authorized to create a tag');
    }
    if (newTag === '') {
      return { error: 'you didnt write any tag' };
    }

    const createNewTag = await prisma.tag.upsert({
      where: {
        name: newTag,
      },
      update: {},
      create: {
        name: newTag,
      },
    });

    return {
      message: 'You succeed to create a new tag',
      createNewTag,
    };
  }
);
