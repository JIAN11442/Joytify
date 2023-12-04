"use client";

import { FaPlay } from "react-icons/fa";

import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import SoundWave from "@/components/SoundWave";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const { activeId, isEnded, isPlaying } = usePlayer();

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
                      ? "bg-gradient-animated"
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
                      ${
                        song.id === activeId && isPlaying && !isEnded
                          ? `flex`
                          : `hidden`
                      }
                    `}
                  >
                    <SoundWave color="#00fd0a" eachWidth={2} interval={4} />
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
