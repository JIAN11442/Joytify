import { useEffect, useState } from "react";
import {
  PiSpeakerSimpleLow,
  PiSpeakerSimpleHigh,
  PiSpeakerSimpleX,
} from "react-icons/pi";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import VolumeSlider from "./VolumeSlider";
import PlayerOperation from "./PlayerOperation";
import PlayerSlider from "./PlayerSlider";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useSoundOperation from "@/hooks/useSoundOperation";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const { volume, setVolume, setSound, setDuration } = usePlayer();
  const [previousVolume, setPreviousVolume] = useState(volume);

  const VolumeIcon =
    volume === 0
      ? PiSpeakerSimpleX
      : volume >= 0.5
      ? PiSpeakerSimpleHigh
      : PiSpeakerSimpleLow;

  const { sound, duration } = useSoundOperation(songUrl);

  // Handle Mute Volume
  const toggleMute = () => {
    if (volume) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

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
        <div
          className="
            flex
            w-[120px]
            items-center
            gap-x-2
          "
        >
          <VolumeIcon
            onClick={toggleMute}
            size={30}
            className="
              text-neutral-400
              hover:text-white
              cursor-pointer
              transition
            "
          />
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;

// http://kfekajik.hkwsxxw.cn/article/20231022-vyw-294b599610.html

// https://www.flaticon.com/free-icon/loop_7764660?term=loop&page=1&position=57&origin=search&related_id=7764660
// https://convertio.co/zh/download/e8f0c7668a7be447e82e30226671b24a05bd7f/
