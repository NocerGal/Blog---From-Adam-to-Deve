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

export default async function PageLikedPosts() {
  const session = await getServerSession(authOptions);

  const getAllPostsLikedByUser = await prisma.user.findMany({
    where: {
      id: session?.user.id,
    },
    select: {
      Like: true,
    },
  });

  const getAllPostsDatas = await prisma.post.findMany();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Liked posts</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            {getAllPostsLikedByUser[0].Like.map((likedPost, index) => (
              <div key={index}>
                {getAllPostsDatas.map(
                  (post, index) =>
                    likedPost.postId === post.id && (
                      <Card key={index}>
                        <CardHeader className="pb-4">
                          <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <span className="font font-semibold">
                            Post description :
                          </span>{' '}
                          {post.postDescription}
                        </CardContent>
                        <CardFooter>
                          <div className="flex flex-col sm:flex-row justify-between sm:items-end w-full">
                            <p>
                              Liked on{' '}
                              {likedPost.createdAt.toLocaleDateString()}
                            </p>
                            <Link href={`/posts/view-post/${post.id}`}>
                              <Button>View post</Button>
                            </Link>
                          </div>
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
