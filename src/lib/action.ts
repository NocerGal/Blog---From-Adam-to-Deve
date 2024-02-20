import { getServerSession } from 'next-auth';
import { createSafeActionClient } from 'next-safe-action';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export const action = createSafeActionClient();
export class ServerError extends Error {}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export const authentificatedAction = createSafeActionClient({
  handleReturnedServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message;
    }
    return 'An unexpected error occured';
  },

  middleware: async () => {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    const userId = user?.id;

    if (!userId) {
      throw new ServerError(
        'You must be logged in order to perform this action'
      );
    }
    const checkUserRole = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    const isUserAdmin = checkUserRole?.role === 'ADMIN' ? true : false;

    return {
      userId,
      user,
      isUserAdmin,
    };
  },
});
