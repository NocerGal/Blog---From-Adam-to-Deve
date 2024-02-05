import Image from 'next/image';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import StyledMarkdown from '@/components/markdown-preview/StyledMarkdown';
import { redirect } from 'next/navigation';

export default async function postsPage({
  params,
}: {
  params: { post: string };
}) {
  const session = await getServerSession(authOptions);

  if (session === null || session === undefined) redirect('/admin/error');

  const getPostDatas = await prisma.post.findUnique({
    where: {
      id: params.post[0],
    },
    select: {
      Like: true,
      content: true,
      image: true,
    },
  });

  if (!getPostDatas || getPostDatas === null) return;

  const markdown = getPostDatas.content as string;

  const userLikeBoolean = !getPostDatas?.Like.some(async (like) => {
    const session = await getServerSession(authOptions);
    like.userId === session?.user.id;
  });

  return (
    <div className="flex flex-col gap-12">
      <h1>This article is not published. It has to be reviewed by an admin</h1>
      {getPostDatas.image && (
        <Image
          className="h-[48vh] object-cover object-center"
          src={getPostDatas.image}
          alt="image représentant le post"
          width={1000}
          height={1}
        />
      )}
      <StyledMarkdown textPreview={markdown}></StyledMarkdown>
    </div>
  );
}
