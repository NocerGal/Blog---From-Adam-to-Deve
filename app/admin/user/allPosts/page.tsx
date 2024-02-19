export type pageAdminProps = {};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { Suspense } from 'react';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ButtonClient } from '../../ButtonClient';
import { adminActionDeletePost } from '../../admin.action';
import { adminQueryUserPosts } from './admin.query';
import { AllUserPosts } from './AllUserPosts';
import { AllUserPostsSkeleton } from './AllUserPostsSkeleton';

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
