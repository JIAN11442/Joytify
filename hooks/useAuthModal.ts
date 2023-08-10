import { ViewType } from "@/types";
import { create } from "zustand";

interface useAuthModalProps {
  isOpen: boolean;
  viewType: ViewType;
  description: string;
  onOpen: () => void;
  onClose: () => void;
  signUp: () => void;
  logIn: () => void;
  signUpDescription: () => void;
  logInDescription: () => void;
}

const useAuthModal = create<useAuthModalProps>((set) => ({
  isOpen: false,
  viewType: "sign_in",
  description: "Login to your account",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  signUp: () => set({ viewType: "sign_up" }),
  logIn: () => set({ viewType: "sign_in" }),
  signUpDescription: () => set({ description: "sign up a new account" }),
  logInDescription: () => set({ description: "login to your account" }),
}));

export default useAuthModal;
