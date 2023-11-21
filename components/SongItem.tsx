"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import PlayButton from "./PlayButton";

import { ItemTypes, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadImage from "@/hooks/useLoadImage";

interface SongItemProps {
  song: Song;
  songs: Song[];
}

const SongItem: React.FC<SongItemProps> = ({ song, songs }) => {
  const imagePath = useUploadImage(song);
  const { sound, activeId, isPlaying, prevSongId, setPrevSongId } = usePlayer();
  const onPlay = useOnPlay(songs);

  const handlePlayCard = () => {
    if (prevSongId === song.id) {
      if (!isPlaying) {
        sound?.play();
      } else {
        sound?.pause();
      }
    } else {
      onPlay(song.id);
      setPrevSongId(song.id);
    }
  };

  const [, dragRef, dragPreview] = useDrag(() => ({
    type: ItemTypes.SONG,
    item: { data: song },
  }));

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      onClick={handlePlayCard}
      ref={dragRef}
      className={`
        group
        flex
        flex-col
        p-3
        gap-y-2
        bg-neutral-800/80
        hover:bg-neutral-700/50
        rounded-lg
        cursor-pointer
        shadow-[1px_1px_8px_1px_rgba(0,0,0,0)]
        hover:shadow-green-500/80
        hover:scale-[1.03]
        transition
        ${activeId === song.id && "shadow-green-500"}
      `}
    >
      {/* Image && PlayButton */}
      <div
        className="
          relative
        "
      >
        {/* Image */}
        <div
          className="
          relative
          aspect-square
          w-full
          h-full
          overflow-hidden
        "
        >
          <Image
            src={imagePath}
            alt={song.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Play Button */}
        <div
          className="
            absolute
            bottom-2
            right-2
          "
        >
          <PlayButton song={song} />
        </div>
      </div>

      {/* Song Title */}
      <div
        className="
          pt-2
        "
      >
        <p
          className="
            text-[14px]
            font-bold
            truncate
          "
        >
          {song.title}
        </p>
      </div>

      {/* Song Author */}
      <div>
        <p
          className="
            text-[13px]
            text-neutral-400
            truncate
          "
        >
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
