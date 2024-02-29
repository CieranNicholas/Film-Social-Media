"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUsername } from "@/lib/server-actions";
import { UserDataType } from "@/lib/types";
import { useState } from "react";
import toast from "react-hot-toast";

interface UpdateUsernameFormProps {
  user: UserDataType;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | undefined>>;
}

const UpdateUsernameForm: React.FC<UpdateUsernameFormProps> = ({
  user,
  setUser,
}) => {
  const [isUsernameUpdating, setIsUsernameUpdating] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const handleUpdateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUsername.length < 2)
      return toast.error("Username must be at least 2 characters long");
    if (!user) return;
    setIsUsernameUpdating(true);
    const res = await updateUsername(user.id, newUsername);
    if (res?.success) {
      toast.success(res.message);
      setNewUsername("");
      setUser((value: UserDataType | undefined) =>
        value ? { ...value, username: newUsername } : undefined
      );
    }
    setIsUsernameUpdating(false);
  };

  return (
    <form
      className='text-slate-100 p-2 rounded shadow flex flex-col gap-2 justify-center items-start'
      onSubmit={handleUpdateUsername}
    >
      <h1>Update Username</h1>
      <div className='flex w-full items-center space-x-2'>
        <Input
          type='text'
          placeholder='Username'
          className='bg-accent'
          id='username'
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={isUsernameUpdating}
        />
        <Button type='submit' disabled={isUsernameUpdating}>
          Update Username
        </Button>
      </div>
    </form>
  );
};

export default UpdateUsernameForm;
