import { postQueryPublishedPosts } from './post.query';
import { CardPost } from './CardPost';
import Link from 'next/link';

export const LastPostsPublished = async () => {
  const posts = await postQueryPublishedPosts();

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
