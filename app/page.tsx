import { CardPost } from './CardPost';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getAllPosts } from './postCard.query';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function Page() {
  const session = getServerSession(authOptions);

  const posts = await getAllPosts();

  const getAllTags = await prisma.tag.findMany();

  return (
    <div>
      <div className="flex flex-col mb-8 items-center w-full">
        <p>Text tags </p>
        <h1 className="text-4xl mb-2">Dev Tips Fr</h1>
        <h2 className="text-xl">Des tips en français</h2>
        <h2 className="text-xl">et une fois par semaine!</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p>
            Bonjour! je m&apos;appelle Schenherr Luc et je suis développeur web
            orienté React et NextJs.
          </p>
          <p>
            Je vous partagerai une fois par semaine des tutos et des tips sur
            des sujets React.
          </p>
        </div>
        <div>
          <h2>Derniers articles</h2>
        </div>
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
    </div>
  );
}
