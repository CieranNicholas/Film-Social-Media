"use client";

import useModalSetFavMovie from "@/hooks/useModalSetFavMovie";
import Modal from "../modal/modal";
import { SearchForMovie } from "@/lib/tmbd";
import CommandSearch from "@/components/command-search/command-search";
import {
  AddFavouriteFilm,
  GetFavouriteFilms,
  deleteFavouriteFilm,
} from "@/lib/server-actions";
import { useState } from "react";

export interface FavFilm {
  mediaId: number;
  mediaTitle: string;
  id: string;
  userId: string;
  posterPath: string;
}

const ModalSetFavMovie = () => {
  const { onClose, isOpen } = useModalSetFavMovie();
  const onChange = async (open: boolean) => {
    if (!open) {
      await saveOnClose();
      onClose();
    }
  };

  const [favouriteFilms, setFavouriteFilms] = useState<FavFilm[]>([]);

  const saveOnClose = async () => {};

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <CommandSearch
        searchFunction={SearchForMovie}
        getFunction={GetFavouriteFilms}
        addFunction={AddFavouriteFilm}
        deleteFunction={deleteFavouriteFilm}
        favouriteItems={favouriteFilms}
        setFavouriteItems={setFavouriteFilms}
        mediaType='MOVIE'
      />
    </Modal>
  );
};

export default ModalSetFavMovie;
