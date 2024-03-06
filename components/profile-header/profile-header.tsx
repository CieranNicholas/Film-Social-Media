"use client";

import { animationValues } from "@/lib/helpers";
import { UserDataType } from "@/lib/types";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import FollowBtn from "@/components/follow-btn/follow-btn";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProfileHeaderProps {
  user: UserDataType;
  data: Session | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, data }) => {
  return (
    <motion.section
      // className='flex items-end justify-start gap-4 bg-card rounded-md p-4 w-full'
      className='bg-card rounded-md p-4 w-full flex flex-col items-center justify-center sm:justify-start sm:gap-4 sm:flex-row'
      initial={animationValues.initial}
      animate={animationValues.animate}
    >
      <div className='rounded-full w-24 h-24 overflow-hidden border-4 border-white'>
        <Link href={`/${user.username}`}>
          <img
            src={user.image as string}
            alt='user image'
            className='object-contain'
          />
        </Link>
      </div>
      <div className='flex flex-col gap-2 items-center sm:items-start justify-center pb-2'>
        <div className='flex flex-col justify-center items-center sm:items-start'>
          <h1 className='font-bold'>{user.name}</h1>
          <h1>@{user.username}</h1>
        </div>
        <div className='flex gap-4 text-sm'>
          <Link href={`/${user.username}/followers`} scroll={false}>
            <p>{user.followers.length} Followers</p>
          </Link>
          <Link href={`/${user.username}/following`} scroll={false}>
            <p>{user.following.length} Following</p>
          </Link>
        </div>
      </div>
      {/* Check if the profile exists and that the users logged in */}
      {user && data && (
        <>
          {/* Check if the user is currently viewing their own profile */}
          {user.id === data?.user.id ? (
            <div className='sm:ml-auto sm:mt-auto mb-2'>
              <Button asChild variant='default'>
                <Link href='/profile/settings'>Settings</Link>
              </Button>
            </div>
          ) : (
            <div className='sm:ml-auto sm:my-auto'>
              <FollowBtn userId={data.user.id} followingId={user.id} />
            </div>
          )}
        </>
      )}
    </motion.section>
  );
};

export default ProfileHeader;
