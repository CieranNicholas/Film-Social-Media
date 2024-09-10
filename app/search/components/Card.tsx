'use client';

import { Card as ShadCnCard, CardContent } from '@/components/ui/card';
import { extractYear } from '@/lib/helpers';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	movie: Movie;
}

const Card: React.FC<Props> = ({ movie }) => {
	return (
		<ShadCnCard key={movie.id} className='border-0 w-[150px] sm:w-[200px]'>
			<CardContent className='p-0 relative cursor-pointer'>
				<Link href={`/${movie.media_type}/${movie.id}`}>
					<div className='relative h-[200px] sm:h-[300px] w-full rounded-md'>
						<Image
							src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
							alt={movie.title || movie.name || movie.original_title || movie.original_name}
							fill
							className='object-cover rounded-md'
							style={{
								borderRadius: '0.5rem',
							}}
							sizes='(max-width: 200px) 100vw, 200px'
						/>
					</div>
					<div className='absolute left-0 bottom-0 w-full flex flex-col items-center justify-center py-4 px-2 bg-gradient-to-b from-transparent to-black rounded-b-md'>
						<p className='text-gray-300 text-sm'>
							{extractYear(movie.release_date || movie.first_air_date)} • <span className='uppercase'>{movie.media_type}</span> •
							{` ${Math.floor(movie.vote_average)} / 10`}
						</p>
						<p className='shadow-md w-full text-center'>
							{movie.title || movie.name || movie.name || movie.original_title || movie.original_name}
						</p>
					</div>
				</Link>
			</CardContent>
		</ShadCnCard>
	);
};

export default Card;
