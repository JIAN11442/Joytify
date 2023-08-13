import { FaPlay } from "react-icons/fa";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";

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
              <div
                key={song.id}
                className={`
                    group
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
                {/* Index || PlayButton */}
                <div
                  className={`
                    flex
                    w-[25px]
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
                        text-neutral-400
                        group-hover:hidden
                    `}
                  >
                    {index + 1}
                  </div>

                  {/* Play Button */}
                  <div
                    className={`
                        hidden
                        group-hover:flex
                        hover:scale-110
                    `}
                  >
                    <FaPlay />
                  </div>
                </div>

                {/* Song Template */}
                <div className="flex-1">
                  <MediaItem
                    song={song}
                    collapseRounded={false}
                    hoverAnimated={false}
                  />
                </div>

                {/* Liked Button */}
                <div>
                  <LikeButton song={song} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
