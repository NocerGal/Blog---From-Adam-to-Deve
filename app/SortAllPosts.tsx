'use client';

import { Tag } from '@prisma/client';

import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { CardPost } from './CardPost';
import { postType } from './post.action';

type SortAllPostsTypes = {
  allTags: Tag[];
  posts: postType[];
};

export function SortAllPosts({ allTags, posts }: SortAllPostsTypes) {
  const [categoryFiltered, setCategoryFiltered] = useState('All');

  const filteredPosts = posts.filter((post) => {
    if (categoryFiltered == 'All') {
      return true;
    } else {
      return post.tags[0].name === categoryFiltered;
    }
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <Button
          onClick={(e) => setCategoryFiltered(e.currentTarget.innerText)}
          className={'All' === categoryFiltered ? 'opacity-[0.85]' : ''}
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag.id}
            onClick={(e) => setCategoryFiltered(e.currentTarget.innerText)}
            className={tag.name === categoryFiltered ? 'opacity-[0.85]' : ''}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {filteredPosts.map((post) => (
          <a href={`/posts/view-post/${post.id}`} key={post.id}>
            <CardPost article={post} />
          </a>
        ))}
      </div>
    </div>
  );
}
