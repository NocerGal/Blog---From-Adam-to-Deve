import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function PageLikedPosts({
  params,
}: {
  params: { postId: string };
}) {
  const session = getServerSession(authOptions);
  return <div>Liked post</div>;
}
