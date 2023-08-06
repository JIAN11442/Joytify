import Image from "next/image";

import { Song } from "@/types";
import useCollapse from "@/hooks/useCollapse";
import useUploadImage from "@/hooks/useLoadImage";

interface MediaItemProps {
  song: Song;
}

const MediaItem: React.FC<MediaItemProps> = ({ song }) => {
  const imagePath = useUploadImage(song);
  const { isCollapse, setIsCollapse } = useCollapse();

  return (
    <div>
      {parseInt(song.id) !== 0 ? (
        <div
          className={`
            flex
            items-center
            justify-center
            gap-x-3
            cursor-pointer
            ${isCollapse ? "" : " hover:bg-neutral-800/50 transition"}
            w-full
            rounded-md
            p-1
          `}
        >
          <div
            className={`
                relative
                min-h-[48px]
                min-w-[48px]
                overflow-hidden
            ${
              isCollapse
                ? "rounded-full hover:drop-shadow-[2px_0_5px_rgba(255,255,255,0.5)] transition"
                : "rounded-md"
            }
            `}
          >
            <Image
              src={imagePath}
              alt={song.title}
              fill
              className="object-cover"
            />
          </div>
          {/* Label */}
          {!isCollapse && (
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
                  truncate
                  text-sm
                  font-semibold
                  text-neutral-300
            "
              >
                {song.title}
              </p>
              <p
                className="
                  text-neutral-400
                  text-[13px]
                  truncate
            "
              >
                {song.author}
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {!isCollapse && (
            <div className="p-3">
              <p
                className="
                text-neutral-600   
            "
              >
                {song.title}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MediaItem;
