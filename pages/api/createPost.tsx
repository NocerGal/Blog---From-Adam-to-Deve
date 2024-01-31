import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handlerCreatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const { title, postDescription, tag, content } = req.body;

    if (!session || !session.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          title: title,
          postDescription: postDescription,
          content: content,
          createdAt: new Date(),
          authorId: session.user.id,
        },
      });

      const newPostId = await prisma.post.findFirst({
        where: {
          title: title,
        },
      });

      await prisma.tag.update({
        where: { id: tag },
        data: {
          posts: {
            connect: [{ id: newPostId?.id }],
          },
        },
      });

      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
