import React, { Suspense } from 'react';
import { postQueryAllPosts } from './post.query';
import { LastPostsPublished } from './LastPostsPulished';
import { LastPostsPublishedSkeleton } from './LastPostsPublishedSkeleton';
import { SortAllPostsServerSide } from './SortAllPostsServerSide';
import { SortAllPostsSkeleton } from './SortAllPostsSkeleton';

export default async function Page() {
  const posts = await postQueryAllPosts();
  return (
    <div>
      <div className="flex flex-col mb-8 items-center w-full">
        <h1 className="text-4xl mb-2">Dev Tips Fr</h1>
        <h2>Des tips en français</h2>
        <h2>et une fois par semaine!</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-xl">
            Bonjour! je m&apos;appelle Schenherr Luc et je suis développeur web
            orienté React et NextJs.
          </p>
          <p className="text-xl">
            Je vous partagerai une fois par semaine des tutos et des tips sur
            des sujets liés au développement web.
          </p>
          <p className="text-xl">
            Vous pourrez également poster vos propres articles sur ce blog.
            Votre article une fois validé sera publié.
          </p>
        </div>

        <Suspense fallback={<LastPostsPublishedSkeleton />}>
          <LastPostsPublished posts={posts} />
        </Suspense>

        <div>
          <h2 className="mb-4">All articles</h2>
          <Suspense fallback={<SortAllPostsSkeleton />}>
            <SortAllPostsServerSide />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
