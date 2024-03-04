import { Movie } from "@/types";
import CastCarousel from "@/components/cast-carousel/cast-carousel";
import CountryProvidersList from "@/components/country-providers-list/country-providers-list";

interface ContentProps {
  movie: Movie;
  credits: any;
  providers: any;
}

const Content: React.FC<ContentProps> = ({ movie, credits, providers }) => {
  const { results } = providers;

  return (
    <section className='flex flex-col items-start justify-center w-full h-full bg-background relative gap-4 py-8'>
      <CastCarousel cast={credits.cast.splice(0, 20)} />

      <CountryProvidersList providers={results} />
    </section>
  );
};

export default Content;
