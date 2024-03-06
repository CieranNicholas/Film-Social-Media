"use client";

import { getUserDataFromId } from "@/lib/server-actions";
import { ReviewDataType } from "@/lib/types";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdStar, MdStarOutline } from "react-icons/md";

interface MediaReviewItemProps {
  review: ReviewDataType;
  index: number;
  listLength: number;
}

const MediaReviewItem: React.FC<MediaReviewItemProps> = ({
  review,
  index,
  listLength,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const user = await getUserDataFromId(review.authorId);
      if (!user.success) return;
      setUser(user.data);
    })();
  }, []);
  return (
    <div className='flex flex-col items-start justify-start gap-1 h-full w-full bg-card p-4 rounded-lg'>
      <Link
        href={`/${user?.username}`}
        className='flex gap-2 items-center justify-start'
      >
        <p className='font-semibold hover:text-primary transition-all ease-in-out duration-200'>
          @ {user?.username}
        </p>
        <p className='italic text-sm text-gray-400'>
          ({review.mediaReleaseDate})
        </p>
      </Link>
      <p className='text-sm text-neutral-500'></p>
      <div className='flex gap-2 items-start justify-center '>
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < review.rating) {
            return <MdStar key={index} className='text-2xl text-yellow-500' />;
          } else {
            return (
              <MdStarOutline key={index} className='text-2xl text-yellow-500' />
            );
          }
        })}
      </div>
      <p className='text-sm'>{review.content}</p>
      <div className='flex justify-start items-center w-full gap-2 mt-8'>
        <FaHeart className='cursor-pointer' />
        <p>{review.likes.length} likes</p>
      </div>
    </div>
  );
};

export default MediaReviewItem;
