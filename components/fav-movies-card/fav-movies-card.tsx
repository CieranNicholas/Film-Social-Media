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
      className='flex-1 min-h-28 sm:min-h-40 md:min-h-44 xl:min-h-60'
    >
      <Card
        className='h-full w-full bg-cover bg-center bg-no-repeat '
        style={{
          backgroundImage: `url("http://image.tmdb.org/t/p/w220_and_h330_face${
            film.posterPath || film.posterPath
          }")`,
        }}
      ></Card>
    </Link>
  );
};

export default FavMoviesCard;
