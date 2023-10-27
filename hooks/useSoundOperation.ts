"use client";

import useSound from "use-sound";
import usePlayer from "./usePlayer";
import useSwitchSongs from "./useSwitchSongs";

const useSoundOperation = (songUrl: string) => {
  const { volume, setIsPlaying } = usePlayer();
  const switchSongs = useSwitchSongs();

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      switchSongs.onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  return {
    play,
    pause,
    sound,
  };
};

export default useSoundOperation;
