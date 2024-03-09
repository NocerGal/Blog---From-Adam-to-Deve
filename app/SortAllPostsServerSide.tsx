import { SortAllPosts } from './SortAllPosts';
import { postQueryPublishedPosts } from './post.action';
import { postQueryUsedTags } from './post.query';

export const SortAllPostsServerSide = async () => {
  const posts = await postQueryPublishedPosts();

  const getUsedAllTags = await postQueryUsedTags();

  return <SortAllPosts allTags={getUsedAllTags} posts={posts} />;
};
