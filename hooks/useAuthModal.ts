import { ViewType } from "@/types";
import { create } from "zustand";

interface useAuthModalProps {
  isOpen: boolean;
  viewType: ViewType;
  onOpen: () => void;
  onClose: () => void;
  SignUp: () => void;
  LogIn: () => void;
}

const useAuthModal = create<useAuthModalProps>((set) => ({
  isOpen: false,
  viewType: "sign_in",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  SignUp: () => set({ viewType: "sign_up" }),
  LogIn: () => set({ viewType: "sign_in" }),
}));

export default useAuthModal;
