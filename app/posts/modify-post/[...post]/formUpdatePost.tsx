'use client';

import React, { FormEvent, useState, useRef } from 'react';
import FormComponent from './PreviewMarkdown';

type formUpdatePostTypes = {
  postId: string;
  postTitle: string;
  postDescription: string;
  postContent: string;
};

const FormUpdatePost = (props: formUpdatePostTypes) => {
  const [postTitle, setPostTitle] = useState(props.postTitle);
  const [postDescription, setPostDescription] = useState(props.postDescription);
  const [postContent, setPostContent] = useState(props.postContent);

  const postTitleInputRef = useRef<HTMLInputElement>(null);
  const postDescriptionInputRef = useRef<HTMLInputElement>(null);
  const postContentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdatePost = async (event: FormEvent<HTMLFormElement>) => {
    const dataToSend = {
      postId: props.postId,
      title: postTitleInputRef.current?.value,
      postDescription: postDescriptionInputRef.current?.value,
      content: postContentInputRef.current?.value,
    };
    event.preventDefault();
    await fetch('/api/updatePost', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 h-[30vh]"
        onSubmit={handleUpdatePost}
      >
        <input
          ref={postTitleInputRef}
          id="postTitle"
          name="postTitle"
          type="text"
          defaultValue={postTitle}
          className="bg-secondary py-2 px-3 rounded-lg"
          onChange={(e) => setPostTitle(e.currentTarget.value)}
        />
        <input
          ref={postDescriptionInputRef}
          id="postDescription"
          name="postDescription"
          type="text"
          defaultValue={postDescription}
          className="bg-secondary py-2 px-3 rounded-lg"
          onChange={(e) => setPostDescription(e.currentTarget.value)}
        />
        <textarea
          ref={postContentInputRef}
          id="postContent"
          name="postContent"
          className="resize-none h-full w-full bg-secondary py-2 px-3 rounded-lg"
          defaultValue={postContent}
          onChange={(e) => setPostContent(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="bg-muted-foreground max-w-[140px] rounded-lg p-1"
        >
          Modify Post
        </button>
      </form>
      <FormComponent textPreview={postContent} />
    </div>
  );
};

export default FormUpdatePost;
