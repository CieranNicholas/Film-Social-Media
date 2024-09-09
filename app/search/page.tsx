import { Card, CardContent } from '@/components/ui/card';
import { extractYear } from '@/lib/helpers';
import { SearchForMovie, SearchForTv } from '@/lib/tmbd';
import Image from 'next/image';
interface Props {
	searchParams: {
		title: string;
	};
}

const Search: React.FC<Props> = async ({ searchParams }) => {
	const query = searchParams.title;
	const movies = await SearchForMovie(query);
	const tv = await SearchForTv(query);

	movies.map((_, index) => {
		movies[index].media_type = 'movie';
	});

	tv.map((_, index) => {
		tv[index].media_type = 'tv';
	});

	const results = [...movies, ...tv];
	results.sort((a, b) => a.popularity - b.popularity);

	return (
		<main className='flex justify-center items-start px-4 pt-32 pb-8 mx-auto md:px-0 md:pt-32 md:pb-16 bg-background h-full w-full text-white min-h-[100vh] gap-4'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4'>
				{results.map(
					(movie) =>
						movie.poster_path && (
							<Card key={movie.id} className='border-0'>
								<CardContent className='p-0 relative'>
									<div className='relative h-[300px] w-[200px] rounded-md'>
										<Image
											src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
											alt={movie.title}
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
								</CardContent>
							</Card>
						)
				)}
			</div>
		</main>
	);
};

export default Search;
