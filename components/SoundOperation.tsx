import usePlayer from "@/hooks/usePlayer";
import { useState } from "react";
import {
  PiSpeakerSimpleLow,
  PiSpeakerSimpleHigh,
  PiSpeakerSimpleX,
} from "react-icons/pi";
import VolumeSlider from "./VolumeSlider";

const SoundOperation = () => {
  const { volume, setVolume } = usePlayer();
  const [previousVolume, setPreviousVolume] = useState<number>(volume);

  const VolumeIcon =
    volume === 0
      ? PiSpeakerSimpleX
      : volume >= 0.5
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
        flex
        w-[120px]
        items-center
        gap-x-2
     "
    >
      <VolumeIcon
        onClick={toggleMute}
        size={26}
        className="
         text-neutral-400
         hover:text-white
         cursor-pointer
         transition
        "
      />
      <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
    </div>
  );
};

export default SoundOperation;
