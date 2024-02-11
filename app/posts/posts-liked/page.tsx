import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { postsQueryPostsLikedByUser } from './postLiked.query';

export default async function PageLikedPosts() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const postsLiked = (await postsQueryPostsLikedByUser())[0];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Liked posts</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {postsLiked.likedPosts.map((likedPost, index) => (
              <div key={index}>
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <CardTitle>{likedPost.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="font font-semibold">
                      Post description :
                    </span>{' '}
                    {likedPost.postDescription}
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end w-full">
                      <p>Liked on {likedPost.createdAt.toLocaleDateString()}</p>
                      <Link href={`/posts/view-post/${likedPost.id}`}>
                        <Button>View post</Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
