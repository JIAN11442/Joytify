"use client";

import useSound from "use-sound";
import usePlayer from "./usePlayer";
import useSwitchSongs from "./useSwitchSongs";
import { useEffect, useState } from "react";

const useSoundOperation = (songUrl: string) => {
  const { volume, playerStatus, setIsPlaying } = usePlayer();
  const { next, previous, cycle, shuffle } = useSwitchSongs();
  // const [switched, setSwitched] = useState(false);

  const handleEndOperation = () => {
    if (playerStatus.shuffle) {
      shuffle();
    } else if (playerStatus.aLoop) {
      next();
    }
  };

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      console.log(playerStatus);
      setIsPlaying(false);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.on("end", handleEndOperation);

    return () => {
      sound?.off("end", handleEndOperation);
    };
  }, [sound, playerStatus]);

  return {
    play,
    pause,
    sound,
    duration,
  };
};

export default useSoundOperation;
