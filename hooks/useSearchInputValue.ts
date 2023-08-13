import { create } from "zustand";

interface useSearchInputProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
}

const useSearchInputValue = create<useSearchInputProps>((set) => ({
  searchInputValue: "",
  setSearchInputValue: (value: string) => set({ searchInputValue: value }),
}));

export default useSearchInputValue;
