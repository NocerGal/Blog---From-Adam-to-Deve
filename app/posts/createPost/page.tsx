import CreatePostPreviewMarkdown from './CreatePostPreviewMarkdown';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function PageCreatPost() {
  const session = await getServerSession(authOptions);

  if (session === null || session.user.id === undefined) {
    redirect('/posts/createPost/error-creation-post');
  }

  return <CreatePostPreviewMarkdown />;
}
