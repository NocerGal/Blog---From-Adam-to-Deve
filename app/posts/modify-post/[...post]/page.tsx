import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormUpdatePost } from './formUpdatePost';
import { postQueryDatas } from './post.query';

export default async function PageCreatPost({
  params,
}: {
  params: { post: string };
}) {
  const postDatas = await postQueryDatas(params.post[0]);

  if (!postDatas) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3">
          Modify your article with markdown. Check this{' '}
          <Link
            className="underline hover:text-border"
            href="https://remarkjs.github.io/react-markdown/"
            target="_blank"
          >
            example
          </Link>{' '}
          to write your article
        </p>
        <FormUpdatePost postDatas={postDatas} />
      </div>
    </div>
  );
}
