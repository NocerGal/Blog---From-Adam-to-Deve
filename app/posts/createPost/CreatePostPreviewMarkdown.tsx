'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Tag } from '@prisma/client';
import { ZodType, z } from 'zod';
import { useRouter } from 'next/navigation';
import StyledMarkdown from '../../../src/components/markdown-preview/StyledMarkdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormSchema = {
  title: string;
  imageUrl?: string;
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

  const ZodFormSchema: ZodType<FormSchema> = z.object({
    title: z.string().min(8).max(55),
    imageUrl: z.string().url().optional().or(z.literal('')),
    postDescription: z.string().min(20).max(150),
    tag: z
      .string()
      .min(1)
      .refine((value) => value !== 'Select a tag', {
        message: 'A tag must be selected.',
      }),
    content: z.string().min(10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(ZodFormSchema),
  });

  const handleSubmitForm = async (data: FormSchema) => {
    await fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const getCurrentPostId = await fetch(
      `/api/getPostByTitle?postTitle=${encodeURIComponent(data.title)}`,
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
    // router.push(`/`);
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

        <form
          className="flex flex-col gap-4 h-[50vh]"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col">
            <input
              id="postTitle"
              type="text"
              placeholder={titlePreview}
              className="bg-secondary py-3 px-3 rounded-lg"
              {...register('title')}
            />
            {errors.title && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              id="postImageUrl"
              type="url"
              placeholder="Insert image url. It's not mandatory"
              className="bg-secondary py-3 px-3 rounded-lg"
              {...register('imageUrl')}
            />
            {errors.imageUrl && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.imageUrl.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              id="postDescription"
              type="text"
              placeholder={postDescriptionPreview}
              className="bg-secondary py-3 px-3 rounded-lg"
              {...register('postDescription')}
            />
            {errors.content && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.content.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <select
              id="postTag"
              defaultValue={'Select a tag'}
              className="bg-secondary py-3 px-3 rounded-lg"
              {...register('tag')}
            >
              <option selected disabled value="Select a tag">
                Select a tag
              </option>
              <option value={'12345'}>Redux</option>
              {allAvailablesTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            {errors.tag && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.tag.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-full">
            <textarea
              id="postContent"
              {...register('content')}
              onChange={(e) => setTextPreview(e.target.value)}
              className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
              placeholder={textPreview}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            />
            {errors.content && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.content.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
          >
            Submit your post
          </button>
        </form>
      </div>
      <div className="w-full">
        <StyledMarkdown textPreview={textPreview} />
      </div>
    </div>
  );
}