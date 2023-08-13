import { create } from "zustand";

interface useUploadModalProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useUploadModal = create<useUploadModalProps>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useUploadModal;
