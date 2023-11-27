"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  song?: Song;
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ song, className }) => {
  const { activeId, isPlaying } = usePlayer();
  const Icon = song?.id === activeId && isPlaying ? BsPauseFill : BsPlayFill;

  return (
    <button
      className={twMerge(
        `
        p-3
        bg-green-500
        rounded-full
        drop-shadow-lg
        hover:scale-110
        transition
        translate-y-1/4
        group-hover:translate-y-0
        group-hover:opacity-100
        opacity-0
      `,
        className
      )}
    >
      <Icon color="black" size={30} />
    </button>
  );
};

export default PlayButton;
