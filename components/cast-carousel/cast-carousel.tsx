"use client";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

interface CastCarouselProps {
  cast: any;
}

const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  return (
    <Carousel
      className='w-full px-12'
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className='-ml-1'>
        {cast.map((actor: any) => (
          <CarouselItem
            key={actor.cast_id}
            className='basis-1/4 md:basis-1/6 2xl:basis-1/12 pl-1'
          >
            <div className='flex flex-col justify-start items-center max-w-[138px] rounded-lg overflow-hidden'>
              <img
                src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                alt=''
              />
              <div className='flex flex-col bg-card p-4 items-start justify-start w-full'>
                <p className='font-bold'>{actor.name}</p>
                <p className='text-sm'>{actor.character}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CastCarousel;
