import { use } from "react";
import { create } from "zustand";

interface CommandModalSetFavTvStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModalSetFavTv = create<CommandModalSetFavTvStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));

export default useModalSetFavTv;
