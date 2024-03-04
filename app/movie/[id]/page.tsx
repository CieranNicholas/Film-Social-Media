import {
  GetMovieById,
  GetMovieCreditsById,
  GetMovieWatchProvidersById,
} from "@/lib/tmbd";

import Hero from "./components/hero";
import Content from "./components/content";

interface MovieInfoProps {
  params: {
    id: string;
  };
}

const MovieInfo: React.FC<MovieInfoProps> = async ({ params }) => {
  const { id } = params;

  const movies = await GetMovieById(id);

  const credits = await GetMovieCreditsById(id);

  const providers = await GetMovieWatchProvidersById(id);

  return (
    <main className='flex flex-col justify-start items-center h-[100vh] w-full text-white'>
      <Hero movie={movies} />
      <Content movie={movies} credits={credits} providers={providers} />
    </main>
  );
};

export default MovieInfo;
