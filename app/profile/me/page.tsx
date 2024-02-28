"use client";

import CreatePostForm from "@/components/create-post-form/create-post-form";
import FavMoviesCard from "@/components/fav-movies-card/fav-movies-card";
import ProfilePosts from "@/components/profile-posts/profile-posts";
import {
  GetFavouriteFilms,
  getFavouriteTv,
  getUserDataFromId,
} from "@/lib/server-actions";
import { UserDataType } from "@/lib/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

import useModalSetFavMovie from "@/hooks/useModalSetFavMovie";
import useModalSetFavTv from "@/hooks/useModalSetFavTv";
import { FavFilm } from "@/components/modal-set-fav-movie/modal-set-fav-movie";
import { Button } from "@/components/ui/button";

const animationValues = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const ProfileMe = () => {
  const { data } = useSession();
  const { onOpen, isOpen } = useModalSetFavMovie();
  const { onOpen: openTvSearch, isOpen: onTvModalOpen } = useModalSetFavTv();
  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const [favMovies, setFavMovies] = useState<FavFilm[]>([]);
  const [favTv, setFavTv] = useState<FavFilm[]>([]);
  useEffect(() => {
    (async () => {
      if (data) {
        const res = await getUserDataFromId(data.user.id);
        const favFilms = await GetFavouriteFilms(data.user.id);
        const favTv = await getFavouriteTv(data.user.id);
        if (!favFilms.success || !favTv.success || !res.success) return;
        setFavMovies(favFilms.data);
        setFavTv(favTv.data);
        setUser(res.data);
      }
    })();
  }, [data]);

  useEffect(() => {
    (async () => {
      if (!onTvModalOpen || !isOpen) {
        if (!data) return;
        const favFilms = await GetFavouriteFilms(data.user.id);
        const favTv = await getFavouriteTv(data.user.id);
        setFavMovies(favFilms.data);
        setFavTv(favTv.data);
      }
    })();
  }, [onTvModalOpen, isOpen]);

  if (!user) return <Loading />;

  return (
    <main className='flex justify-center items-center  px-4 py-4 mx-auto md:px-0 md:py-12 bg-background h-full w-full text-white min-h-[100vh]'>
      <div className='flex flex-col gap-4 w-full md:w-2/3 xl:w-1/2'>
        <motion.section
          className='flex items-end justify-start gap-4 bg-card rounded-md p-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <div className='rounded-full w-24 h-24 overflow-hidden border-4 border-white'>
            <img
              src={user.image as string}
              alt='user image'
              className='object-contain'
            />
          </div>
          <div className='flex flex-col gap-2 items-start justify-center pb-2'>
            <h1>{user.name}</h1>
            <h1>{user.followers.length} Followers</h1>
          </div>

          <div className='ml-auto mt-auto mb-2'>
            <Button asChild variant='default'>
              <Link href='/profile/settings'>Settings</Link>
            </Button>
          </div>
        </motion.section>
        {/* Fav Movie */}
        <motion.section
          className='bg-card rounded-md p-4 w-full gap-4 flex flex-col items-start'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <h1>Favourite Movies</h1>
          {/* <div className='flex flex-wrap justify-between w-full gap-4 '> */}
          <div className='flex flex-wrap justify-between w-full gap-4 '>
            {favMovies.map((film) => (
              <FavMoviesCard film={film} key={film.id} />
            ))}
          </div>
          <Button variant='default' onClick={onOpen}>
            Update Favourite Films
          </Button>
        </motion.section>
        {/* Fav TV */}
        <motion.section
          className='bg-card rounded-md p-4 w-full gap-4 flex flex-col items-start'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <h1>Favourite TV</h1>
          <div className='flex flex-wrap justify-between w-full gap-4'>
            {favTv.map((film) => (
              <FavMoviesCard film={film} key={film.id} />
            ))}
          </div>
          <Button variant='default' onClick={openTvSearch}>
            Update Favourite TV Shows
          </Button>
        </motion.section>
        <motion.section
          className='bg-card rounded-md p-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <CreatePostForm />
        </motion.section>

        <motion.section
          className='bg-card rounded-md p-4 flex flex-col gap-4 w-full'
          initial={animationValues.initial}
          animate={animationValues.animate}
        >
          <ProfilePosts postProp={user.posts} user={user} />
        </motion.section>
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

export default ProfileMe;
