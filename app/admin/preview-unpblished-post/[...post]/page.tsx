import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import { notFound } from 'next/navigation';
import { adminQueryUnpublishedPost } from './admin.query';

export default async function postsPage({
  params,
}: {
  params: { post: string };
}) {
  const session = await getServerSession(authOptions);

  const unpublishedPost = await adminQueryUnpublishedPost(params.post[0]);

  if (!session || !unpublishedPost) {
    notFound();
  }

  const markdown = unpublishedPost.content as string;

  return (
    <div className="flex flex-col gap-12">
      <h1>This article is not published. It has to be reviewed by an admin</h1>
      {unpublishedPost.image && (
        <Image
          className="h-[48vh] object-cover object-center"
          src={unpublishedPost.image}
          alt="image représentant le post"
          width={1000}
          height={1}
        />
      )}
      <StyledMarkdown textPreview={markdown}></StyledMarkdown>
    </div>
  );
}
