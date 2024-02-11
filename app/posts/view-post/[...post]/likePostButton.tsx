'use client';

import { Session } from '@prisma/client';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TriggerAuth from '../../../../src/components/auth/TriggerAuth';
import {
  postActionDecrementLike,
  postActionIncrementLike,
} from './post.action';
import { postQueryIsUserLike } from './post.query';

type LikePostButtonProps = {
  likeCounter: number;
  postId: string;
  checkUser: Omit<Session, 'sessionToken'> | null;
};

export function LikePostButton({
  checkUser,
  postId,
  likeCounter,
}: LikePostButtonProps) {
  const [likeCount, setLikeCount] = useState(likeCounter);
  const [isUserLikes, setIsUserLikes] = useState<null | boolean>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [, setDisplayLoginButton] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    isUserLikes
      ? postActionDecrementLike(postId)
      : postActionIncrementLike(postId);
    setLikeCount((prev) => (isUserLikes ? prev - 1 : prev + 1));
    setIsUserLikes((prev) => !prev);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  useEffect(() => {
    async () => {
      setIsUserLikes(await postQueryIsUserLike(postId));
    };
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
                    isUserLikes ? 'fill-transparent' : 'fill-white'
                  } hover:fill-white transition-all cursor-pointer`}
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
              isUserLikes ? 'fill-white' : 'fill-transparent'
            } hover:fill-white transition-all`}
            size={18}
          />
        </button>
      )}
    </div>
  );
}
