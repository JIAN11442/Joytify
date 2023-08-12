import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { Song } from "@/types";
import useCollapse from "@/hooks/useCollapse";
import useUploadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
  song: Song;
  className?: string;
  collapseRounded: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({
  song,
  className,
  collapseRounded,
}) => {
  const imagePath = useUploadImage(song);
  const { isCollapse, setIsCollapse } = useCollapse();

  return (
    <div>
      {parseInt(song.id) !== 0 && (
        <>
          {collapseRounded ? (
            <div
              className={twMerge(
                `
                p-1
                flex
                flex-row
                hover:bg-neutral-800/50
                rounded-md
                transition
                gap-x-3
                items-center
                cursor-pointer
                ${isCollapse ? "justify-center" : ""}
              `,
                className
              )}
            >
              {/* IMAGE */}
              <div
                className={`
                  relative
                  min-w-[50px]
                  min-h-[50px]
                  overflow-hidden
                  ${isCollapse ? "rounded-full" : "rounded-md"}
                `}
              >
                <Image
                  src={imagePath}
                  alt={song.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* LABEL */}
              <div
                className={`
                ${isCollapse ? "hidden" : "flex flex-col"}
                  w-full
                  overflow-hidden
                  gap-y-1
                `}
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-neutral-300
                    truncate
              "
                >
                  {song.title}
                </p>
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
          ) : (
            <div
              className={twMerge(
                `
                p-1
                flex
                flex-row
                hover:bg-neutral-800/50
                rounded-md
                transition
                gap-x-3
                items-center
                cursor-pointer
              `,
                className
              )}
            >
              {/* IMAGE */}
              <div
                className="
                  relative
                  min-w-[50px]
                  min-h-[50px]
                  overflow-hidden
                  rounded-md
            "
              >
                <Image
                  src={imagePath}
                  alt={song.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* LABEL */}
              <div
                className="
                  flex
                  flex-col
                  w-full
                  overflow-hidden
                  gap-y-1
                "
              >
                <p
                  className="
                    text-sm
                    font-semibold
                    text-neutral-300
                    truncate
                  "
                >
                  {song.title}
                </p>
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
          )}
        </>
      )}
    </div>
  );
};

export default MediaItem;
