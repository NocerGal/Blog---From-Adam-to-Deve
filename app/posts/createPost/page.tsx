// Obligé de conserver un use client ici et également pas possibiltié d'utiliser use server dans le handleSubmit, car je souhiate conserver les useState pour passer le textPreview à mon Composant MarkdownPreview
'use client';

import React, { FormEvent, useState } from 'react';

import Link from 'next/link';
import CreatePostPreviewMarkdown from '@/components/markdown-preview/CreatePostPreviewMarkdown';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export default function PageCreatPost() {
  const router = useRouter();

  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const FormSchema = z.object({
      title: z.string().min(8).max(55),
      imageUrl: z.string().url().optional(),
      postDescription: z.string(),
      content: z.string(),
    });

    const formData = new FormData(event.currentTarget);

    const title = formData.get('postTitle');
    const imageUrl = formData.get('postImageUrl');
    const postDescription = formData.get('postDescription');
    const content = formData.get('postContent');

    const safeDataTosend = FormSchema.safeParse({
      title,
      imageUrl,
      postDescription,
      content,
    });

    if (!safeDataTosend.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        'error',
        'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
      );
    } else {
      await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(safeDataTosend.data),
      });
    }

    const getCurrentPostId = await fetch(
      `/api/getPostByTitle?postTitle=${encodeURIComponent(title as string)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return res[0].id;
      });

    router.push(
      `http://localhost:3000/admin/preview-unpblished-post/${getCurrentPostId}`
    );
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
            id="postImageUrl"
            name="postImageUrl"
            type="url"
            defaultValue="Insert image url. It's not mandatory."
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
