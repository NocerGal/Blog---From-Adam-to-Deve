import { getServerSession } from 'next-auth';
import { LoggedInButton } from './LoggedInButton';
import { LoginButton } from './LoginButton';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export type AuthentificationButtonProps = {};

export const AuthentificationButton = async (
  props: AuthentificationButtonProps
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LoginButton />;
  }

  return <LoggedInButton user={session.user} />;
};
