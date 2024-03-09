import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { Session } from 'next-auth';
import { notFound } from 'next/navigation';
import { postQueryPostsByAuthor } from '../post.query';

type UserPostsPropsTypes = {
  session: Session;
};

export const UserPosts = async ({ session }: UserPostsPropsTypes) => {
  if (!session.user.id) {
    notFound();
  }
  const userPosts = await postQueryPostsByAuthor(session.user.id);

  return (
    <Card className="flex-1">
      <CardHeader>
        <h2>Your posts</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {userPosts.slice(0, 3).map((post, index) => (
          <Card className="p-4" key={index}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h3
                  className="whitespace-nowrap overflow-hidden text-ellipsis sm:w-[100px]"
                  title={post.title}
                >
                  {post.title}
                </h3>

                <Badge variant={post.published ? 'default' : 'destructive'}>
                  {post.published ? 'Published' : 'Unpublised'}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  {post.updatedAt.toLocaleDateString()}
                </span>
                <a
                  href={`/posts/modify-post/${post.id}`}
                  className="bg-muted hover:bg-muted-foreground transition-all py-1 px-2 rounded-lg"
                >
                  Modify
                </a>
              </div>
            </div>
          </Card>
        ))}
        <Link href={'/admin/user/allPosts'}>
          <Button>View more</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
