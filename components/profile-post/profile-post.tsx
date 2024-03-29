"use client";

import { formatDate } from "@/lib/helpers";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import { IoMdHeart } from "react-icons/io";
import DeletePostBtn from "../delete-post-btn/delete-post-btn";

interface ProfilePostProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  post: Post;
  user: User;
}

const ProfilePost: React.FC<ProfilePostProps> = ({
  posts,
  setPosts,
  post,
  user,
}) => {
  return (
    <div className='bg-accent rounded-md p-4 flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Link
          className='rounded-full w-12 h-12 overflow-hidden'
          href={`/${user?.id}`}
        >
          <img src={user?.image!} alt='user image' className='object-contain' />
        </Link>
        <div className='flex flex-col text-sm justify-center'>
          <Link href={`/${user?.id}`}>
            <p className='font-semibold'>{user?.name}</p>
          </Link>
          <p className='text-xs text-white/75'>{formatDate(post.createdAt)}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <div className='flex items-center'>
        {/* TODO: add like functionanilty */}
        <IoMdHeart className='text-2xl' />
        <DeletePostBtn postId={post.id} setPosts={setPosts} posts={posts} />
      </div>
    </div>
  );
};

export default ProfilePost;
