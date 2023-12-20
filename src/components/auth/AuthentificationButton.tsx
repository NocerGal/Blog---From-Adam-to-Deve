import { getServerSession } from 'next-auth';
import { LoggedInButton } from './LoggedInButton';
import { LoginButton } from './LoginButton';

export type AuthentificationButtonProps = {};

export const AuthentificationButton = async (
  props: AuthentificationButtonProps
) => {
  console.log();
  console.log('Luc');

  // if (!session) {
  // console.log(session?.user?.email);
  return <LoginButton />;
  // }
  // return <LoggedInButton />;
};
