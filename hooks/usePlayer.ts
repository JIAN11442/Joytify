import { Song } from "@/types";
import { Howl } from "howler";
import { create } from "zustand";

interface usePlayerProps {
  activeId?: string;
  ids: string[];
  remainIds: string[];
  activeSong: Song | null;
  activeSongUrl: string;
  prevSongId: string;
  playerWidth: number;
  playerHeight: number;
  volume: number;
  isPlaying: boolean;
  playerStatus: { shuffle: boolean; aLoop: boolean; sLoop: boolean };
  sound: Howl | null;
  duration: number | null;

  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setRemainIds: (ids: string[]) => void;
  setActiveSong: (song: Song) => void;
  setActiveSongUrl: (url: string) => void;
  setPrevSongId: (id: string) => void;
  reset: () => void;
  setPlayerRef: (width: number, height: number) => void;
  setVolume: (value: number) => void;
  setIsPlaying: (status: boolean) => void;
  setPlayerStatus: (status: {
    sh_status?: boolean | undefined;
    alp_status?: boolean | undefined;
    slp_status?: boolean | undefined;
  }) => void;
  setSound: (value: Howl | null) => void;
  setDuration: (value: number | null) => void;
}

const usePlayer = create<usePlayerProps>((set) => ({
  activeId: undefined,
  ids: [],
  remainIds: [],
  activeSong: null,
  activeSongUrl: "",
  prevSongId: "",
  playerWidth: 0,
  playerHeight: 0,
  randomPlay: false,
  allLoopPlay: false,
  singleLoopPlay: false,
  volume: 0.5,
  isPlaying: false,
  playerStatus: { shuffle: false, aLoop: false, sLoop: false },
  sound: null,
  duration: null,

  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids, remainIds: [...ids] }),
  setRemainIds: (ids: string[]) => set({ remainIds: ids }),
  setActiveSong: (song: Song) => set({ activeSong: song }),
  setActiveSongUrl: (url: string) => set({ activeSongUrl: url }),
  setPrevSongId: (id: string) => set({ prevSongId: id }),
  reset: () => set({ activeId: undefined, ids: [] }),
  setPlayerRef: (width: number, height: number) =>
    set({ playerWidth: width, playerHeight: height }),
  setVolume: (value: number) => set({ volume: value }),
  setIsPlaying: (status: boolean) => set({ isPlaying: status }),
  setPlayerStatus: ({ sh_status, alp_status, slp_status }) =>
    set((prevStatus) => ({
      playerStatus: {
        shuffle:
          sh_status !== undefined ? sh_status : prevStatus.playerStatus.shuffle,
        aLoop:
          alp_status !== undefined ? alp_status : prevStatus.playerStatus.aLoop,
        sLoop:
          slp_status !== undefined ? slp_status : prevStatus.playerStatus.sLoop,
      },
    })),
  setSound: (value: Howl | null) => set({ sound: value }),
  setDuration: (value: number | null) => set({ duration: value }),
}));

export default usePlayer;
