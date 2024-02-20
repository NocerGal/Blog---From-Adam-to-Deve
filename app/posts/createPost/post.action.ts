'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { authentificatedAction } from '@/lib/action';
import { revalidatePath } from 'next/cache';

type dataProps = {
  title: string;
  imageUrl?: string;
  postDescription: string;
  tag: string;
  content: string;
};

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
    const content = props.content;
    const tag = props.tag;

    const newPost = await prisma.post.create({
      data: {
        title: title,
        postDescription: postDescription,
        content: content,
        createdAt: new Date(),
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

// export const postActionCreate = async (data: dataProps) => {
// const session = await getServerSession(authOptions);
// await prisma.post.create({
//   data: {
//     title: data.title,
//     postDescription: data.postDescription,
//     content: data.content,
//     createdAt: new Date(),
//     authorId: session?.user.id,
//   },
// });
// const newPostId = await prisma.post.findFirst({
//   where: {
//     title: data.title,
//     authorId: session?.user.id,
//   },
// });
// await prisma.tag.update({
//   where: { id: data.tag },
//   data: {
//     posts: {
//       connect: [{ id: newPostId?.id }],
//     },
//   },
//   // });
// };
