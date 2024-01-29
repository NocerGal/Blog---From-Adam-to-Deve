'use client';

import React, { FormEvent, useState } from 'react';

import Link from 'next/link';
import CreatePostPreviewMarkdown from '@/components/markdown-preview/CreatePostPreviewMarkdown';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export default function PageCreatPost() {
  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dataToSend = {
      title: formData.get('postTitle'),
      postDescription: formData.get('postDescription'),
      content: formData.get('postContent'),
    };

    await fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
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
        <form className="flex flex-col gap-4 h-[30vh]" onSubmit={handleSubmit}>
          <input
            id="postTitle"
            name="postTitle"
            type="text"
            defaultValue={titlePreview}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <input
            id="postDescription"
            name="postDescription"
            type="text"
            defaultValue={postDescriptionPreview}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <textarea
            id="postContent"
            name="postContent"
            onChange={(e) => setTextPreview(e.target.value)}
            className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
            defaultValue={textPreview}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
          <button
            type="submit"
            className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
          >
            Submit new Post
          </button>
        </form>
      </div>
      <div>
        <CreatePostPreviewMarkdown textPreview={textPreview} />
      </div>
    </div>
  );
}
