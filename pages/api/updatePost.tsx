import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handlerUpdatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions);
    const reqBody = req.body;
    const postId = reqBody.postId as string;
    const title = reqBody.title as string;
    const postDescription = reqBody.postDescription as string;
    const content = reqBody.content as string;

    if (!session || !session.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = {
      title,
      postDescription,
      content,
    };
    try {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: data,
      });

      res.status(200).json('res 200');
    } catch (error) {
      console.error('Error in formUpdatePost', error);
      res.status(500).json({ error: 'Failed to update the post' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
