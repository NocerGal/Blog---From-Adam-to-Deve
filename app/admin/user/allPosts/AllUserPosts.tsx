import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ButtonClient } from '../../ButtonClient';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { adminQueryUserPosts } from './admin.query';
import { Button } from '@/components/ui/button';
import { adminActionDeletePost } from '../../admin.action';

export const AllUserPosts = async () => {
  const session = await getServerSession(authOptions);

  if (!session === null) {
    return notFound();
  }

  const posts = await adminQueryUserPosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">All your posts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {posts.posts.map((post, index) => (
          <div key={index}>
            <Card>
              <CardHeader className="flex flex-row items-baseline justify-between">
                <CardTitle className="text-xl">Title : {post.title}</CardTitle>

                <p>Updated at : {post.updatedAt.toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-1">
                  <span className="font-semibold mb-2">Description : </span>

                  <p>{post.postDescription}</p>
                </div>
                <div className="flex flex-row gap-1">
                  <span className="font-semibold">First lines : </span>
                  {post.content
                    ? post.content.length > 50
                      ? `${post.content.slice(0, 50)} ...`
                      : post.content
                    : 'post content not find.'}
                </div>
                <div className="flex justify-end gap-2">
                  <Button>
                    <Link href={`/posts/view-post/${post.id}`}>View post</Link>
                  </Button>
                  <Button variant={'outline'}>
                    <Link href={`/posts/modify-post/${post.id}`}>
                      Modify post
                    </Link>
                  </Button>

                  <ButtonClient
                    postId={post.id}
                    onClickFunction={adminActionDeletePost}
                    variant="destructive"
                    buttonText="Delete post"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
