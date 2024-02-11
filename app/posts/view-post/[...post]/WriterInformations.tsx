/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@/components/ui/card';
import { createHash } from 'crypto';
import { postQueryAuthorDatas } from './post.query';

type AuthorInformationsProps = {
  authorId: string;
};

export async function AuthorInformations({
  authorId,
}: AuthorInformationsProps) {
  const authorDatas = await postQueryAuthorDatas(authorId);

  if (!authorDatas) {
    return <p>Unable to get author informations</p>;
  }

  const hashName = (name: string) => {
    if (authorId === null) {
      return 'error';
    }
    return createHash('sha256').update(name).digest('hex');
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {authorDatas.selfDescription ? (
          <div className="flex flex-col gap-4">
            <h2>Author informations</h2>
            <div className="flex gap-8">
              <img
                src={
                  authorDatas.image ??
                  `https://api.dicebear.com/7.x/lorelei/svg?seed=${hashName}`
                }
                alt="picture of the author"
                title="picture of the author"
                className="flex rounded-full h-36 w-36 object-fill"
              />
              <div className="flex flex-col gap-2 w-full">
                <p className="text-2xl">{authorDatas.name}</p>
                <p>{authorDatas.selfDescription}</p>
              </div>
            </div>
          </div>
        ) : (
          <span>Author : {authorDatas.name}</span>
        )}
      </CardContent>
    </Card>
  );
}
