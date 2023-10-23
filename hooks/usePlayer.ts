import { create } from "zustand";

interface usePlayerProps {
  activeId?: string;
  ids: string[];
  playerWidth: number;
  playerHeight: number;
  setPlayerRef: (width: number, height: number) => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<usePlayerProps>((set) => ({
  activeId: undefined,
  ids: [],
  playerWidth: 0,
  playerHeight: 0,
  setPlayerRef: (width: number, height: number) =>
    set({ playerWidth: width, playerHeight: height }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ activeId: undefined, ids: [] }),
}));

export default usePlayer;
