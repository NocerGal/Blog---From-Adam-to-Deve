'use client';

import { Tag } from '@prisma/client';
import { postType } from '../../../app/postCard.query';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CardPost } from '../../../app/CardPost';

type SortAllPostsTypes = {
  allTags: Tag[];
  posts: postType[];
  link: any;
};

export function SortAllPosts(props: SortAllPostsTypes) {
  const [categoryFiltered, setCategoryFiltered] = useState('All');

  const filteredPosts = props.posts.filter((post) => {
    if (categoryFiltered == 'All') {
      return true;
    } else {
      if (post.tags && post.tags.length > 0) {
        return post.tags[0].name === categoryFiltered;
      } else {
        return false;
      }
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
        {props.allTags.map((tag) => (
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
