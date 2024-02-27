'use client';

import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ModifyPostFormSchema, zodModifyPostFormSchema } from './post.schema';
import { postActionUpdatePost } from './post.action';
import { postQueryDatasType } from './post.query';
import { useState } from 'react';

type FormUpdatePostTypes = {
  postDatas: postQueryDatasType;
};

export const FormUpdatePost = ({ postDatas }: FormUpdatePostTypes) => {
  const router = useRouter();

  const [textPreview, setTextPreview] = useState(postDatas.content);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ModifyPostFormSchema>({
    resolver: zodResolver(zodModifyPostFormSchema),
  });

  return (
    <>
      <form
        className="flex flex-col gap-4 h-[60vh] mb-8"
        onSubmit={handleSubmit((formDatas) => {
          postActionUpdatePost(formDatas, postDatas.id);
          router.push('/admin');
        })}
      >
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-4 h-full"
        >
          <div className="flex flex-col">
            <input
              id="postTitle"
              {...register('title')}
              type="text"
              defaultValue={postDatas.title}
              placeholder="Post title"
              className="bg-secondary py-2 px-3 rounded-lg"
            />
            {errors.title && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              id="postDescription"
              {...register('postDescription')}
              type="text"
              defaultValue={postDatas.postDescription}
              placeholder="Post description"
              className="bg-secondary py-2 px-3 rounded-lg"
            />
            {errors.postDescription && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.postDescription.message}
              </span>
            )}
          </div>
          <div className="flex flex-col h-full">
            <textarea
              id="postContent"
              {...(register('content'),
              {
                onChange: (e) => {
                  setTextPreview(e.target.value);
                },
              })}
              className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
              defaultValue={textPreview}
              placeholder="Post content"
            />
            {errors.content && (
              <span className="flex text-destructive font-semibold mt-1">
                {errors.content.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="flex justify-center bg-muted-foreground max-w-[140px] rounded-lg p-1 hover:opacity-95"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : isSubmitSuccessful ? (
              'Success! You are redirected...'
            ) : (
              'Modify Post'
            )}
          </button>
        </fieldset>
      </form>
      <StyledMarkdown textPreview={textPreview} />
    </>
  );
};
