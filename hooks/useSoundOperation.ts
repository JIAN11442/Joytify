"use client";

import useSound from "use-sound";
import usePlayer from "./usePlayer";
import useSwitchSongs from "./useSwitchSongs";

const useSoundOperation = (songUrl: string) => {
  const { volume, setIsPlaying } = usePlayer();
  const { next, previous } = useSwitchSongs();

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      next();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  return {
    play,
    pause,
    sound,
    duration,
  };
};

export default useSoundOperation;
