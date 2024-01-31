import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getAllTags(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const tagObjects = await prisma.tag.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      const tagNames = tagObjects.map((tag) => ({
        id: tag.id,
        name: tag.name,
      }));

      res.status(200).json(tagNames);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
