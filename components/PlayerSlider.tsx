import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import usePlayer from "@/hooks/usePlayer";

interface PlayerSliderProps {
  className?: string;
}

const PlayerSlider: React.FC<PlayerSliderProps> = ({ className }) => {
  const { duration, sound } = usePlayer();
  const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
  const [songTime, setSongTime] = useState({ min: 0, sec: 0 });
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (sound) {
      const min = Math.floor(duration! / 1000 / 60);
      const sec = Math.floor((duration! / 1000) % 60);
      setSongTime({ min: min, sec: sec });

      const timer = setInterval(() => {
        const currMin = Math.floor(sound?.seek() / 60);
        const currSec = Math.floor(sound?.seek() % 60);

        setCurrTime({ min: currMin, sec: currSec });
        setValue(sound.seek());
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [sound]);

  return (
    <div
      className={twMerge(
        `
        flex
        flex-row
        w-full
        items-center
        justify-center
        gap-x-2
      `,
        className
      )}
    >
      {/* Start Time */}
      <div
        className="
          flex
          min-w-[50px]
          items-center
          justify-center
          text-[13px]
          text-neutral-400
        "
      >
        {currTime?.min.toString().padStart(2, "0") +
          ":" +
          currTime?.sec.toString().padStart(2, "0")}
      </div>

      {/* TimeLine */}
      <input
        type="range"
        min={0}
        value={value}
        max={duration! / 1000}
        step={1}
        onChange={(e) => {
          sound?.seek(parseInt(e.target.value));
        }}
        className="
          appearance-none
          rounded-lg
          w-full
          cursor-pointer
          overflow-hidden

          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-[1px]
          [&::-webkit-slider-thumb]:h-[3px]
          [&::-webkit-slider-thumb]:rounded-lg
          [&::-webkit-slider-thumb]:bg-[#00fd0a]
          [&::-webkit-slider-thumb]:shadow-[-400px_10px_3px_400px_#00fd0a]
          
          "
      />

      {/* End Time */}
      <div
        className="
          text-[13px]
          text-neutral-400
        "
      >
        {songTime.min?.toString().padStart(2, "0") +
          ":" +
          songTime.sec?.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default PlayerSlider;
