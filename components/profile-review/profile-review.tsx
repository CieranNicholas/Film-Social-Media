"use client";

import { ReviewDataType } from "@/lib/types";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { MdStar, MdStarOutline } from "react-icons/md";

interface ProfileReviewProps {
  review: ReviewDataType;
  reviewsLength: number;
  index: number;
}

const ProfileReview: React.FC<ProfileReviewProps> = ({
  review,
  index,
  reviewsLength,
}) => {
  return (
    <>
      <div className='flex items-start justify-start w-full rounded-lg md:gap-4'>
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

          <p className='text-sm text-neutral-500'>{review.mediaReleaseDate}</p>
          <div className='flex gap-2 items-start justify-center '>
            {Array.from({ length: 5 }).map((_, index) => {
              if (index < review.rating) {
                return (
                  <MdStar key={index} className='text-2xl text-yellow-500' />
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
      {index !== reviewsLength - 1 && (
        <div className='w-full h-1 bg-accent rounded-lg' />
      )}
    </>
  );
};

export default ProfileReview;
