"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FavFilm } from "../modal-set-fav-movie/modal-set-fav-movie";

interface FavMoviesCardProps {
  onClick?: () => void;
  film: FavFilm;
}

const FavMoviesCard: React.FC<FavMoviesCardProps> = ({ onClick, film }) => {
  return (
    <Card
      className='flex-1 bg-cover bg-center bg-no-repeat min-h-28 sm:min-h-40 md:min-h-44 xl:min-h-60'
      onClick={onClick}
      style={{
        backgroundImage: `url("http://image.tmdb.org/t/p/w220_and_h330_face${
          film.posterPath || film.posterPath
        }")`,
      }}
    >
      <CardContent>
        {/* <h1 className='shadow'>{film.mediaTitle}</h1> */}
      </CardContent>
    </Card>
  );
};

export default FavMoviesCard;
