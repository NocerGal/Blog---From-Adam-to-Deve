import React from 'react';
import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { LikePostButton } from '@/components/post/likePostButton';
import { Heart } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';

export default async function postsPage({
  params,
}: {
  params: { post: string };
}) {
  const session = await getServerSession(authOptions);
  const getPostLikes = await prisma.post.findUnique({
    where: {
      id: params.post[0],
    },
    select: {
      Like: true,
    },
  });

  const markdown = `# A demo of "react-markdown"

  "react-markdown" is a markdown component for React.
  
  👉 Changes are re-rendered as you type.
  
  👈 Try writing some markdown on the left.
  
  ## Overview
  
  * Follows [CommonMark](https://commonmark.org)
  * Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
  * Renders actual React elements instead of using "dangerouslySetInnerHTML"
  * Lets you define your own components.
  * Has a lot of plugins
  `;
  return (
    <div className="flex flex-col gap-12">
      <Image
        className="h-[48vh] object-cover object-center"
        src={
          'https://img.freepik.com/photos-gratuite/close-up-hommes-mains-taper-clavier-ordinateur-portable_1262-2250.jpg?w=1800&t=st=1703706230~exp=1703706830~hmac=25d28f71d7061601f564da101f8373cfb4b5249dd20a67eae446be1029b1eb6d'
        }
        alt="image représentant le post"
        width={1000}
        height={1}
      />
      <Markdown className={style.reactMarkDown}>{markdown}</Markdown>

      <div className="flex justify-end cursor-pointer">
        <LikePostButton
          postId={params.post[0]}
          likeCount={
            getPostLikes === null || getPostLikes === undefined
              ? 'unable to get likes'
              : getPostLikes.Like.length
          }
        />
      </div>
    </div>
  );
}
