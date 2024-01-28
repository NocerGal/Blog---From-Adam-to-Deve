'use client';

import { Heart } from 'lucide-react';
import React, { useState } from 'react';

type LikePostButtonProps = {
  likeCount: number;
  postId: string;
  userLike: boolean;
  checkUser: any;
};

export function LikePostButton(props: LikePostButtonProps) {
  const [userLiked, setUserLiked] = useState(props.userLike);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const incrementLike = async () => {
    await fetch('/api/like/incrementLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.postId),
    });
  };

  const decrementLike = async () => {
    await fetch('/api/like/decrementLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.postId),
    });
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    userLiked ? decrementLike() : incrementLike();
    setLikeCount((prev) => (userLiked ? prev - 1 : prev + 1));
    setUserLiked((prev) => !prev);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  return (
    <button
      onClick={(e) => handleLike(e)}
      className="flex flex-row items-center gap-1"
      disabled={isButtonDisabled}
    >
      <span>{likeCount}</span>
      <Heart
        className={`${
          userLiked ? 'fill-white' : 'fill-transparent'
        } hover:fill-white transition-all`}
        size={18}
      ></Heart>
    </button>
  );
}
