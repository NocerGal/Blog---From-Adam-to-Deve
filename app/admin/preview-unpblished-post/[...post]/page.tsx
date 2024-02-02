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
  const getPostDatas = await prisma.post.findUnique({
    where: {
      id: params.post[0],
    },
    select: {
      Like: true,
      content: true,
      image: true,
    },
  });

  if (!getPostDatas || getPostDatas === null) return;

  const markdown = getPostDatas.content as string;

  const userLikeBoolean = !getPostDatas?.Like.some(async (like) => {
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
      {getPostDatas.image && (
        <Image
          className="h-[48vh] object-cover object-center"
          src={getPostDatas.image}
          alt="image représentant le post"
          width={1000}
          height={1}
        />
      )}
      <Markdown className={style.reactMarkDown}>{markdown}</Markdown>

      <div className="flex justify-end cursor-pointer">
        <LikePostButton
          checkUser={checkUserConnected}
          userLike={!userLikeBoolean}
          postId={params.post[0]}
          likeCount={
            getPostDatas === null || getPostDatas === undefined
              ? 0
              : getPostDatas.Like.length
          }
        />
      </div>
    </div>
  );
}
