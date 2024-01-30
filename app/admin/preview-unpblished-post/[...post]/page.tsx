import React from 'react';
import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { LikePostButton } from '@/components/post/likePostButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { Session } from '@prisma/client';

export default async function postsPage({
  params,
}: {
  params: { post: string };
}) {
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

  const userLikeBoolean = !getPostLikes?.Like.some(async (like) => {
    // session dans le some, car sinon, ne permet pas à un utilisateur non connecté de voir le post
    const session = await getServerSession(authOptions);
    like.userId === session?.user.id;
  });

  const checkUserConnected = (await getServerSession(authOptions)) as Omit<
    Session,
    'sessionToken'
  >;

  return (
    <div className="flex flex-col gap-12">
      <h1>This article is not published. It has to be reviewed by an admin</h1>
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
          checkUser={checkUserConnected}
          userLike={!userLikeBoolean}
          postId={params.post[0]}
          likeCount={
            getPostLikes === null || getPostLikes === undefined
              ? 0
              : getPostLikes.Like.length
          }
        />
      </div>
    </div>
  );
}
