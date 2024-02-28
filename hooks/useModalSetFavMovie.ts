import { use } from "react";
import { create } from "zustand";

interface CommandModalSetFavMovieStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModalSetFavMovie = create<CommandModalSetFavMovieStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalSetFavMovie;
