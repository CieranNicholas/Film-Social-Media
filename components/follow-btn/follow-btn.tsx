"use client";

import {
  followUser,
  isFollowing as checkIsFollowing,
  unfollowUser,
} from "@/lib/server-actions";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
            console.log(data);
            if (data.success) {
              setIsFollowing(false);
            }
          }}
        >
          <Button type='submit' variant='destructive'>
            Unfollow
          </Button>
        </form>
      ) : (
        <form
          action={async () => {
            const data = await followUser(userId, followingId);
            console.log(data);
            if (data.success) {
              setIsFollowing(true);
            }
          }}
        >
          <Button type='submit'>Follow</Button>
        </form>
      )}
    </>
  );
};

export default FollowBtn;
