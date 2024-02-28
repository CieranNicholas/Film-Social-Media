"use client";

import { useState, useEffect } from "react";

import ModalSetFavMovie from "@/components/modal-set-fav-movie/modal-set-fav-movie";
import ModalSetFavTv from "@/components/modal-set-fav-tv/modal-set-fav-tv";

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
    </>
  );
};

export default ModalProvider;
