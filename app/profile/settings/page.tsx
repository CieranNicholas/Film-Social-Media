"use client";

import { getUserDataFromId, updateProfileImage } from "@/lib/server-actions";
import { UserDataType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import UpdatePasswordForm from "./components/update-password-form";

const MyProfile = () => {
  const imageFormRef = useRef<HTMLFormElement>(null);
  const { data } = useSession();

  const [user, setUser] = useState<UserDataType | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (data) {
        const res = await getUserDataFromId(data.user.id);
        if (!res.success) return;
        setUser(res.data);
      }
    })();
  }, [data]);

  if (!user) return <Loading />;

  return (
    <main className='flex flex-col items-center gap-4 px-24 py-12 bg-neutral-900 h-full w-full text-white min-h-[100vh]'>
      <div className='flex flex-col gap-4 w-2/3 items-center justify-start'>
        <section className='flex items-end justify-start gap-4 bg-neutral-800 rounded-md p-4 w-full'>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold'> Name</p>
            <p>{user.name}</p>
            <p className='text-lg font-semibold'>Email</p>
            <p>{user.email}</p>
          </div>
        </section>
        <section className='flex items-end justify-start gap-4 bg-neutral-800 rounded-md p-4 w-full'>
          <UpdatePasswordForm user={user} />
        </section>
        <section className='flex items-end justify-start gap-4 bg-neutral-800 rounded-md p-4 w-full'>
          <form
            action={async (formData: FormData) => {
              const url = formData.get("url") as string;
              const res = await updateProfileImage(user.id, url);
              if (res.success) {
                setUser({ ...user, image: url });
                toast.success(res.message);
              }
              imageFormRef.current?.reset();
            }}
            className='text-slate-100 p-2 rounded shadow flex flex-col gap-2 justify-center items-start'
            ref={imageFormRef}
          >
            <p className='text-lg font-semibold'>Current Image</p>
            <div className='w-24 h-24 rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover object-center'
                src={user.image as string}
                alt='Avatar'
              />
            </div>

            <input
              type='url'
              className='text-black px-4 py-2'
              name='url'
              placeholder='image url'
            />
            <input
              type='submit'
              value='Update Image'
              className=' px-4 py-2 bg-white text-black rounded shadow'
            />
          </form>
        </section>
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

export default MyProfile;
