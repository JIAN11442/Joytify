"use client";

import usePlayer from "@/hooks/usePlayer";
import { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";

type SoundWaveProps = {
  color?: string;
  eachWidth?: number;
  eachMinHeight?: number;
  eachMaxHeight?: number;
  interval?: number;
  tension?: number;
  friction?: number;
};

const SoundWave: React.FC<SoundWaveProps> = ({
  color,
  eachWidth,
  eachMinHeight,
  eachMaxHeight,
  interval,
  tension,
  friction,
}) => {
  const { isPlaying } = usePlayer();

  const lowMaxHeight = eachMaxHeight
    ? `${Math.floor(eachMaxHeight / 2)}px`
    : "8px";
  const mediumMaxHeight = eachMaxHeight ? `${eachMaxHeight / 0.8}px` : "10px";
  const HighMaxHeight = eachMaxHeight ? `${eachMaxHeight}px` : "15px";

  const bars = [
    { frequency: 0.5, maxHeight: lowMaxHeight },
    { frequency: 1, maxHeight: HighMaxHeight },
    { frequency: 0.8, maxHeight: mediumMaxHeight },
    { frequency: 0.3, maxHeight: lowMaxHeight },
  ];

  const totalWidth =
    (eachWidth ? eachWidth : 2) * bars.length +
    (interval ? interval : 5) * (bars.length - 1);

  return (
    <div
      className={`
        relative 
        flex
        min-w-[${totalWidth}px]
        h-5
        bg-red-100
      `}
    >
      {bars.map((bar, index) => {
        const { height } = useSpring({
          loop: { reverse: true },
          from: { height: eachMinHeight ? `${eachMinHeight}px` : "2px" },
          to: { height: bar.maxHeight },
          config: {
            tension: tension ? tension : 3000,
            friction: friction ? friction * bar.frequency : 200 * bar.frequency,
          },
        });

        return (
          <animated.div
            key={index}
            style={{
              position: "absolute",
              width: `${eachWidth ? eachWidth : 2}px`,
              bottom: "0",
              left: `${(interval ? interval : 5) * index}px`,
              height,
              backgroundColor: color ? color : "green",
            }}
          />
        );
      })}
    </div>
  );
};

export default SoundWave;
