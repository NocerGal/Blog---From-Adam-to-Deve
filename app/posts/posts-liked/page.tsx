import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { postsQueryPostsLikedByUser } from './postLiked.query';
import { Suspense } from 'react';
import { LikedPostsSkeleton } from './LikedPostsSkeleton';
import { LikedPosts } from './LikedPosts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts aimés',
  description: 'Vous pouvez retrouver les posts que avous avez aimé',
};

export default async function PageLikedPosts() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const postsLiked = (await postsQueryPostsLikedByUser())[0];

  return (
    <div>
      <Suspense fallback={<LikedPostsSkeleton />}>
        <LikedPosts />
      </Suspense>
    </div>
  );
}
