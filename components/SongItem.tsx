"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import PlayButton from "./PlayButton";
import { ItemTypes, Song } from "@/types";
import useUploadImage from "@/hooks/useLoadImage";

interface SongItemProps {
  data: Song;
}

const SongItem: React.FC<SongItemProps> = ({ data }) => {
  const imagePath = useUploadImage(data);

  const [, dragRef, dragPreview] = useDrag(() => ({
    type: ItemTypes.SONG,
    item: { data: data },
  }));

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={dragRef}
      className="
        relative
        group
        p-3
        pb-0
        flex
        flex-col
        bg-neutral-400/5
        hover:bg-neutral-400/10
        rounded-md
        items-center
        justify-center
        overflow-hidden
        cursor-pointer
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
        <Image src={imagePath} alt={data.title} fill className="object-cover" />
      </div>
      {/* title && author */}
      <div
        className="
            flex
            flex-col
            items-start
            w-full
            pt-4
            gap-y-1
            "
      >
        <p
          className="
          w-full
          truncate
          text-[15px]
          font-semibold
        "
        >
          {data.title}
        </p>
        <p
          className="
            text-[13px]
            text-neutral-400
            pb-4
            w-full
            truncate
        "
        >
          {data.author}
        </p>
      </div>
      <div
        className="
            absolute
            right-5
            bottom-24
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
