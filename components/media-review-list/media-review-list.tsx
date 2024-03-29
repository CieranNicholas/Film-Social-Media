"use client";

import { ReviewDataType } from "@/lib/types";
import MediaReviewItem from "../media-review-item/media-review-item";
import Link from "next/link";
import { Button } from "../ui/button";
import useModalNewReview from "@/hooks/useModalNewReview";
import { useSession } from "next-auth/react";

interface MediaReviewListProps {
  reviews: ReviewDataType[];
  mediaId: number;
  mediaType?: "MOVIE" | "TV";
}

const MediaReviewList: React.FC<MediaReviewListProps> = ({
  reviews,
  mediaId,
  mediaType,
}) => {
  const { onOpen } = useModalNewReview();
  const { data: session } = useSession();
  return (
    <section className='w-full md:w-4/5 mx-auto xl:w-2/3 flex flex-col gap-4'>
      {session && (
        <div>
          <Button onClick={() => onOpen(mediaId, mediaType)}>
            Create Review
          </Button>
        </div>
      )}

      {reviews.length > 0 ? (
        <>
          <div className='flex flex-col gap-4'>
            {reviews.map((review, index) => (
              <MediaReviewItem
                review={review}
                key={review.id}
                index={index}
                listLength={reviews.length}
              />
            ))}
          </div>
          <Link href={`/movie/${mediaId}/reviews`}>
            <p className='underline hover:text-primary transition'>
              See more reviews...
            </p>
          </Link>
        </>
      ) : (
        <>
          {session ? (
            <div className='flex flex-col gap-2 items-start'>
              <p>No user reviews yet, why not be the first</p>
              <Button onClick={() => onOpen(mediaId, mediaType)}>
                Create Review
              </Button>
            </div>
          ) : (
            <p className='text-center'>No reviews yet. Log in to write one</p>
          )}
        </>
      )}
    </section>
  );
};

export default MediaReviewList;
