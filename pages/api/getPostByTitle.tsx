import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function findPostByTitle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const postTitle = req.query.postTitle as string;

    try {
      const mostRecentUnpublishedUserPost = await prisma.post.findMany({
        where: {
          title: postTitle,
        },
        select: {
          title: true,
          id: true,
          updatedAt: true,
          published: true,
        },
      });
      res.status(200).json(mostRecentUnpublishedUserPost);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
