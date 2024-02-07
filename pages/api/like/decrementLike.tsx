import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handlerUpdatePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user.id) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const userId = session.user.id;
      const postId = req.body;

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
      res.status(200).json(postId);
    } catch (error) {
      console.log('API LIKE DOESNT WORK');
      res.status(500).json({ error: 'Error API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
