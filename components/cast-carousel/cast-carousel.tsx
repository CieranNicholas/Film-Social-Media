"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CastCarouselProps {
  cast: any;
}

const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  return (
    <Carousel
      className='w-full md:w-4/5 mx-auto xl:w-2/3'
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className='-ml-1'>
        {cast.map((actor: any) => (
          <CarouselItem
            key={actor.cast_id}
            className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4'
          >
            <div className='flex flex-col justify-center items-center w-full overflow-hidden'>
              <div className='rounded-full h-32 w-32 overflow-hidden'>
                <img
                  src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                  className='w-full h-full object-cover object-center'
                />
              </div>
              <div className='flex flex-col p-4 items-center justify-start w-full text-center'>
                <p className='font-bold text-md'>{actor.name}</p>
                <p className='text-xs'>{actor.character}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CastCarousel;
