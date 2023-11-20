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

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useSoundOperation from "@/hooks/useSoundOperation";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const { volume, setVolume, setSound } = usePlayer();
  const [previousVolume, setPreviousVolume] = useState(volume);

  const VolumeIcon =
    volume === 0
      ? PiSpeakerSimpleX
      : volume >= 0.5
      ? PiSpeakerSimpleHigh
      : PiSpeakerSimpleLow;

  const { sound } = useSoundOperation(songUrl);

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
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        h-full
      "
    >
      {/* MediaItem && LikeButton */}
      <div
        className="
          flex
          w-full
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

      <div
        className="
          flex
          item-center
          justify-end
          md:justify-center
        "
      >
        <PlayerOperation sound={sound} />
      </div>

      {/* Volume For Middle Screen*/}
      <div
        className="
          hidden
          md:flex
          w-full
          justify-end
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
