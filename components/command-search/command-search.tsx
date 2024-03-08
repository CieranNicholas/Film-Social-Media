"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import { Movie } from "@/types";
import { useSession } from "next-auth/react";
import { dbPromise } from "@/lib/server-actions";
import { FavFilm } from "../modal-set-fav-movie/modal-set-fav-movie";
import { HashLoader } from "react-spinners";
import { Button } from "../ui/button";
import Link from "next/link";

interface CommandSearchProps {
  searchFunction: (query: string) => Promise<Movie[]>;
  getFunction: (userId: string) => Promise<dbPromise>;
  addFunction: (
    uid: string,
    title: string,
    id: number,
    posterPath: string
  ) => Promise<any>;
  deleteFunction: (uid: string, dbId: string) => Promise<dbPromise>;
  favouriteItems: FavFilm[];
  setFavouriteItems: React.Dispatch<React.SetStateAction<FavFilm[]>>;
  mediaType: "MOVIE" | "TV";
}

const CommandSearch: React.FC<CommandSearchProps> = ({
  searchFunction,
  getFunction,
  addFunction,
  deleteFunction,
  favouriteItems,
  setFavouriteItems,
  mediaType,
}) => {
  const { data } = useSession();

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Movie[]>([]);
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!data) return;
      const favItems = await getFunction(data?.user.id);
      if (favItems.data.length > 0) {
        setFavouriteItems(favItems.data);
      }
    })();
  }, []);

  useEffect(() => {
    const query = debouncedValue;
    (async () => {
      const searchResult = await searchFunction(query);
      if (searchResult) {
        console.log(searchResult);
        setSearchResult(searchResult);
      }
    })();
  }, [debouncedValue]);

  const addItem = async (item: FavFilm) => {
    if (favouriteItems.find((f) => f.mediaId === item.mediaId)) return;
    if (favouriteItems.length >= 5) return;

    if (!data) return console.error("No user data");
    setIsAddingItem(true);
    const res = await addFunction(
      data.user.id,
      item.mediaTitle,
      item.mediaId,
      item.posterPath
    );
    setIsAddingItem(false);
    if (!res) return console.error("Failed to add favourite item");
    setFavouriteItems((prev) => [
      ...prev,
      {
        mediaId: item.mediaId,
        mediaTitle: item.mediaTitle,
        id: res.data.id,
        userId: data.user.id,
        posterPath: item.posterPath,
      },
    ]);
  };

  const removeItem = async (id: number) => {
    const item = favouriteItems.find((f) => f.mediaId === id);
    if (!item || !item.id) return console.error("No item data");
    if (!data) return console.error("No user data");
    const deleted = await deleteFunction(data.user.id, item.id);
    if (!deleted.success)
      return console.error("Failed to delete favourite item");

    setFavouriteItems((prev) => prev.filter((f) => f.mediaId !== id));
  };

  return (
    <div className='bg-neutral-800 flex flex-col p-4 gap-4 rounded-md'>
      <input
        type='text'
        placeholder='Search for a item...'
        className='w-full px-6 py-4 placeholder-gray-300 text-gray-100 bg-neutral-700 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-50 sm:text-sm sm:leading-5'
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <AnimatePresence>
        {searchResult.length > 0 && (
          <motion.div
            className='flex flex-col gap-4 bg-neutral-800 text-white p-4 rounded-lg shadow-lg'
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: "100rem" }}
            exit={{ opacity: 0, maxHeight: 0 }}
            style={
              isAddingItem
                ? { pointerEvents: "none" }
                : { pointerEvents: "all" }
            }
          >
            {isAddingItem ? (
              <div className='flex items-center justify-center'>
                <HashLoader color='#36d7b7' size={50} />
              </div>
            ) : (
              <>
                {searchResult.map((res) => (
                  <div
                    key={res.id}
                    className='flex justify-between items-center border-b border-neutral-700 cursor-pointer group transition-all hover:border-primary'
                  >
                    <div
                      className='flex flex-col items-start justify-center w-[90%]'
                      onClick={() =>
                        addItem({
                          mediaId: res.id,
                          mediaTitle:
                            res.title ||
                            res.original_title ||
                            res.original_name,
                          id: "",
                          userId: "",
                          posterPath: res.poster_path,
                        })
                      }
                    >
                      <p className='font-semibold group-hover:text-primary transition-all'>
                        {res.title || res.original_title || res.original_name}
                      </p>
                      <p className='text-sm text-neutral-500 pb-2 group-hover:text-primary transition-all'>
                        {res.release_date || res.first_air_date}
                      </p>
                    </div>
                    <Button asChild className='w-[10%]'>
                      <Link
                        href={
                          mediaType === "MOVIE"
                            ? `/movie/${res.id}`
                            : `/tv/${res.id}`
                        }
                        target='_blank'
                      >
                        Info
                      </Link>
                    </Button>
                  </div>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {favouriteItems.length > 0 && (
        <div className='flex flex-wrap justify-start gap-4 text-white'>
          {favouriteItems.map((item: any) => (
            <div
              key={item.mediaId}
              className='px-4 py-2  bg-primary rounded-full flex justify-start items-center select-none cursor-pointer gap-2 max-w-full'
            >
              <p className='truncate'>{item.mediaTitle || item.mediaTitle}</p>
              <div
                className='flex items-center justify-center p-2 bg-white rounded-full text-black ml-auto group transition-all'
                onClick={() => removeItem(item.mediaId || item.mediaId)}
              >
                <MdClose className='group-hover:scale-110 transition-all duration-100' />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommandSearch;
