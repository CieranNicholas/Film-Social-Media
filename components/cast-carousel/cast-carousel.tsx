'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface CastCarouselProps {
	cast: any;
}

const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
	return (
		<Carousel
			className='w-full md:w-4/5 mx-auto xl:w-2/3'
			opts={{
				align: 'start',
				loop: true,
			}}
		>
			<CarouselContent className=''>
				{cast.map((actor: any) => (
					<CarouselItem key={actor.cast_id} className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-4'>
						<div className='flex flex-col justify-center items-center w-full overflow-hidden'>
							{actor.profile_path && (
								<div className='rounded-full h-32 w-32 overflow-hidden'>
									<img
										src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
										className='w-full h-full object-cover object-center'
									/>
								</div>
							)}
							<div
								className={`flex flex-col p-4 items-center justify-center w-full text-center  ${
									!actor.profile_path && 'border h-20 rounded-md max-h-20'
								}`}
							>
								<p className='font-bold text-md truncate w-full'>{actor.name}</p>
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
