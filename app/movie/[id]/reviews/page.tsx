import MediaReviewItem from "@/components/media-review-item/media-review-item";
import MediaReviewList from "@/components/media-review-list/media-review-list";
import { getReviewsByMediaId } from "@/lib/server-actions";
import { ReviewDataType } from "@/lib/types";

interface MovieReviewsProps {
  params: {
    id: string;
  };
}

const MovieReviews: React.FC<MovieReviewsProps> = async ({ params }) => {
  const { id } = params;

  const res = await getReviewsByMediaId(Number(id));

  const reviews: ReviewDataType[] = res.data;

  console.log(id);
  return (
    <main className='flex flex-col justify-start items-center h-[100vh] w-full text-white'>
      <section className='flex flex-col items-start justify-center w-full h-full bg-background gap-4 py-8'>
        <section className='w-full md:w-4/5 mx-auto xl:w-2/3 flex flex-col gap-4'>
          <div className='flex flex-col gap-4 items-start'>
            {reviews.map((review, index) => (
              <MediaReviewItem
                review={review}
                key={review.id}
                index={index}
                listLength={reviews.length}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MovieReviews;
