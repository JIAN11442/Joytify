"use client";

import MediaItemList from "@/components/MediaItemList";

import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  return (
    <div>
      {/* Songs List */}
      <div>
        {songs.length === 0 ? (
          // No songs found
          <div
            className={`
                flex
                py-10
                items-center
                justify-center
                ${songs.length === 0 ? "flex" : "hidden"}
            `}
          >
            <p
              className="
                text-lg
                font-semibold
                text-neutral-500
            "
            >
              No songs found.
            </p>
          </div>
        ) : (
          // Songs found
          <div>
            {songs.map((song, index) => (
              <MediaItemList
                song={song}
                index={index}
                songs={songs}
                bgColor="bg-gradient-animated-blue"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
