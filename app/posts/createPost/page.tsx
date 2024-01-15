'use client';

import React, { useState } from 'react';
import FormComponent from './FormComponent';
import { createPost } from './createPost.query';
import Link from 'next/link';

export default function PageCreatPost() {
  const [titlePreview] = useState('Tape your title');
  const [postDescriptionPreview] = useState('Tape your post description');
  const [textPreview, setTextPreview] = useState('Tape your text');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-3">
          Create your article with markdown. Check this{' '}
          <Link
            className="underline hover:text-border"
            href="https://remarkjs.github.io/react-markdown/"
            target="_blank"
          >
            example
          </Link>{' '}
          to write your article
        </p>
        <form
          className="flex flex-col gap-4 h-[30vh]"
          onSubmit={(e) => {
            createPost(e);
          }}
        >
          <input
            id="postTitle"
            type="text"
            defaultValue={titlePreview}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <input
            id="postDescription"
            type="text"
            defaultValue={postDescriptionPreview}
            className="bg-secondary py-2 px-3 rounded-lg"
          />
          <textarea
            onChange={(e) => setTextPreview(e.target.value)}
            className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
            defaultValue={textPreview}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          />
          <button
            type="submit"
            className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
          >
            Submit new Post
          </button>
        </form>
      </div>
      <div>
        <FormComponent textPreview={textPreview} />
      </div>
    </div>
  );
}
