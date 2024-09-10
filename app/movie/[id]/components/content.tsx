import { Movie } from '@/types';
import CastCarousel from '@/components/cast-carousel/cast-carousel';
import CountryProvidersList from '@/components/country-providers-list/country-providers-list';
import MediaReviewList from '@/components/media-review-list/media-review-list';
import { ReviewDataType } from '@/lib/types';
import { getAvarageReviewRating } from '@/lib/server-actions';

interface ContentProps {
	movie: Movie;
	credits: any;
	providers: any;
	reviews: ReviewDataType[];
}

const Content: React.FC<ContentProps> = ({ movie, credits, providers, reviews }) => {
	const { results } = providers;

	return (
		<section className='flex flex-col items-start justify-center w-full h-full bg-background relative gap-4 py-8'>
			<CastCarousel cast={credits.cast.splice(0, 20)} />
			<MediaReviewList reviews={reviews} mediaId={movie.id} mediaType='MOVIE' />
			{results.length > 0 && <CountryProvidersList providers={results} />}
		</section>
	);
};

export default Content;
