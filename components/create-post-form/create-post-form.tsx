"use client";

import { createPost } from "@/lib/server-actions";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";

interface CreatePostFormProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ posts, setPosts }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <form
      action={async (formData: FormData) => {
        setIsDisabled(true);
        const res = await createPost(formData, user?.id as string);
        setIsDisabled(false);
        formRef.current?.reset();
        if (res.success) {
          setPosts([...posts, res.data]);
        }
      }}
      className='w-full flex flex-col items-start justify-center gap-4'
      ref={formRef}
    >
      <textarea
        className='bg-accent rounded-md px-4 py-2 w-full resize-none'
        placeholder="What's on your mind?"
        name='post'
      />
      <Button type='submit' variant='default' disabled={isDisabled}>
        Post
      </Button>
    </form>
  );
};

export default CreatePostForm;
