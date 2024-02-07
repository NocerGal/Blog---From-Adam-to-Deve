import React from 'react';
import Markdown from 'react-markdown';
import style from './markdown-styles.module.css';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { Session } from '@prisma/client';
import { Metadata } from 'next';
import {
  getAllPostById,
  getAllPostByIdType,
} from '../../../../pages/api/getpostById';
import { LikePostButton } from '@/components/post/likePostButton';
import { revalidatePath } from 'next/cache';

import { WriterInformations } from './WriterInformations';
import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';

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
      content: true,
      image: true,
      likedBy: true,
      authorId: true,
    },
  });

  if (!getPostDatas || getPostDatas === null) return;

  const markdown = getPostDatas.content as string;

  const checkUserConnected = (await getServerSession(authOptions)) as Omit<
    Session,
    'sessionToken'
  >;

  const handleRevalidatPath = async () => {
    'use server';
    revalidatePath(`/posts/view-post/${params.post[0]}`);
  };

  return (
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
      <StyledMarkdown textPreview={markdown}></StyledMarkdown>

      <div className="flex justify-end align-baseline">
        <span className="mr-4 text-lg">Did you liked this post?</span>
        <LikePostButton
          checkUser={checkUserConnected}
          postId={params.post[0]}
          likeCounter={
            getPostDatas === null || getPostDatas === undefined
              ? 9999
              : getPostDatas.likedBy.length
          }
          reValidatePath={handleRevalidatPath}
        />
      </div>
      <div>
        {getPostDatas.authorId && (
          <WriterInformations authorId={getPostDatas.authorId} />
        )}
      </div>
    </div>
  );
}
