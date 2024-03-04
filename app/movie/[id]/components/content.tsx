"use client";

import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Movie } from "@/types";

interface ContentProps {
  movie: Movie;
  credits: any;
  providers: any;
}

type Country = "US" | "GB";

const Content: React.FC<ContentProps> = ({ movie, credits, providers }) => {
  const { results } = providers;

  const [country, setCountry] = useState<string>("GB");
  return (
    <section className='flex flex-col items-start justify-center w-full h-full bg-background relative gap-4 py-8'>
      <h1 className='text-xl px-12'>Top Billed Cast</h1>
      <Carousel
        className='w-full px-12'
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className='-ml-1'>
          {credits.cast.splice(0, 20).map((actor: any) => (
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

      <div className='w-full flex px-12 justify-start gap-4 items-center'>
        <h1 className='text-xl '>Where to watch?</h1>
        <Select
          defaultValue={country}
          onValueChange={(value: string) => setCountry(value as Country)}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(results).map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex flex-1 flex-wrap px-12 gap-4 xl:gap-8 justify-start w-full '>
        {results[country]?.flatrate && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Stream</h1>
            <div className='flex flex-1 flex-wrap gap-4'>
              {results[country]?.flatrate.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}
        {results[country]?.rent && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Rent</h1>
            <div className='flex gap-4 flex-1 flex-wrap'>
              {results[country]?.rent.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}

        {results[country]?.buy && (
          <div className='flex flex-col gap-2'>
            <h1 className='text-lg'>Buy</h1>
            <div className='flex gap-4 flex-1 flex-wrap'>
              {results[country]?.buy.map((provider: any) => (
                <img
                  key={provider.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                  className='rounded-lg w-[45px] h-[45px]'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Content;
