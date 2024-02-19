import { getAllPostsType } from './post.query';
import { CardPost } from './CardPost';
import Link from 'next/link';

export const LastPostsPbulished = async ({
  posts,
}: {
  posts: getAllPostsType;
}) => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(resolve);
  //     resolve(undefined);
  //   }, 10000);
  // });

  return (
    <div className="mb-4">
      <h2 className="mb-4">Last posts</h2>
      <div className="flex flex-col md:flex-row gap-2">
        {posts.slice(0, 3).map((post, index) => (
          <Link
            href={`/posts/view-post/${post.id}`}
            key={index}
            className="w-full md:w-1/3"
          >
            <CardPost article={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};
