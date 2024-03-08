"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FavFilm } from "../modal-set-fav-movie/modal-set-fav-movie";
import Link from "next/link";

interface FavMoviesCardProps {
  film: FavFilm;
  sectionType: "film" | "tv";
}

const FavMoviesCard: React.FC<FavMoviesCardProps> = ({ film, sectionType }) => {
  return (
    <Link
      href={
        sectionType === "film"
          ? `/movie/${film.mediaId}`
          : `/tv/${film.mediaId}`
      }
      className='min-h-48 basis-1/2 sm:basis-1/3 md:basis-1/5 p-2'
    >
      <div
        className='h-full w-full  bg-red-400 rounded-lg bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url("http://image.tmdb.org/t/p/w220_and_h330_face${film.posterPath}")`,
        }}
      ></div>
    </Link>
  );
};

export default FavMoviesCard;
