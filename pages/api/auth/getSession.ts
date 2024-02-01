import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './[...nextauth]';

export default async function getSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);

      if (session) {
        res.status(200).json({ message: 'Authorized', status: 200, session });
      } else {
        res.status(401).json({ message: 'Unauthorized', status: 401 });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', status: 500 });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .end({ message: `Method ${req.method} not allowed`, status: 200 });
  }
}

export type SessionType = {
  message: string;
  status: number;
};
