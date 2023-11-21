import { useEffect } from "react";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import PlayerOperation from "./PlayerOperation";
import PlayerSlider from "./PlayerSlider";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useSoundOperation from "@/hooks/useSoundOperation";
import SoundOperation from "./SoundOperation";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const { setSound, setDuration } = usePlayer();

  const { sound, duration } = useSoundOperation(songUrl);

  // When Click SongCard, Play the Songs Immediately
  useEffect(() => {
    setSound(sound);
    setDuration(duration);
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div
      className="
        flex
        flex-row
        gap-x-2
        items-center
        justify-center
      "
    >
      {/* MediaItem && LikeButton */}
      <div
        className="
          flex
          justify-start
        "
      >
        <div
          className="
            flex
            items-center
            gap-x-4
          "
        >
          <MediaItem song={song} />
          <LikeButton song={song} />
        </div>
      </div>

      {/* Song Slider && Operation */}
      <div
        className="
          flex
          w-full
          px-10
          justify-end
          md:justify-center
          xl:px-2
        "
      >
        <div
          className="
            flex
            flex-col
            max-w-[722px]
            md:w-full
          "
        >
          {/* Player Slider */}
          <div
            className="
              hidden
              md:flex
            "
          >
            <PlayerSlider />
          </div>

          {/* Player Operation */}
          <div>
            <PlayerOperation sound={sound} />
          </div>
        </div>
      </div>

      {/* Volume */}
      <div
        className="
          hidden
          md:flex
          pr-2
        "
      >
        <SoundOperation />
      </div>
    </div>
  );
};

export default PlayerContent;

// http://kfekajik.hkwsxxw.cn/article/20231022-vyw-294b599610.html

// https://www.flaticon.com/free-icon/loop_7764660?term=loop&page=1&position=57&origin=search&related_id=7764660
// https://convertio.co/zh/download/e8f0c7668a7be447e82e30226671b24a05bd7f/
