"use client";

import {
  followUser,
  isFollowing as checkIsFollowing,
  unfollowUser,
} from "@/lib/server-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FollowBtnProps {
  userId: string;
  followingId: string;
}

const FollowBtn: React.FC<FollowBtnProps> = ({ userId, followingId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    (async () => {
      setIsFollowing(await checkIsFollowing(userId, followingId));
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      {isFollowing ? (
        <form
          action={async () => {
            const data = await unfollowUser(userId, followingId);
            if (data) {
              setIsFollowing(false);
            }
          }}
        >
          <input
            type='submit'
            value='Unfollow'
            className='px-4 py-2 bg-red-600 rounded-md'
          />
        </form>
      ) : (
        <form
          action={async () => {
            const data = await followUser(userId, followingId);
            if (data) {
              setIsFollowing(true);
            }
          }}
        >
          <input
            type='submit'
            value='Follow'
            className='px-4 py-2 bg-sky-600 rounded-md'
          />
        </form>
      )}
    </>
  );
};

export default FollowBtn;
