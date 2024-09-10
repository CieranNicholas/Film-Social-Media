import Card from './components/Card';
import { SearchForMovie, SearchForTv } from '@/lib/tmbd';

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
	results.sort((a, b) => b.popularity - a.popularity);

	return (
		<main className='flex justify-center items-start px-4 pt-32 pb-8 mx-auto md:px-0 md:pt-32 md:pb-16 bg-background h-full w-full text-white min-h-[100vh] gap-4'>
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 justify-center items-center'>
				{results.map((movie) => movie.poster_path && <Card key={movie.id} movie={movie} />)}
			</div>
		</main>
	);
};

export default Search;
