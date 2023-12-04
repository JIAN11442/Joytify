"use client";

import { Song } from "@/types";
import MediaItemList from "@/components/MediaItemList";

interface LikedContentProps {
  likedSongs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ likedSongs }) => {
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
      {likedSongs.map((song, index) => (
        <MediaItemList
          song={song}
          index={index}
          songs={likedSongs}
          bgColor="bg-gradient-animated-indigo"
        />
      ))}
    </div>
  );
};

export default LikedContent;
