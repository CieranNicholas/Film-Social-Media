"use client";

import { Post, User } from "@prisma/client";
import ProfilePost from "../profile-post/profile-post";

interface ProfilePostsProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  user: User;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({
  posts,
  setPosts,
  user,
}) => {
  if (posts.length === 0)
    return (
      <div className='bg-accent rounded-md p-4 flex flex-col gap-4'>
        <p>This user has not posted anything yet</p>
      </div>
    );

  return (
    <>
      {posts.map((post: Post) => {
        return (
          <ProfilePost
            post={post}
            posts={posts}
            setPosts={setPosts}
            user={user}
            key={post.id}
          />
        );
      })}
    </>
  );
};

export default ProfilePosts;
