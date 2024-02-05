import CreatePostPreviewMarkdown from '@/components/markdown-preview/CreatePostPreviewMarkdown';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function PageCreatPost() {
  const session = await getServerSession(authOptions);

  if (session === null || session.user.id === undefined) {
    redirect('/posts/createPost/error-creation-post');
  }

  const handleRevalidateAdminPath = async () => {
    'use server';
    revalidatePath('/admin');
  };

  return (
    <CreatePostPreviewMarkdown
      revalidateAdminPath={handleRevalidateAdminPath}
    />
  );
}
