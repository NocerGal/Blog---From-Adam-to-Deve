import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React, { Suspense } from 'react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ButtonClient } from './ButtonClient';

import { UserPosts } from './UserPosts';
import { UserPostsSkeleton } from './UserPostsSkeleton';
import { UserInformations } from './UserInformations';
import { UserInformationsSkeleton } from './UserInformationsSkeleton';
import { AllPostsToReview } from './AllPostsToReview';
import { AllPostsToReviewSkeleton } from './AllPostsToReviewSkeleton';

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
      <Suspense fallback={<p>Ok</p>}>
        {getUserDatas?.role == 'ADMIN' && (
          <div>
            <Suspense fallback={<AllPostsToReviewSkeleton />}>
              <AllPostsToReview userDatas={getUserDatas} />
            </Suspense>
          </div>
        )}
      </Suspense>
    </div>
  );
}
