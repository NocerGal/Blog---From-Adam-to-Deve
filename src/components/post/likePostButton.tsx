'use client';

import { Session } from '@prisma/client';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TriggerAuth from '../auth/TriggerAuth';

type LikePostButtonProps = {
  likeCounter: number;
  postId: string;
  checkUser: Omit<Session, 'sessionToken'> | null;
  reValidatePath: () => void;
};

export function LikePostButton({
  checkUser,
  postId,
  likeCounter,
  reValidatePath,
}: LikePostButtonProps) {
  const id = postId;

  const [likeCount, setLikeCount] = useState(likeCounter);
  const [userLiked, setUserLiked] = useState<null | boolean>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [, setDisplayLoginButton] = useState(false);

  const incrementLike = async () => {
    await fetch('/api/like/incrementLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postId),
    });
    reValidatePath();
  };

  const decrementLike = async () => {
    await fetch('/api/like/decrementLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postId),
    });
    reValidatePath();
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    userLiked ? decrementLike() : incrementLike();
    setLikeCount((prev) => (userLiked ? prev - 1 : prev + 1));
    setUserLiked((prev) => !prev);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      const response = await fetch(
        `/api/like/getUserLikeBoolean?postId=${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await response.json();
      setUserLiked(res);
    };

    fetchUserLikeStatus();
  });

  return (
    <div className="flex flex-col">
      {/* If no session, then propose to connect in order to add a like like */}
      {checkUser == null ? (
        <TriggerAuth
          alertTitle="Connect with Github to like a post"
          trigger={
            <button
              onClick={(e) =>
                checkUser
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
                    userLiked ? 'fill-transparent' : 'fill-white'
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
            checkUser ? handleLike(e) : setDisplayLoginButton((prev) => !prev)
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
          />
        </button>
      )}
    </div>
  );
}
