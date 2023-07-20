import { ViewType } from "@/types";
import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  viewType: ViewType;
  modalDescription: string | null;
  onOpen: () => void;
  onClose: () => void;
  signUp: () => void;
  logIn: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  viewType: "sign_in",
  modalDescription: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  signUp: () =>
    set({ viewType: "sign_up", modalDescription: "Sign Up your new account" }),
  logIn: () =>
    set({ viewType: "sign_in", modalDescription: "Login to your account" }),
}));

export default useAuthModal;
