import React, { Suspense } from 'react';

import { LastPostsPublishedSkeleton } from '../src/components/skeletons/LastPostsPublishedSkeleton';
import { SortAllPosts } from '../src/components/posts/SortAllPosts';
import { SortAllPostsSkeleton } from '../src/components/skeletons/SortAllPostsSkeleton';
import Link from 'next/link';
import { CardPost } from '../src/components/posts/CardPost';
import { postQueryPublishedPosts } from './post.query';
import { postQueryUsedTags } from './post.query';

export default async function Page() {
  const posts = await postQueryPublishedPosts();
  const getUsedAllTags = await postQueryUsedTags();

  return (
    <div>
      <div className="flex flex-col mb-8 items-center w-full">
        <h1 className="text-4xl mb-2">From Adam to Deve</h1>
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
          <div className="mb-4">
            <h2 className="mb-4">Last posts</h2>
            <div className="flex flex-col md:flex-row gap-2">
              {posts.slice(0, 3).map((post, index) => (
                <Link
                  href={`/posts/view-post/${post.id}`}
                  key={index}
                  className="w-full md:w-1/3"
                >
                  <CardPost article={post} />
                </Link>
              ))}
            </div>
          </div>
        </Suspense>

        <div>
          <h2 className="mb-4">All articles</h2>
          <Suspense fallback={<SortAllPostsSkeleton />}>
            <SortAllPosts allTags={getUsedAllTags} posts={posts} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
