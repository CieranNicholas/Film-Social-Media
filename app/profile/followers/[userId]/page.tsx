"use client";

import FollowList from "@/components/follow-list/follow-list";
import { getUserDataFromId } from "@/lib/server-actions";
import { UserDataType } from "@/lib/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const animationValues = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

interface FollowersProps {
  params: { userId: string };
}

const Followers: React.FC<FollowersProps> = ({ params }) => {
  const { data } = useSession();

  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const [followers, setFollowers] = useState<UserDataType[]>([]);
  useEffect(() => {
    (async () => {
      if (data) {
        const res = await getUserDataFromId(params.userId);
        if (!res.success) return;
        setUser(res.data);
      }
    })();
  }, [data]);

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
    <main className='flex justify-center items-start px-4 py-4 mx-auto md:px-0 md:py-12 bg-background h-full w-full text-white min-h-[100vh]'>
      <div className='flex flex-col gap-4 w-full md:w-2/3 xl:w-1/2'>
        <motion.section
          className='flex items-end justify-start gap-4 bg-card rounded-md p-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <FollowList list={followers} data={data} user={user} />
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
