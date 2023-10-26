import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  PiSpeakerSimpleLow,
  PiSpeakerSimpleHigh,
  PiSpeakerSimpleX,
} from "react-icons/pi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { SlLoop } from "react-icons/sl";
import useSound from "use-sound";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import VolumeSlider from "./VolumeSlider";
import usePlayer from "@/hooks/usePlayer";
import useSwitchSongs from "@/hooks/useSwitchSongs";
import { CstmLoopSolid, CstmRandomSolid } from "@/public/svgs";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const switchSongs = useSwitchSongs();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon =
    volume === 0
      ? PiSpeakerSimpleX
      : volume >= 0.5
      ? PiSpeakerSimpleHigh
      : PiSpeakerSimpleLow;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      switchSongs.onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  // Handle Mute Volume
  const toggleMute = () => {
    if (volume) {
      setPreviousVolume(volume);
      setVolume(0);
    } else {
      setVolume(previousVolume);
    }
  };

  // Handle PlayButton
  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  // When Click SongCard, Play the Songs Immediately
  useEffect(() => {
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
          onClick={handlePlay}
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
        {/* Random Switch Song */}
        <div
          className="
            relative
            flex
            items-center
            justify-center
          "
        >
          <CstmRandomSolid
            onClick={() => player.setRandomPlay(!player.randomPlay)}
            className={`
              h-[30px]
              w-[30px]
              cursor-pointer
              transition
              ${
                player.randomPlay
                  ? `text-green-500`
                  : `text-neutral-400 hover:text-white`
              }
            `}
          />
          <div
            className={`
              absolute
              bottom-0
              w-1
              h-1
              bg-green-500
              rounded-full
              ${player.randomPlay ? "flex" : "hidden"}
            `}
          ></div>
        </div>

        {/* Switch to Previous Song */}
        <div>
          <AiFillStepBackward
            size={30}
            onClick={() => switchSongs.onPlayPrevious()}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              hover:scale-110
              transition
            "
          />
        </div>

        {/* Play Button && Pause Button */}
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
          <Icon onClick={handlePlay} size={30} className="text-black" />
        </div>

        {/* Switch to Next Song */}
        <div>
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

        {/* Loop Songs */}
        <div>
          <CstmLoopSolid
            className={`
              w-[30px]
              h-[30px]

            `}
          />
        </div>
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

https://www.flaticon.com/free-icon/loop_7764660?term=loop&page=1&position=57&origin=search&related_id=7764660
https://convertio.co/zh/download/e8f0c7668a7be447e82e30226671b24a05bd7f/