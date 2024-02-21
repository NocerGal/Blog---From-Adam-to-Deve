import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { Session } from '@prisma/client';
import { Metadata } from 'next';
import { LikePostButton } from './likePostButton';
import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import {
  postQueryIsUserLike,
  postQueryPostDatas,
  postQueryPostDatasTypes,
} from './post.query';
import { notFound } from 'next/navigation';
import { AuthorInformations } from './WriterInformations';

type MetaDataPropsType = {
  params: { post: string };

  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: MetaDataPropsType): Promise<Metadata> {
  const postId = params?.post[0];

  const postDatas: postQueryPostDatasTypes = await postQueryPostDatas(postId);

  const image = postDatas?.image ? postDatas.image : '../../../icon.png';
  return {
    title: postDatas?.title,
    description: postDatas?.postDescription,
    openGraph: {
      images: [image],
    },
  };
}

export default async function postsPage({
  params,
}: {
  params: { post: string[] };
}) {
  const post = await postQueryPostDatas(params.post[0]);

  if (!post) {
    notFound();
  }

  const checkUserConnected: Omit<Session, 'sessionToken'> | null =
    await getServerSession(authOptions);

  const isPostLikesByUser = await postQueryIsUserLike(params.post[0]);

  return (
    <div className="flex flex-col gap-12">
      {post.image && (
        <img
          className="h-[48vh] object-cover object-center"
          src={post.image}
          alt="image représentant le post"
          width={1000}
          height={1}
        />
      )}
      <StyledMarkdown textPreview={post.content}></StyledMarkdown>

      <div className="flex justify-end align-baseline">
        <span className="mr-4 text-lg">Did you liked this post?</span>
        <LikePostButton
          checkUser={checkUserConnected}
          postId={params.post[0]}
          likeCounter={post.likedBy.length}
          isPostLikesByUser={isPostLikesByUser}
        />
      </div>
      <div>
        {post.authorId && <AuthorInformations authorId={post.authorId} />}
      </div>
    </div>
  );
}
