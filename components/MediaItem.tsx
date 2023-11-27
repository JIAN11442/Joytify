"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { Song } from "@/types";
import useCollapse from "@/hooks/useCollapse";
import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  song: Song;
  onClick?: (id: string) => void;
  collapseRounded?: boolean;
  hoverAnimated?: boolean;
  className?: string;
}

const MediaItem: React.FC<MediaItemProps> = ({
  song,
  onClick,
  collapseRounded,
  hoverAnimated,
  className,
}) => {
  const imagePath = useLoadImage(song);
  const { isCollapse } = useCollapse();
  const { setId } = usePlayer();

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    return setId(song.id);
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `
        flex
        flex-row
        gap-x-3
        items-center
        p-1
        border-b
        border-transparent
        bg-transparent
        cursor-pointer
        transition
        ${
          isCollapse
            ? `
                rounded-full
                ${
                  hoverAnimated
                    ? `hover:shadow-green-500
                        shadow-[1px_1px_10px_2px_rgba(0,0,0,0)]
                        hover:scale-[1.02]`
                    : ``
                }
              `
            : `
                ${
                  hoverAnimated
                    ? `hover:bg-neutral-800/60
                      hover:border-[rgba(34,197,94,0.8)]
                        hover:scale-[1.02]`
                    : ``
                }
                rounded-lg
              `
        }
      `,
        className
      )}
    >
      {/* Image */}
      <div
        className={`
          relative
          min-w-[50px]
          min-h-[50px]
          overflow-hidden
          ${isCollapse && collapseRounded ? "rounded-full" : "rounded-lg"}
        `}
      >
        <Image src={imagePath} alt={song.title} fill className="object-cover" />
      </div>

      {/* Song Title && Song Author */}
      <div
        className={`
          flex
          flex-col
          w-full
          gap-y-1
          ${isCollapse && collapseRounded ? "hidden" : ""}
        `}
      >
        {/* song title */}
        <div className="w-full">
          <p
            className="
            text-[14px]
            text-neutral-300
            font-semibold
            truncate
          "
          >
            {song.title}
          </p>
        </div>

        {/* song author */}
        <div className="w-full">
          <p
            className="
              text-[13px]
              font-semibold
              text-neutral-500
              truncate
            "
          >
            {song.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
