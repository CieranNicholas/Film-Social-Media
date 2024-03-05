"use client";

import { animationValues } from "@/lib/helpers";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useModalNewReview from "@/hooks/useModalNewReview";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { ReviewDataType } from "@/lib/types";
import { MdStar, MdStarOutline } from "react-icons/md";

interface ProfileReviewsProps {
  uid: string;
  reviews: ReviewDataType[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewDataType[]>>;
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({
  uid,
  reviews,
  setReviews,
}) => {
  const { data: session } = useSession();
  const { onOpen } = useModalNewReview();

  return (
    <motion.section
      className='bg-card rounded-md p-4 w-full gap-4 flex flex-col items-start'
      initial={animationValues.initial}
      animate={animationValues.animate}
    >
      <h1>Reviews</h1>
      {uid === session?.user.id && <Button onClick={onOpen}>New Review</Button>}
      <div className='flex flex-col gap-4 w-full'>
        {reviews.map((review: ReviewDataType, index: number) => (
          <>
            <div
              key={review.id}
              className='flex items-start justify-start w-full rounded-lg md:gap-4'
            >
              <Link
                href={
                  review.mediaType === "MOVIE"
                    ? `/movie/${review.mediaId}`
                    : `/tv/${review.mediaId}`
                }
              >
                <img
                  src={`http://image.tmdb.org/t/p/w92${review.posterPath}`}
                  className='rounded-lg hover:scale-105 transition-all ease-in-out duration-300 hidden md:block'
                />
              </Link>
              <div className='flex flex-col items-start justify-start gap-1 h-full w-full'>
                <Link
                  href={
                    review.mediaType === "MOVIE"
                      ? `/movie/${review.mediaId}`
                      : `/tv/${review.mediaId}`
                  }
                >
                  <p className='font-semibold hover:text-primary transition-all ease-in-out duration-200'>
                    {review.mediaTitle}
                  </p>
                </Link>

                <p className='text-sm text-neutral-500'>
                  {review.mediaReleaseDate}
                </p>
                <div className='flex gap-2 items-start justify-center '>
                  {Array.from({ length: 5 }).map((_, index) => {
                    if (index < review.rating) {
                      return (
                        <MdStar
                          key={index}
                          className='text-2xl text-yellow-500'
                        />
                      );
                    } else {
                      return (
                        <MdStarOutline
                          key={index}
                          className='text-2xl text-yellow-500'
                        />
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
            </div>
            {index !== reviews.length - 1 && (
              <div className='w-full h-1 bg-accent rounded-lg' />
            )}
          </>
        ))}
      </div>
    </motion.section>
  );
};

export default ProfileReviews;
