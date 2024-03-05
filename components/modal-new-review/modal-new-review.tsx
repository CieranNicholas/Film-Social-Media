"use client";

import useModalNewReview from "@/hooks/useModalNewReview";
import Modal from "../modal/modal";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Movie } from "@/types";
import { SearchForMovie, SearchForTv } from "@/lib/tmbd";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { MdStar, MdStarOutline } from "react-icons/md";
import { createReview } from "@/lib/server-actions";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

function truncateText(text: string, maxWords: number) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}

const ModalNewReview = () => {
  const { data: session } = useSession();
  const { isOpen, onClose } = useModalNewReview();
  const onChange = async (open: boolean) => {
    if (!open) onClose();
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [movieResult, setMovieResult] = useState<Movie[]>([]);
  const [tvResult, setTvResult] = useState<Movie[]>([]);

  const [selectedItem, setSelectedItem] = useState<Movie | null>(null);
  const [selectedType, setSelectedType] = useState<"MOVIE" | "TV">("MOVIE");

  const [rating, setRating] = useState<number>(1);
  const [reviewContent, setReviewContent] = useState<string>("");

  useEffect(() => {
    const query = debouncedValue;
    (async () => {
      const movieResult = await SearchForMovie(query);
      const tvResult = await SearchForTv(query);
      if (movieResult) setMovieResult(movieResult);
      if (tvResult) setTvResult(tvResult);
    })();
  }, [debouncedValue]);

  const selectItem = (item: Movie, type: "MOVIE" | "TV") => {
    setSelectedItem(item);
    setSelectedType(type);
    setSearchValue("");
  };

  const submitReview = async () => {
    if (!selectedItem) return;
    if (!session) return;
    const id = selectedItem.id;
    const posterPath = selectedItem.poster_path;
    const title =
      selectedItem.title ||
      selectedItem.original_title ||
      selectedItem.original_name;
    const releaseDate =
      selectedItem.release_date || selectedItem.first_air_date;
    const res = await createReview(
      session.user.id,
      id,
      posterPath,
      title,
      reviewContent,
      rating,
      selectedType,
      releaseDate
    );
    if (!res.success) {
      onClose();
      toast.error(res.message);
      return;
    }

    onClose();
    toast.success("Review posted");
  };

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <div className='bg-background p-4 flex flex-col items-start gap-4 w-[50w] max-h-[75vh] overflow-y-auto'>
        <h1>New Review</h1>

        {!selectedItem && (
          <input
            type='text'
            placeholder='Search for a movie or tv show...'
            className='w-full px-6 py-4 placeholder-gray-300 text-gray-100 bg-card rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-50 sm:text-sm sm:leading-5'
            onChange={(e) => setSearchValue(e.target.value)}
          />
        )}
        <AnimatePresence>
          {movieResult.length > 0 && !selectedItem && (
            <motion.div
              className='flex flex-col gap-4 bg-card text-white p-4 rounded-lg shadow-lg w-full'
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: "100rem" }}
              exit={{ opacity: 0, maxHeight: 0 }}
            >
              <p className='text-bold'>Movies</p>
              <>
                {movieResult.map((movie) => (
                  <div
                    key={movie.id}
                    className='flex justify-between items-center border-b border-neutral-700 cursor-pointer group transition-all hover:border-primary'
                  >
                    <div
                      className='flex flex-col items-start justify-center w-[90%]'
                      onClick={() => selectItem(movie, "MOVIE")}
                    >
                      <p className='font-semibold group-hover:text-primary transition-all'>
                        {movie.title ||
                          movie.original_title ||
                          movie.original_name}
                      </p>
                      <p className='text-sm text-neutral-500 pb-2 group-hover:text-primary transition-all'>
                        {movie.release_date || movie.first_air_date}
                      </p>
                    </div>
                    <Button asChild className='w-[10%]'>
                      <Link href={`/movie/${movie.id}`} target='_blank'>
                        Info
                      </Link>
                    </Button>
                  </div>
                ))}
              </>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {tvResult.length > 0 && !selectedItem && (
            <motion.div
              className='flex flex-col gap-4 bg-card text-white p-4 rounded-lg shadow-lg w-full'
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: "100rem" }}
              exit={{ opacity: 0, maxHeight: 0 }}
            >
              <p className='text-bold'>TV</p>
              <>
                {tvResult.map((tv) => (
                  <div
                    key={tv.id}
                    className='flex justify-between items-center border-b border-neutral-700 cursor-pointer group transition-all hover:border-primary'
                  >
                    <div
                      className='flex flex-col items-start justify-center w-[90%]'
                      onClick={() => selectItem(tv, "TV")}
                    >
                      <p className='font-semibold group-hover:text-primary transition-all'>
                        {tv.title || tv.original_title || tv.original_name}
                      </p>
                      <p className='text-sm text-neutral-500 pb-2 group-hover:text-primary transition-all'>
                        {tv.release_date || tv.first_air_date}
                      </p>
                    </div>
                    <Button asChild className='w-[10%]'>
                      <Link href={`/tv/${tv.id}`} target='_blank'>
                        Info
                      </Link>
                    </Button>
                  </div>
                ))}
              </>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className='flex items-start justify-start w-full rounded-lg p-4 bg-card gap-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <img
                src={`http://image.tmdb.org/t/p/w92${selectedItem.poster_path}`}
                className='rounded-lg'
              />
              <div className='flex flex-col items-start justify-center'>
                <p className='font-semibold'>
                  {selectedItem.title ||
                    selectedItem.original_title ||
                    selectedItem.original_name}
                </p>
                <p className='text-sm text-neutral-500'>
                  {selectedItem.release_date || selectedItem.first_air_date}
                </p>
                <p className='text-sm'>
                  {truncateText(selectedItem.overview, 50)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedItem && (
            <>
              <div className='w-1/2 flex flex-col gap-4'>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <Textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <Button onClick={submitReview}>Post</Button>
            </>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(
        <MdStar
          className='text-2xl text-yellow-500 cursor-pointer transition-all hover:text-yellow-300'
          key={i}
          onClick={() => onChange(i)}
        />
      );
    } else {
      stars.push(
        <MdStarOutline
          key={i}
          className='text-2xl text-yellow-500 cursor-pointer transition-all hover:text-yellow-300'
          onClick={() => onChange(i)}
        />
      );
    }
  }

  return (
    <div className='flex w-full items-center justify-start gap-4'>{stars}</div>
  );
}
export default ModalNewReview;
