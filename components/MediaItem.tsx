import useUploadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  song: Song;
  isCollapse: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ song, isCollapse }) => {
  const imagePath = useUploadImage(song);

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
                min-h-[45px]
                min-w-[45px]
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
              font-medium
              text-white
            "
              >
                {song.title}
              </p>
              <p
                className="
                text-neutral-400
                text-sm
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
