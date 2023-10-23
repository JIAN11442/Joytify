"use client";

import { useEffect, useRef, useState } from "react";

import usePlayer from "@/hooks/usePlayer";
import { useSpring, animated } from "react-spring";

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
        bg-black
        w-full
        h-fit
        py-2
        px-4
      "
    >
      <p>{player.activeId}</p>
      <p>thank</p>
      <p>{player.ids}</p>
      <p>{player.ids}</p>
    </div>
  );
};

export default Player;
