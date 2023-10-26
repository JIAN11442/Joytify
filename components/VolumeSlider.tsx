"use client";

import * as Slider from "@radix-ui/react-slider";

interface VolumeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <Slider.Root
      className="
        group
        relative
        flex
        items-center
        select-none
        touch-none
        w-full
        h-3
      "
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label="Volume"
    >
      <Slider.Track
        className="
          relative
          grow
          h-[4px]
          rounded-full
          bg-neutral-600
        "
      >
        <Slider.Range
          className={`
            absolute
            h-full        
            bg-white
            group-hover:bg-green-500
            rounded-full
            transition
          `}
        />
        <Slider.Thumb
          aria-label="Volume"
          className={`
            hidden
            group-hover:flex
            translate-y-[-30%]
            w-3
            h-3
            bg-white
            border-0
            outline-none
            rounded-full
            transition
        `}
        />
      </Slider.Track>
    </Slider.Root>
  );
};

export default VolumeSlider;
