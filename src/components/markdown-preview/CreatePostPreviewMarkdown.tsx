'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Tag } from '@prisma/client';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import StyledMarkdown from './StyledMarkdown';

import { zodResolver } from '@hookform/resolvers/zod';
import { revalidatePath } from 'next/cache';

type FormSchema = {
  title: string;
  imageUrl: string;
  postDescription: string;
  tag: string;
  content: string;
};

type CreatePostPreviewMarkdownPropsTypes = {
  revalidateAdminPath: () => void;
};

export default function CreatePostPreviewMarkdown({
  revalidateAdminPath,
}: CreatePostPreviewMarkdownPropsTypes) {
  const router = useRouter();

  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');
  const [allAvailablesTags] = useState<Tag[]>([]);

  const ZodFormSchema = z.object({
    title: z.string().min(8).max(55),
    imageUrl: z.string().url().optional().or(z.literal('')),
    postDescription: z.string().min(20).max(150),
    tag: z.string(),
    content: z.string().min(100),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get('postTitle') as string;
    const imageUrl = formData.get('postImageUrl') as string;
    const postDescription = formData.get('postDescription') as string;
    const tag = formData.get('postTag') as string;
    const content = formData.get('postContent') as string;

    const safeDataTosend = ZodFormSchema.safeParse({
      title,
      imageUrl,
      postDescription,
      tag,
      content,
    });

    if (!safeDataTosend.success) {
      console.log('Error send data');
    } else {
      await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(safeDataTosend.data),
      });

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
      revalidateAdminPath();
      router.push(`/admin/preview-unpblished-post/${getCurrentPostId}`);
    }
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

        <form className="flex flex-col gap-4 h-[50vh]" onSubmit={handleSubmit}>
          <input
            id="postTitle"
            name="postTitle"
            type="text"
            placeholder={titlePreview}
            className="bg-secondary py-3 px-3 rounded-lg"
          />

          <input
            id="postImageUrl"
            name="postImageUrl"
            type="url"
            placeholder="Insert image url. It's not mandatory"
            className="bg-secondary py-3 px-3 rounded-lg"
          />

          <input
            id="postDescription"
            name="postDescription"
            type="text"
            placeholder={postDescriptionPreview}
            className="bg-secondary py-3 px-3 rounded-lg"
          />

          <select
            name="postTag"
            id="postTag"
            defaultValue={'Select a tag'}
            className="bg-secondary py-3 px-3 rounded-lg"
          >
            <option disabled>Select a tag</option>
            <option value={'12345'}>Redux</option>
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
            placeholder={textPreview}
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
      <div className="w-full">
        <StyledMarkdown textPreview={textPreview} />
      </div>
    </div>
  );
}
