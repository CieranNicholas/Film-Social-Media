import { create } from "zustand";

interface CommandModalNewReviewStore {
  isOpen: boolean;
  onOpen: (mediaId?: number, mediaType?: "MOVIE" | "TV") => void;
  onClose: () => void;
  mediaId: number | undefined;
  mediaType?: "MOVIE" | "TV";
}

const useModalNewReview = create<CommandModalNewReviewStore>((set) => ({
  isOpen: false,
  onOpen: (mediaId, mediaType) => {
    if (mediaId) set({ mediaId: mediaId });
    if (mediaType) set({ mediaType: mediaType });
    set({ isOpen: true });
  },
  onClose: () => {
    set({ mediaId: undefined });
    set({ isOpen: false });
    set({ mediaType: "MOVIE" });
    console.log("ON Close Should Reset");
  },
  mediaId: undefined,
  mediaType: "MOVIE",
}));

export default useModalNewReview;
