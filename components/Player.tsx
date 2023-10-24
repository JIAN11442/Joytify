"use client";

import { useEffect, useRef } from "react";

import usePlayer from "@/hooks/usePlayer";

const Player = () => {
  const player = usePlayer();
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    player.reset();
  }, []);

  // get player div height to sidebar
  useEffect(() => {
    if (playerRef.current) {
      const { width, height } = playerRef.current?.getBoundingClientRect();
      player.setPlayerRef(width, height);
    }
  }, [player.activeId, playerRef.current]);

  // If activeId is not defined, the component will not be displayed
  if (!player.activeId) {
    return null;
  }

  return (
    <div
      ref={playerRef}
      className="
        fixed
        bottom-0
        bg-red-100
        w-full
        h-fit
        py-2
        px-4
      "
    >
      <p>{player.activeId}</p>
    </div>
  );
};

export default Player;
