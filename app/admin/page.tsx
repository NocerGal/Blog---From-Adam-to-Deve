import React, { Suspense } from 'react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { UserPosts } from './UserPosts';
import { UserPostsSkeleton } from './UserPostsSkeleton';
import { UserInformations } from './UserInformations';
import { UserInformationsSkeleton } from './UserInformationsSkeleton';
import { AllPostsToReview } from './AllPostsToReview';
import { AllPostsToReviewSkeleton } from './AllPostsToReviewSkeleton';
import { CreateNewTags } from './CreateNewTags';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings page',
  description: 'Admin page pour vous permettre de modifier vos informations',
};

export default async function pageAdmin() {
  const session = await getServerSession(authOptions);

  if (session === null || session.user.id === undefined) {
    notFound();
  }

  const getUserDatas = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
      selfDescription: true,
      name: true,
      image: true,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-4">Settings page</h1>
        <div className="flex flex-col sm:flex-row gap-4 ">
          <Suspense fallback={<UserPostsSkeleton />}>
            <UserPosts session={session} />
          </Suspense>
          <Suspense fallback={<UserInformationsSkeleton />}>
            <UserInformations session={session} userDatas={getUserDatas} />
          </Suspense>
        </div>
      </div>
      {getUserDatas?.role == 'ADMIN' && (
        <Suspense fallback={<p>Is loading...</p>}>
          <div>
            <Suspense fallback={<AllPostsToReviewSkeleton />}>
              <AllPostsToReview userDatas={getUserDatas} />
            </Suspense>
            <CreateNewTags />
          </div>
        </Suspense>
      )}
    </div>
  );
}
