"use client";

import { Song } from "@/types";
import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";

interface LikedContentProps {
  likedSongs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ likedSongs }) => {
  console.log(likedSongs);
  return (
    <div
      className="
        flex
        flex-col
        gap-y-2
        py-6  
        px-2
      "
    >
      {likedSongs.map((song) => (
        <div
          key={song.id}
          className={`
            flex
            flex-row
            w-full
            px-4
            gap-x-4
            items-center
            rounded-lg
            hover:bg-neutral-500/5
            cursor-pointer
          `}
        >
          {/* Songs Template */}
          <div className="flex-1">
            <MediaItem
              song={song}
              collapseRounded={false}
              hoverAnimated={false}
            />
          </div>

          {/* Liked Button */}
          <div className="flex">
            <LikeButton song={song} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
