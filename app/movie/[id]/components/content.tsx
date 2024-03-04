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
import CastCarousel from "@/components/cast-carousel/cast-carousel";
import CountryProvidersList from "@/components/country-providers-list/country-providers-list";

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
      <CastCarousel cast={credits.cast.splice(0, 20)} />

      <CountryProvidersList providers={results} />
    </section>
  );
};

export default Content;
