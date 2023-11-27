"use client";

import useSound from "use-sound";
import usePlayer from "./usePlayer";
import useSwitchSongs from "./useSwitchSongs";
import { useEffect, useRef } from "react";

const useSoundOperation = (songUrl: string) => {
  const { volume, playerStatus, setIsPlaying } = usePlayer();
  const { next, shuffle } = useSwitchSongs();
  const soundRef = useRef<Howl | null>();

  const handleEndOperation = () => {
    if (playerStatus.shuffle) {
      shuffle();
    } else if (playerStatus.aLoop) {
      next();
    }
  };

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
    loop: playerStatus.sLoop,
  });

  // 依sound與PlayerStatus情況改變歌曲結束後的執行情況
  useEffect(() => {
    // 當playerStatus改變(其實主要想監聽playerStatus.sLoop變化),依sLoop情況重新更新use-sound中的loop
    // 這裡指定soundRef為sound，這樣就可以隨時更改soundRef.current.loop(連帶的改變sound的loop)
    soundRef.current = sound;

    if (soundRef.current) {
      soundRef.current.loop(playerStatus.sLoop);
    }

    // 這裡是當playerStatus有變化時，在歌曲結束時，依handleEndOperation函式改變sound.end的執行
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
