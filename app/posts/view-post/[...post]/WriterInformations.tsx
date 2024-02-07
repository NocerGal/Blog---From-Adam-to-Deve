/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { createHash } from 'crypto';

type WriterInformationsProps = {
  authorId: string;
};

export async function WriterInformations({
  authorId,
}: WriterInformationsProps) {
  const getAuthorDatas = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
    select: {
      selfDescription: true,
      name: true,
      image: true,
    },
  });

  function hashName(name: string) {
    return createHash('sha256').update(name).digest('hex');
  }

  const hashedId =
    authorId == null || authorId == undefined ? 'error' : hashName(authorId);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <h2>Author informations</h2>
          <div className="flex gap-8">
            <img
              src={
                getAuthorDatas?.image ??
                `https://api.dicebear.com/7.x/lorelei/svg?seed=${hashedId}`
              }
              alt="picture of the author"
              title="picture of the author"
              className="flex rounded-full h-36 w-36 object-fill"
            />
            <div className="flex flex-col gap-2 w-full">
              <p className="text-2xl">{getAuthorDatas?.name}</p>
              <p>{getAuthorDatas?.selfDescription}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
