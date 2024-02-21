import { SortAllPosts } from './SortAllPosts';
import { postQueryAllTags, postQueryPublishedPosts } from './post.query';

export const SortAllPostsServerSide = async () => {
  const posts = await postQueryPublishedPosts();

  const getAllTags = await postQueryAllTags();

  return <SortAllPosts allTags={getAllTags} posts={posts} />;
};
