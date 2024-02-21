'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Tag } from '@prisma/client';
import { ZodType, z } from 'zod';
import { useRouter } from 'next/navigation';
import StyledMarkdown from '../../../src/components/markdown-preview/StyledMarkdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { postActionCreate } from './post.action';

import { toast } from 'sonner';
import { postQueryAllAvalablestags } from './post.query';

type FormSchema = {
  title: string;
  imageUrl?: string;
  postDescription: string;
  tag: string;
  content: string;
};

export default function CreatePostPreviewMarkdown() {
  const router = useRouter();

  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');
  const [allAvailablesTags, setAllAvailablesTags] = useState<Tag[]>([]);

  const ZodFormSchema: ZodType<FormSchema> = z.object({
    title: z.string().min(8).max(100),
    imageUrl: z.string().url().optional().or(z.literal('')),
    postDescription: z.string().min(20).max(500),
    tag: z
      .string()
      .min(1)
      .refine((value) => value !== 'Select a tag', {
        message: 'A tag must be selected.',
      }),
    content: z.string().min(10),
  });

  useEffect(() => {
    const fetchAllAvailablestags = async () => {
      const data = await postQueryAllAvalablestags();
      setAllAvailablesTags(data);
    };

    fetchAllAvailablestags();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchema>({
    resolver: zodResolver(ZodFormSchema),
  });

  const handleSubmitForm = async (formData: FormSchema) => {
    const { data, serverError } = await postActionCreate(formData);

    if (serverError) {
      toast.error('Your post has not been posted');
      return;
    }

    toast.success('Your post has been posted!');

    router.push(`/admin/preview-unpblished-post/${data?.newPost.id}`);
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
          className="flex flex-col gap-4 h-[60vh]"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <fieldset
            className="flex flex-col gap-4 h-full"
            disabled={isSubmitting}
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
              {errors.postDescription && (
                <span className="flex text-destructive font-semibold mt-1">
                  {errors.postDescription.message}
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
                <option selected disabled value="">
                  Select a tag
                </option>

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
              className="bg-muted-foreground max-w-[140px] rounded-lg p-1 flex justify-center min-w-[102px] hover:opacity-95"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : isSubmitSuccessful ? (
                'Success! You are redirected...'
              ) : (
                'Submit your post'
              )}
            </button>
          </fieldset>
        </form>
      </div>
      <div className="w-full">
        <StyledMarkdown textPreview={textPreview} />
      </div>
    </div>
  );
}
