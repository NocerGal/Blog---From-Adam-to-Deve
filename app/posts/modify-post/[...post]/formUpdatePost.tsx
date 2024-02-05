'use client';

import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import { useRouter } from 'next/navigation';

import React, { FormEvent, useState, useRef } from 'react';

type formUpdatePostTypes = {
  postId: string;
  postTitle: string;
  postDescription: string;
  postContent: string;
  revalidatePath: () => void;
};

const FormUpdatePost = ({
  postTitle,
  postDescription,
  postContent,
  postId,
  revalidatePath,
}: formUpdatePostTypes) => {
  const router = useRouter();

  const postTitleInputRef = useRef<HTMLInputElement>(null);
  const postDescriptionInputRef = useRef<HTMLInputElement>(null);
  const postContentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdatePost = async (event: FormEvent) => {
    event.preventDefault();
    const dataToSend = {
      postId: postId[0],
      title: postTitleInputRef.current?.value,
      postDescription: postDescriptionInputRef.current?.value,
      content: postContentInputRef.current?.value,
    };

    await fetch('/api/updatePost', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
    revalidatePath();
    router.push('/admin');
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 h-[30vh]"
        onSubmit={handleUpdatePost}
      >
        <input
          ref={postTitleInputRef}
          id="postTitle"
          name="postTitle"
          type="text"
          defaultValue={postTitle}
          placeholder="Post title"
          className="bg-secondary py-2 px-3 rounded-lg"
          onChange={(e) => {}}
        />
        <input
          ref={postDescriptionInputRef}
          id="postDescription"
          name="postDescription"
          type="text"
          defaultValue={postDescription}
          placeholder="Post description"
          className="bg-secondary py-2 px-3 rounded-lg"
        />
        <textarea
          ref={postContentInputRef}
          id="postContent"
          name="postContent"
          className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
          defaultValue={postContent}
          placeholder="Post content"
        />
        <button
          type="submit"
          className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
        >
          Modify Post
        </button>
      </form>
      <StyledMarkdown textPreview={postContent} />
    </>
  );
};

export default FormUpdatePost;
