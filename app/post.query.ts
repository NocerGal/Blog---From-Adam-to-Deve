import prisma from '@/lib/prisma';

export const postQueryAllTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {},
      },
    },
  });

  return tags;
};

export const postQueryUsedTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      posts: {
        some: { published: true },
      },
    },
  });

  return tags;
};

export const postQueryPublishedPosts = async () => {
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      published: true,
      id: true,
      title: true,
      postDescription: true,
      updatedAt: true,
      author: true,
      tags: true,
    },
  });

  const getAllPostsSortByDate = allPosts.sort((a, b) => {
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  return getAllPostsSortByDate;
};
