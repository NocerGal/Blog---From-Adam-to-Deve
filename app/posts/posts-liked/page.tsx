import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { postsQueryPostsLikedByUser } from './postLiked.query';
import { LikedPosts } from './likedPosts';
import { Suspense } from 'react';
import { LikedPostsSkeleton } from './LikedPostsSkeleton';

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
