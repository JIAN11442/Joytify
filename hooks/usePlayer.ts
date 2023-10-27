import { create } from "zustand";

interface usePlayerProps {
  activeId?: string;
  ids: string[];
  playerWidth: number;
  playerHeight: number;
  randomPlay: boolean;
  allLoopPlay: boolean;
  singleLoopPlay: boolean;
  volume: number;

  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setRandomPlay: (status: boolean) => void;
  setAllLoopPlay: (status: boolean) => void;
  setSingleLoopPlay: (status: boolean) => void;
  setPlayerRef: (width: number, height: number) => void;
  setVolume: (value: number) => void;
}

const usePlayer = create<usePlayerProps>((set) => ({
  activeId: undefined,
  ids: [],
  playerWidth: 0,
  playerHeight: 0,
  randomPlay: false,
  allLoopPlay: false,
  singleLoopPlay: false,
  volume: 1,

  setPlayerRef: (width: number, height: number) =>
    set({ playerWidth: width, playerHeight: height }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ activeId: undefined, ids: [] }),
  setRandomPlay: (status: boolean) => set({ randomPlay: status }),
  setAllLoopPlay: (status: boolean) => set({ allLoopPlay: status }),
  setSingleLoopPlay: (status: boolean) => set({ singleLoopPlay: status }),
  setVolume: (value: number) => set({ volume: value }),
}));

export default usePlayer;
