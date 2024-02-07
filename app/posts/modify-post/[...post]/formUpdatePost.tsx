'use client';

import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type FormSchema = {
  title: string;
  description: string;
  content: string;
};

type FormUpdatePostTypes = {
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
}: FormUpdatePostTypes) => {
  const router = useRouter();

  const zodFormSchema: ZodType<FormSchema> = z.object({
    title: z.string().min(8).max(55),
    description: z.string().min(20).max(150),
    content: z.string().min(10),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(zodFormSchema),
  });

  const handleUpdatePost = async (data: FormSchema) => {
    const dataToSend = {
      postId: postId[0],
      title: data.title,
      postDescription: data.content,
      content: data.content,
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
        className="flex flex-col gap-4 h-[50vh]"
        onSubmit={handleSubmit(handleUpdatePost)}
      >
        <div className="flex flex-col">
          <input
            id="postTitle"
            {...register('title')}
            type="text"
            defaultValue={postTitle}
            placeholder="Post title"
            className="bg-secondary py-2 px-3 rounded-lg"
            onChange={(e) => {}}
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
            {...register('description')}
            type="text"
            defaultValue={postDescription}
            placeholder="Post description"
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          {errors.description && (
            <span className="flex text-destructive font-semibold mt-1">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="flex flex-col h-full">
          <textarea
            id="postContent"
            {...register('content')}
            className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
            defaultValue={postContent}
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
          className="flex justify-center bg-muted-foreground max-w-[140px] rounded-lg p-1"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : 'Modify Post'}
        </button>
      </form>
      <StyledMarkdown textPreview={postContent} />
    </>
  );
};

export default FormUpdatePost;
