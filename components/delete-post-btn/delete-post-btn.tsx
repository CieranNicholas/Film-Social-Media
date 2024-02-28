"use client";
import { deletePost } from "@/lib/server-actions";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { Button } from "../ui/button";

interface DeletePostBtnProps {
  postId: string;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  posts: Post[];
}

const DeletePostBtn: React.FC<DeletePostBtnProps> = ({
  postId,
  setPosts,
  posts,
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const res = await deletePost(postId);
        // router.refresh();
        setPosts([...posts.filter((post) => post.id !== postId)]);
      }}
      variant='destructive'
    >
      <IoMdTrash className='text-2xl' />
    </Button>
  );
};

export default DeletePostBtn;
