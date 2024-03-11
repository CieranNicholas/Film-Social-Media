import {
  GetMovieById,
  GetMovieCreditsById,
  GetMovieVideosById,
  GetMovieWatchProvidersById,
} from "@/lib/tmbd";

import Hero from "./components/hero";
import Content from "./components/content";
import {
  getAvarageReviewRating,
  getPopularReviewsByMediaId,
} from "@/lib/server-actions";

interface MovieInfoProps {
  params: {
    id: string;
  };
}

const MovieInfo: React.FC<MovieInfoProps> = async ({ params }) => {
  const { id } = params;

  const movies = await GetMovieById(id);

  if (!movies) {
    return (
      <main className='flex flex-col justify-center items-center h-[100vh] w-full text-white bg-background'>
        <p>Movie not found</p>
      </main>
    );
  }

  const credits = await GetMovieCreditsById(id);

  const providers = await GetMovieWatchProvidersById(id);

  const videos = await GetMovieVideosById(id);

  const reviews = await getPopularReviewsByMediaId(Number(id));

  const avarageRating = await getAvarageReviewRating(Number(id));

  return (
    <main className='flex flex-col justify-start items-center h-[100vh] w-full text-white'>
      <Hero movie={movies} videos={videos} avarageRating={avarageRating.data} />
      <Content
        movie={movies}
        credits={credits}
        providers={providers}
        reviews={reviews.data}
      />
    </main>
  );
};

export default MovieInfo;
