import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface PlayerSliderProps {
  className?: string;
}

const PlayerSlider: React.FC<PlayerSliderProps> = ({ className }) => {
  const { duration, sound } = usePlayer();
  const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
  const [songTime, setSongTime] = useState({ min: 0, sec: 0 });

  useEffect(() => {
    if (sound) {
      const min = Math.floor(duration! / 1000 / 60);
      const sec = Math.floor((duration! / 1000) % 60);
      setSongTime({ min: min, sec: sec });

      const timer = setInterval(() => {
        const currMin = Math.floor(sound?.seek() / 60);
        const currSec = Math.floor(sound?.seek() % 60);

        setCurrTime({ min: currMin, sec: currSec });
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
          text-sm
          text-neutral-400
        "
      >
        {currTime?.min.toString().padStart(2, "0") +
          ":" +
          currTime?.sec.toString().padStart(2, "0")}
      </div>

      {/* TimeLine */}
      <div
        className="
          flex-1
          w-full
          h-1
          rounded-full
          bg-green-500
        "
      ></div>

      {/* End Time */}
      <div
        className="
          text-sm
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
