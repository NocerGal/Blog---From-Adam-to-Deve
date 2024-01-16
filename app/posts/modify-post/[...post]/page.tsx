import React, { FormEvent, useState } from 'react';
import FormComponent from './FormComponent';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import { GetServerSidePropsContext } from 'next';

export default async function PageCreatPost({
  params,
}: {
  params: { post: string };
}) {
  const getPostDatas = await prisma.post.findUnique({
    where: {
      id: params.post[0],
    },
    select: {
      title: true,
      postDescription: true,
      content: true,
      author: true,
    },
  });

  const session = await getServerSession(authOptions);

  if (!getPostDatas || !getPostDatas.author) {
    return <p>Unable to get datas</p>;
  }

  if (!session) {
    return <p>There is not opened session</p>;
  }

  if (getPostDatas.author.id !== session.user.id) {
    return (
      <div>
        <p>Unhautorized to modify post</p>
        <p>You are not the creator of the post</p>
      </div>
    );
  }
  if (params == null || params == undefined) {
    return <p>Error there is no defined user</p>;
  }

  if (!getPostDatas || !getPostDatas.content) {
    return;
  }

  const updatePostDatas = async (e: FormEvent) => {
    'use server';

    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3">
          Create your article with markdown. Check this{' '}
          <Link
            className="underline hover:text-border"
            href="https://remarkjs.github.io/react-markdown/"
            target="_blank"
          >
            example
          </Link>{' '}
          to write your article
        </p>
        <form className="flex flex-col gap-4 h-[30vh]" action={updatePostDatas}>
          <input
            id="postTitle"
            name="postTitle"
            type="text"
            defaultValue={getPostDatas.title}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <input
            id="postDescription"
            name="postDescription"
            type="text"
            defaultValue={getPostDatas.postDescription}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <textarea
            id="postContent"
            name="postContent"
            className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
            defaultValue={getPostDatas.content}
          />
          <button
            type="submit"
            className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
          >
            Modify Post
          </button>
        </form>
      </div>
      <div>{<FormComponent textPreview={getPostDatas.content} />}</div>
    </div>
  );
}
