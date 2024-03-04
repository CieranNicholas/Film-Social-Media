import { create } from "zustand";

interface ModalVideoStore {
  isOpen: boolean;
  onOpen: (key: string) => void;
  onClose: () => void;
  videoKey?: string;
}

const useModalVideo = create<ModalVideoStore>((set) => ({
  isOpen: false,
  onOpen: (key: string) => set({ isOpen: true, videoKey: key }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalVideo;
