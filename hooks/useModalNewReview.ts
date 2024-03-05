import { create } from "zustand";

interface CommandModalNewReviewStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useModalNewReview = create<CommandModalNewReviewStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalNewReview;
