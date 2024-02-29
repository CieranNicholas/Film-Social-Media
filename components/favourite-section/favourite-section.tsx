"use client";

import { animationValues } from "@/lib/helpers";
import { motion } from "framer-motion";
import { FavFilm } from "../modal-set-fav-movie/modal-set-fav-movie";
import FavMoviesCard from "../fav-movies-card/fav-movies-card";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { GetFavouriteFilms, getFavouriteTv } from "@/lib/server-actions";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import useModalSetFavMovie from "@/hooks/useModalSetFavMovie";
import useModalSetFavTv from "@/hooks/useModalSetFavTv";

interface FavouriteSectionProps {
  sectionType: "film" | "tv";
  title: string;
  uid: string;
}

const FavouriteSection: React.FC<FavouriteSectionProps> = ({
  sectionType,
  title,
  uid,
}) => {
  const { data: session } = useSession();
  const { onOpen: openMovieSearch, isOpen: isMovieModalOpen } =
    useModalSetFavMovie();
  const { onOpen: openTvSearch, isOpen: isTvModalOpen } = useModalSetFavTv();

  const [favouriteList, setFavouriteList] = useState<FavFilm[]>([]);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      if (sectionType === "film") {
        const res = await GetFavouriteFilms(uid);
        if (!res.success) return;
        setFavouriteList(res.data);
      }
      if (sectionType === "tv") {
        const res = await getFavouriteTv(uid);
        if (!res.success) return;
        setFavouriteList(res.data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (isMovieModalOpen || isTvModalOpen) return;
      if (!session) return;
      if (sectionType === "film") {
        const res = await GetFavouriteFilms(uid);
        if (!res.success) return;
        setFavouriteList(res.data);
      }
      if (sectionType === "tv") {
        const res = await getFavouriteTv(uid);
        if (!res.success) return;
        setFavouriteList(res.data);
      }
    })();
  }, [isMovieModalOpen, isTvModalOpen]);

  return (
    <motion.section
      className='bg-card rounded-md p-4 w-full gap-4 flex flex-col items-start'
      initial={animationValues.initial}
      animate={animationValues.animate}
    >
      <h1>{title}</h1>

      {favouriteList.length > 0 ? (
        <div className='flex flex-wrap justify-between w-full gap-4 '>
          {favouriteList.map((fav) => (
            <FavMoviesCard film={fav} key={fav.id} />
          ))}
        </div>
      ) : (
        <>
          {uid === session?.user.id ? (
            <p className='text-sm'>Set your favourites to show others</p>
          ) : (
            <p className='text-sm'>
              This user has not set their favourites yet
            </p>
          )}
        </>
      )}

      {uid === session?.user.id && (
        <>
          {sectionType === "film" ? (
            <Button variant='default' onClick={openMovieSearch}>
              Update Favourite Films
            </Button>
          ) : (
            <Button variant='default' onClick={openTvSearch}>
              Update Favourite Films
            </Button>
          )}
        </>
      )}
    </motion.section>
  );
};

export default FavouriteSection;
