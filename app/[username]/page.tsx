"use client";

import CreatePostSection from "@/components/create-post-section/create-post-section";
import FavouriteSection from "@/components/favourite-section/favourite-section";
import ProfileHeader from "@/components/profile-header/profile-header";
import ProfilePosts from "@/components/profile-posts/profile-posts";
import ProfileReviews from "@/components/profile-reviews/profile-reviews";
import useModalNewReview from "@/hooks/useModalNewReview";
import {
  getReviewsFromUserId,
  getUserDataFromUsername,
} from "@/lib/server-actions";
import { ReviewDataType, UserDataType } from "@/lib/types";
import { Review } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface ProfileProps {
  params: { username: string };
}

const animationValues = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Profile: React.FC<ProfileProps> = ({ params }) => {
  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const { data } = useSession();
  const { isOpen } = useModalNewReview();

  const [reviews, setReviews] = useState<ReviewDataType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getUserDataFromUsername(params.username);
      if (!res.success) return;
      setUser(res.data);
    })();
  }, [data]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const reviews = await getReviewsFromUserId(user.id);
      console.log(reviews);
      if (!reviews.success) return console.error(reviews.message);
      setReviews(reviews.data);
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (!isOpen) {
      (async () => {
        const reviews = await getReviewsFromUserId(user.id);
        if (!reviews.success) return console.error(reviews.message);
        setReviews(reviews.data);
      })();
    }
  }, [isOpen]);

  if (!user) return <Loading />;

  return (
    <main className='flex justify-center items-center px-4 pt-16 pb-8 mx-auto md:px-0 md:pt-32 md:pb-16 bg-background h-full w-full text-white min-h-[100vh]'>
      <div className='flex flex-col gap-4 w-full md:w-2/3 xl:w-1/2'>
        <ProfileHeader user={user} data={data} />
        <FavouriteSection
          sectionType='film'
          title='Favourite Films'
          uid={user.id}
        />
        <FavouriteSection
          sectionType='tv'
          title='Favourite TV Shows'
          uid={user.id}
        />
        <ProfileReviews
          uid={user.id}
          reviews={reviews}
          setReviews={setReviews}
        />
        {/* <CreatePostSection
          shouldShow={user.id === data?.user.id}
          posts={posts}
          setPosts={setPosts}
        />

        <motion.section
          className='bg-card rounded-md p-4 flex flex-col gap-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <ProfilePosts posts={posts} setPosts={setPosts} user={user} />
        </motion.section> */}
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

export default Profile;
