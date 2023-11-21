"use client";

import { useEffect, useRef } from "react";

import PlayerContent from "./PlayerContent";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

const Player = () => {
  const player = usePlayer();
  const playerRef = useRef<HTMLDivElement>(null);
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  // get player div height to sidebar
  useEffect(() => {
    if (playerRef.current) {
      const { width, height } = playerRef.current?.getBoundingClientRect();
      player.setPlayerRef(width, height);
    }
  }, [player.activeId, playerRef.current]);

  // If activeId is not defined, the component will not be displayed
  if (!player.activeId || !song || !songUrl) {
    return null;
  }

  return (
    <div
      ref={playerRef}
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        px-4
        shadow-[1px_0px_15px_5px_black]
      "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
