"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";

interface SearchContentProps {
  songsByTitle: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songsByTitle }) => {
  return (
    <>
      {songsByTitle.length === 0 ? (
        <div
          className="
            p-6
            pt-10
            text-lg
            text-center
            font-semibold
            text-neutral-500
          "
        >
          <p className="mb-2">No songs found.</p>
        </div>
      ) : (
        <div
          className="
            flex
            p-6
            pt-0
            w-full
          "
        >
          <div
            className="
              flex
              flex-col
              w-full
              gap-y-2
            "
          >
            {songsByTitle.map((song) => (
              <div
                className="
                  flex
                  flex-row
                  items-center
                  justify-center
                  gap-x-3
                "
              >
                <div className="flex-1">
                  <MediaItem
                    key={song.id}
                    song={song}
                    collapseRounded={false}
                  />
                </div>
                <div>
                  <p>LIKED</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchContent;
