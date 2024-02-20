import { SortAllPosts } from './SortAllPosts';
import { postQueryAllPosts, postQueryAllTags } from './post.query';

export const SortAllPostsServerSide = async () => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log(resolve);
  //     resolve(undefined);
  //   }, 10000);
  // });

  const posts = await postQueryAllPosts();

  const getAllTags = await postQueryAllTags();

  return <SortAllPosts allTags={getAllTags} posts={posts} />;
};
