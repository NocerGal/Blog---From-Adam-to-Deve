'use client';

import { Heart } from 'lucide-react';
import React from 'react';

type LikePostButtonProps = {
  likeCount: number | string;
  postId: string;
};

export function LikePostButton(props: LikePostButtonProps) {
  const incrementLike = async () => {
    await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.postId),
    });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        incrementLike();
      }}
      className="flex flex-row items-center gap-1"
    >
      <span>{props.likeCount}</span>
      <Heart
        className="fill-transparent hover:fill-white transition-all"
        size={18}
      ></Heart>
    </button>
  );
}
