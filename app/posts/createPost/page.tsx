// Obligé de conserver un use client ici et également pas possibiltié d'utiliser use server dans le handleSubmit, car je souhiate conserver les useState pour passer le textPreview à mon Composant MarkdownPreview
'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import Link from 'next/link';
import CreatePostPreviewMarkdown from '@/components/markdown-preview/CreatePostPreviewMarkdown';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { SessionType } from '../../../pages/api/auth/getSession';

type Tag = {
  id: string;
  name: string;
};

export default function PageCreatPost() {
  const router = useRouter();

  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');
  const [allAvailablesTags, setAllAvailablesTags] = useState<Tag[]>([]);

  const FormSchema = z.object({
    title: z.string().min(8).max(55),
    imageUrl: z.string().url().optional().or(z.literal('')),
    postDescription: z.string(),
    tag: z.string(),
    content: z.string(),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('postTitle') as string;
    const imageUrl = formData.get('postImageUrl') as string;
    const postDescription = formData.get('postDescription') as string;
    const tag = formData.get('postTag') as string;
    const content = formData.get('postContent') as string;

    const safeDataTosend = FormSchema.safeParse({
      title,
      imageUrl,
      postDescription,
      tag,
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
      `/api/getPostByTitle?postTitle=${encodeURIComponent(title)}`,
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

    router.push(`/admin/preview-unpblished-post/${getCurrentPostId}`);
  };

  const getAllTags = async () => {
    const response = await fetch('/api/tags/getAllTags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getSession = async () => {
    const response = await fetch('/api/auth/getSession', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data as SessionType;
  };

  useEffect(() => {
    getSession().then((data) => {
      if (data.status !== 200)
        router.push('/posts/createPost/error-creation-post');
    });

    getAllTags()
      .then((data) => {
        setAllAvailablesTags(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tags :', error);
      });

    getSession().then((data) => console.log(data));
  }, [router]);

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
          <select
            name="postTag"
            id="postTag"
            defaultValue={'Select a tag'}
            className="bg-secondary py-2 px-3 rounded-lg"
          >
            <option disabled selected>
              Select a tag
            </option>
            {allAvailablesTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

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
