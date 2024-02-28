"use client";

import useModalSetFavTv from "@/hooks/useModalSetFavTv";
import Modal from "../modal/modal";
import { SearchForTv } from "@/lib/tmbd";
import CommandSearch from "@/components/command-search/command-search";
import {
  AddFavouriteTv,
  deleteFavouriteTv,
  getFavouriteTv,
} from "@/lib/server-actions";
import { useState } from "react";

export interface FavFilm {
  mediaId: number;
  mediaTitle: string;
  id: string;
  userId: string;
  posterPath: string;
}

const ModalSetFavTv = () => {
  const { onClose, isOpen } = useModalSetFavTv();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const [favouriteTv, setFavouriteTv] = useState<FavFilm[]>([]);

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <CommandSearch
        searchFunction={SearchForTv}
        getFunction={getFavouriteTv}
        addFunction={AddFavouriteTv}
        deleteFunction={deleteFavouriteTv}
        favouriteItems={favouriteTv}
        setFavouriteItems={setFavouriteTv}
      />
    </Modal>
  );
};

export default ModalSetFavTv;
