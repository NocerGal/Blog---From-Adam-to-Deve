'use client';

import { Session } from '@prisma/client';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import TriggerAuth from '../../../../src/components/auth/TriggerAuth';
import {
  postActionDecrementLike,
  postActionIncrementLike,
} from './post.action';
import { toast } from 'sonner';

type LikePostButtonProps = {
  likeCounter: number;
  postId: string;
  checkUser: Omit<Session, 'sessionToken'> | null;
  isPostLikesByUser: boolean | undefined;
};

export function LikePostButton({
  checkUser,
  postId,
  likeCounter,
  isPostLikesByUser,
}: LikePostButtonProps) {
  const [likeCount, setLikeCount] = useState(likeCounter);
  const [isPostLikesByUserLocal, setPostLikesByUserLocal] = useState<
    undefined | boolean
  >();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [, setDisplayLoginButton] = useState(false);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const { data, serverError } = isPostLikesByUserLocal
      ? await postActionDecrementLike({ postId: postId })
      : await postActionIncrementLike({ postId: postId });

    if (data) {
      toast.success(data.message);
    } else {
      toast.error('Error occured', {
        description: serverError,
      });
    }

    setLikeCount((prev) => (isPostLikesByUserLocal ? prev - 1 : prev + 1));
    setPostLikesByUserLocal((prev) => !prev);
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 2000);
  };

  useEffect(() => {
    setPostLikesByUserLocal(isPostLikesByUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      {/* If no session, then propose to connect in order to add a like like */}
      {checkUser == null ? (
        <TriggerAuth
          alertTitle="Connect with Github to like a post"
          trigger={
            <button
              onClick={async (e) =>
                checkUser
                  ? await handleLike(e)
                  : setDisplayLoginButton((prev) => !prev)
              }
              className="flex flex-row-reverse items-center gap-1 "
              disabled={isButtonDisabled}
            >
              <div className="flex items-center gap-1">
                <span>{likeCount}</span>
                <Heart
                  className={`${
                    isPostLikesByUserLocal ? 'fill-white' : 'fill-transparent'
                  } hover:fill-white transition-all cursor-pointer`}
                  size={18}
                />
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
              isPostLikesByUser ? 'fill-white' : 'fill-transparent'
            } hover:fill-white transition-all`}
            size={18}
          />
        </button>
      )}
    </div>
  );
}
