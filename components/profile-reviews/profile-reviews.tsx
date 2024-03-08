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
import ProfileReview from "../profile-review/profile-review";

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
      {uid === session?.user.id && (
        <Button onClick={() => onOpen()}>New Review</Button>
      )}
      <div className='flex flex-col gap-4 w-full'>
        {reviews.map((review, index) => (
          <ProfileReview
            review={review}
            index={index}
            reviewsLength={reviews.length}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ProfileReviews;
