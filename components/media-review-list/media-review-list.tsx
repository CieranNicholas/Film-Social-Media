"use client";

import { ReviewDataType } from "@/lib/types";
import MediaReviewItem from "../media-review-item/media-review-item";
import Link from "next/link";

interface MediaReviewListProps {
  reviews: ReviewDataType[];
  mediaId: number;
}

const MediaReviewList: React.FC<MediaReviewListProps> = ({
  reviews,
  mediaId,
}) => {
  return (
    <section className='w-full md:w-4/5 mx-auto xl:w-2/3 flex flex-col gap-4'>
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
    </section>
  );
};

export default MediaReviewList;
