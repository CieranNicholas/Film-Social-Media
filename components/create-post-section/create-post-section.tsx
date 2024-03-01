"use client";

import { motion } from "framer-motion";
import CreatePostForm from "../create-post-form/create-post-form";
import { animationValues } from "@/lib/helpers";
import { Post } from "@prisma/client";

interface CreatePostSectionProps {
  shouldShow?: boolean;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const CreatePostSection: React.FC<CreatePostSectionProps> = ({
  shouldShow,
  posts,
  setPosts,
}) => {
  if (!shouldShow) return null;

  return (
    <motion.section
      className='bg-card rounded-md p-4 w-full'
      initial={animationValues.initial}
      animate={animationValues.animate}
    >
      <CreatePostForm posts={posts} setPosts={setPosts} />
    </motion.section>
  );
};

export default CreatePostSection;
