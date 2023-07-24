"use client";

import useUploadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
}

const SongItem: React.FC<SongItemProps> = ({ data }) => {
  const imagePath = useUploadImage(data);

  console.log(imagePath);

  return (
    <div
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
          text-sm
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
