import { create } from "zustand";
import { ViewType } from "@/types";

interface useAuthModalProps {
  isOpen: boolean;
  viewType: ViewType;
  description: string;
  open: () => void;
  close: () => void;
  signIn: () => void;
  signUp: () => void;
}

const useAuthModal = create<useAuthModalProps>((set) => ({
  isOpen: false,
  viewType: "sign_in",
  description: "login to your account",
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  signIn: () =>
    set({ viewType: "sign_in", description: "login to your account" }),
  signUp: () =>
    set({ viewType: "sign_up", description: "create a new account" }),
}));

export default useAuthModal;
