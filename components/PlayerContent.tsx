import { useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  PiSpeakerSimpleLow,
  PiSpeakerSimpleHigh,
  PiSpeakerSimpleX,
} from "react-icons/pi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import VolumeSlider from "./VolumeSlider";
import usePlayer from "@/hooks/usePlayer";
import useSwitchSongs from "@/hooks/useSwitchSongs";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const switchSongs = useSwitchSongs();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon =
    volume === 0
      ? PiSpeakerSimpleX
      : volume >= 50
      ? PiSpeakerSimpleHigh
      : PiSpeakerSimpleLow;

  // Handle Mute Volume
  const toggleMute = () => {
    if (volume) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

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

      {/* PlayButton For Small Screen */}
      <div
        className="
          flex
          md:hidden
          col-auto
          w-full
          justify-end
          items-center
        "
      >
        <div
          onClick={() => {}}
          className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
          "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* PlayButton For Middle Screen*/}
      <div
        className="
          hidden
          h-full
          md:flex
          justify-center
          items-center
          w-full
          max-w-[722px]
          gap-x-6
        "
      >
        <AiFillStepBackward
          onClick={() => switchSongs.onPlayPrevious()}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            hover:scale-110
            transition
          "
        />
        <div
          className="
            flex
            items-center
            justify-center
            h-10
            w-10
            p-1
            bg-white
            rounded-full
            cursor-pointer
            hover:scale-110
            transition
          "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={() => switchSongs.onPlayNext()}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            hover:scale-110
            transition
          "
        />
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
