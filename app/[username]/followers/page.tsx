"use client";

import FollowList from "@/components/follow-list/follow-list";
import ProfileHeader from "@/components/profile-header/profile-header";
import { Button } from "@/components/ui/button";
import { animationValues } from "@/lib/helpers";
import {
  getUserDataFromId,
  getUserDataFromUsername,
} from "@/lib/server-actions";
import { UserDataType } from "@/lib/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Followers = () => {
  const { username } = useParams();
  const pathname = usePathname();
  const { data } = useSession();

  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const [followers, setFollowers] = useState<UserDataType[]>([]);

  useEffect(() => {
    (async () => {
      if (!username) return;
      const res = await getUserDataFromUsername(username as string);
      if (!res.success) return;
      setUser(res.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!user) return;
      for (const follower of user.followers) {
        const res = await getUserDataFromId(follower.followerId);
        if (res.success) {
          setFollowers((prev) => {
            if (prev.some((p) => p.id === res.data.id)) return prev;
            return [...prev, res.data];
          });
        }
      }
    })();
  }, [user]);

  if (!user) return <Loading />;

  return (
    <main className='flex justify-center items-start px-4 pt-16 pb-8 mx-auto md:px-0 md:pt-32 md:pb-16 bg-background h-full w-full text-white min-h-[100vh]'>
      <div className='flex flex-col gap-4 w-full md:w-2/3 xl:w-1/2'>
        <ProfileHeader user={user} data={data} />
        <motion.section
          className='flex items-end justify-center gap-4 bg-card rounded-md p-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <Button asChild variant='ghost'>
            <Link href={`/${username}/followers`} scroll={false}>
              <p
                className={
                  pathname === `/${username}/followers`
                    ? "border-primary border-double border-b"
                    : ""
                }
              >
                Followers
              </p>
            </Link>
          </Button>
          <Button asChild variant='ghost'>
            <Link href={`/${username}/following`} scroll={false}>
              <p
                className={
                  pathname === `/${username}/following`
                    ? "border-primary border-double border-b"
                    : ""
                }
              >
                Following
              </p>
            </Link>
          </Button>
        </motion.section>
        <motion.section
          className='flex items-end justify-start gap-4 bg-card rounded-md p-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          {followers.length > 0 ? (
            <FollowList list={followers} data={data} user={user} />
          ) : (
            <p className='m-auto text-white/80'>
              Looks like this user has no followers yet 😔
            </p>
          )}
        </motion.section>
      </div>
    </main>
  );
};

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-neutral-900 min-h-[100vh]'>
      <HashLoader color='#36d7b7' size={50} />
    </div>
  );
};

export default Followers;
