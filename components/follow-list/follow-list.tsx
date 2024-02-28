"use client";

import { UserDataType } from "@/lib/types";
import FollowBtn from "../follow-btn/follow-btn";
import { Session } from "next-auth";

interface FollowListProps {
  list: UserDataType[];
  data: Session | null;
  user: UserDataType;
}

const FollowList: React.FC<FollowListProps> = ({ list, data, user }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {list?.map((follower) => (
        <div
          key={follower.id}
          className='flex justify-start items-center w-full p-4 rounded-md hover:bg-accent'
        >
          <div className='flex justify-start items-center gap-4'>
            <div className='h-10 w-10 rounded-full overflow-hidden'>
              <img src={follower.image!} alt='' className='object-contain' />
            </div>
            <p>{follower.name}</p>
          </div>

          <div className='ml-auto'>
            {user && data && (
              <FollowBtn userId={data.user.id} followingId={user.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowList;
