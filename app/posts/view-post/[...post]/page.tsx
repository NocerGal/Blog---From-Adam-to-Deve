import React from 'react';
import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { LikePostButton } from '@/components/post/LikePostButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { Session } from '@prisma/client';
import Head from 'next/head';
import { Metadata } from 'next';
import {
  getAllPostById,
  getAllPostByIdType,
} from '../../../../pages/api/getpostById';

type MetaDataPropsType = {
  params: { post: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: MetaDataPropsType): Promise<Metadata> {
  const id = params?.post[0];

  const postDatas = (await getAllPostById(id)) as getAllPostByIdType;

  return {
    title: id,
    description: postDatas.postDescription,
  };
}

export default async function postsPage({
  params,
}: {
  params: { post: string[] };
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
    // session dans le some, car sinon, ne permet pas à un utilisateur non connecté de voir le post
    const session = await getServerSession(authOptions);
    like.userId === session?.user.id;
  });

  const checkUserConnected = (await getServerSession(authOptions)) as Omit<
    Session,
    'sessionToken'
  >;

  return (
    <div>
      <Head>
        <title>{'testHead'}</title>
      </Head>
      <div className="flex flex-col gap-12">
        {getPostDatas.image && (
          <Image
            className="h-[48vh] object-cover object-center"
            src={getPostDatas.image as string}
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
                ? 9999
                : getPostDatas.Like.length
            }
          />
        </div>
      </div>
    </div>
  );
}
