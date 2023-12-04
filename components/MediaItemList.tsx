import { FaPlay } from "react-icons/fa";

import SoundWave from "./SoundWave";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";

interface MediaItemListProps {
  song: Song;
  songs: Song[];
  index: number;
  bgColor?: string;
}

const MediaItemList: React.FC<MediaItemListProps> = ({
  song,
  index,
  songs,
  bgColor,
}) => {
  const { activeId, isEnded, isPlaying } = usePlayer();
  const onPlay = useOnPlay(songs);

  return (
    <div
      key={song.id}
      className={`
        relative
        group
        flex
        flex-row
        w-full
        px-4
        gap-x-4
        items-center
        rounded-lg
        ${
          song.id === activeId && !isEnded
            ? `${bgColor}`
            : "hover:bg-neutral-500/5"
        }
        cursor-pointer
      `}
    >
      {/* Index || PlayButton || SoundWave*/}
      <div
        className={`
          flex
          w-[30px]
          h-full
          items-center
          justify-center
          overflow-hidden
          transition
        `}
      >
        {/* Index */}
        <div
          className={`
            flex
            transition
            ${
              song.id === activeId && !isEnded
                ? `
                    hidden
                  `
                : `
                  text-neutral-400
                    group-hover:hidden
                  `
            }
          `}
        >
          {index + 1}
        </div>

        {/* Play Button */}
        <div
          className={`
          text-green-500
            transition
            ${
              song.id !== activeId
                ? `
                    hidden
                    group-hover:flex
                    hover:scale-110
                  `
                : !isPlaying && !isEnded
                ? `flex`
                : `hidden`
            }
          `}
        >
          <FaPlay />
        </div>

        {/* SoundWave */}
        <div
          className={`
            absolute
            left-6
            ${song.id === activeId && isPlaying && !isEnded ? `flex` : `hidden`}
          `}
        >
          <SoundWave color="#00fd0a" eachWidth={2} interval={4} />
        </div>
      </div>

      {/* Song Template */}
      <div className="flex-1">
        <MediaItem
          song={song}
          onClick={(id: string) => onPlay(id)}
          collapseRounded={false}
          hoverAnimated={false}
        />
      </div>

      {/* Liked Button */}
      <div>
        <LikeButton song={song} />
      </div>
    </div>
  );
};

export default MediaItemList;
