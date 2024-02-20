import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ButtonClient } from './ButtonClient';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { adminActionDeletePost, adminActionPublishPost } from './admin.action';
import { ButtoButtonDeletePostClient } from './ButtonDeletePost';
import { ButtonPublishPost } from './ButtonPublishPost';

export type AllPostsToReviewProps = {
  userDatas: {
    selfDescription: string | null;
    name: string;
    role: string;
    image: string | null;
  } | null;
};

export const AllPostsToReview = async ({
  userDatas,
}: AllPostsToReviewProps) => {
  const getAllUnpublishedPosts = await prisma.post.findMany({
    where: {
      published: false,
    },
  });
  return (
    <div className="flex flex-col gap-4">
      {userDatas?.role == 'ADMIN' && (
        <div>
          <Card className="px-4 pb-6">
            <CardHeader>
              <h2>All posts to review</h2>
            </CardHeader>
            <div className="flex flex-col gap-4">
              {getAllUnpublishedPosts.map((unpublishedPost) => {
                return (
                  <Card
                    className="flex justify-between"
                    key={unpublishedPost.id}
                  >
                    <CardHeader>
                      <CardTitle>{unpublishedPost.title}</CardTitle>
                    </CardHeader>
                    <div className="flex items-center gap-2 pr-6">
                      <Link
                        href={`/admin/preview-unpblished-post/${unpublishedPost.id}`}
                      >
                        <Button variant={'secondary'}>Preview</Button>
                      </Link>

                      <ButtonPublishPost
                        postId={unpublishedPost.id}
                        buttonText="Publish post"
                      />
                      <ButtoButtonDeletePostClient
                        postId={unpublishedPost.id}
                        buttonText="Delete post"
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
