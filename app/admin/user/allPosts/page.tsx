import React, { Suspense } from 'react';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { adminQueryUserPosts } from './admin.query';
import { AllUserPosts } from './AllUserPosts';
import { AllUserPostsSkeleton } from './AllUserPostsSkeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vos articles',
  description: "Voici l'ensemble des articles que vous avez rédigé",
};

export default async function PageAllUserPosts() {
  const session = await getServerSession(authOptions);

  if (!session === null) {
    return notFound();
  }

  const posts = await adminQueryUserPosts();

  return (
    <Suspense fallback={<AllUserPostsSkeleton />}>
      <AllUserPosts />
    </Suspense>
  );
}
