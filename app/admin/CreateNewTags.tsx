'use client';

import { toast } from 'sonner';
import { adminActionCreateTag } from './admin.action';
import { useRouter } from 'next/navigation';

export type CreateNewTagsProps = {};

export const CreateNewTags = (props: CreateNewTagsProps) => {
  const router = useRouter();

  return (
    <div className="mt-6">
      <h2 className="mb-2">Create new tags for the blog</h2>
      <p className="mb-2"> Tag has to be created one by one</p>
      <form
        className="flex flex-col items-start gap-4"
        action={async (formData: FormData) => {
          const newTag = String(formData.get('newTag'));

          const { data, serverError } = await adminActionCreateTag({ newTag });

          if (serverError) {
            toast.error(data?.error);
            return;
          }

          toast.success(data?.message);
          router.refresh();
        }}
      >
        <input
          id="newTag"
          name="newTag"
          type="text"
          placeholder="New tag"
          className="bg-secondary py-3 px-3 rounded-lg"
        />
        <button
          className="bg-muted-foreground max-w-[140px] rounded-lg p-1 flex justify-center min-w-[102px] hover:opacity-95"
          type="submit"
        >
          Create tag
        </button>
      </form>
    </div>
  );
};
