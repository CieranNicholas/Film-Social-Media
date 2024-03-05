"use client";

import { useState, useEffect } from "react";

import ModalSetFavMovie from "@/components/modal-set-fav-movie/modal-set-fav-movie";
import ModalSetFavTv from "@/components/modal-set-fav-tv/modal-set-fav-tv";
import ModalVideo from "@/components/modal-video/modal-video";
import ModalNewReview from "@/components/modal-new-review/modal-new-review";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ModalSetFavMovie />
      <ModalSetFavTv />
      <ModalVideo />
      <ModalNewReview />
    </>
  );
};

export default ModalProvider;
