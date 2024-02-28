import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Trending } from "@/types";

interface PosterCarouselProps {
  items: Trending[];
}

const PosterCarousel: React.FC<PosterCarouselProps> = ({ items }) => {
  return (
    <Carousel
      className='w-full'
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className='-ml-1'>
        {items.map((item) => {
          return (
            <CarouselItem
              key={item.id}
              className='pl-1 md:basis-1/6 lg:basis-1/6 bg-red-500'
            >
              <div className='p-1 '>
                <Card className='bg-red-700 border-none'>
                  <CardContent>
                    <img
                      src='http://image.tmdb.org/t/p/w220_and_h330_face/pIGLdSGbdBAKu5diYFkU5nLpXkI.jpg'
                      className='rounded-md w-full h-full object-cover'
                    />
                  </CardContent>
                  <CardFooter className='flex flex-col items-start justify-center'>
                    <p>{item.name || item.title}</p>
                    <Link
                      href={
                        item.media_type === "movie"
                          ? `/movie/${item.id}`
                          : `/tv/${item.id}`
                      }
                    ></Link>
                    <p className='text-xs'>
                      {item.release_date || item.first_air_date}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default PosterCarousel;
