'use client';

import { Session } from '@prisma/client';
import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import TriggerAuth from '../auth/TriggerAuth';

type LikePostButtonProps = {
  likeCount: number;
  postId: string;
  userLike: boolean;
  checkUser: Omit<Session, 'sessionToken'> | null;
};

export function LikePostButton(props: LikePostButtonProps) {
  const [userLiked, setUserLiked] = useState(props.userLike);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [displayLoginButton, setDisplayLoginButton] = useState(false);

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
    <div className="flex flex-col">
      {props.checkUser == null ? (
        <TriggerAuth
          alertTitle="Connect with Github to like a post"
          trigger={
            <button
              onClick={(e) =>
                props.checkUser
                  ? handleLike(e)
                  : setDisplayLoginButton((prev) => !prev)
              }
              className="flex flex-row-reverse items-center gap-1 "
              disabled={isButtonDisabled}
            >
              <div className="flex items-center gap-1">
                <span>{likeCount}</span>
                <Heart
                  className={`${
                    userLiked ? 'fill-white' : 'fill-transparent'
                  } hover:fill-white transition-all`}
                  size={18}
                ></Heart>
              </div>
            </button>
          }
        />
      ) : (
        <button
          onClick={(e) =>
            props.checkUser
              ? handleLike(e)
              : setDisplayLoginButton((prev) => !prev)
          }
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
      )}
    </div>
  );
}
