"use client";

import { motion } from "framer-motion";
import CreatePostForm from "../create-post-form/create-post-form";
import { animationValues } from "@/lib/helpers";

interface CreatePostSectionProps {
  shouldShow?: boolean;
}

const CreatePostSection: React.FC<CreatePostSectionProps> = ({
  shouldShow,
}) => {
  if (!shouldShow) return null;

  return (
    <motion.section
      className='bg-card rounded-md p-4 w-full'
      initial={animationValues.initial}
      animate={animationValues.animate}
    >
      <CreatePostForm />
    </motion.section>
  );
};

export default CreatePostSection;
