import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className }) => {
  return (
    <button
      className={twMerge(
        `
        p-4
        bg-green-500
        rounded-full
        drop-shadow-lg
        hover:scale-110
        transition
        translate-y-1/4
        group-hover:translate-y-0
        group-hover:opacity-100
        opacity-0
      `,
        className
      )}
    >
      <FaPlay color="black" />
    </button>
  );
};

export default PlayButton;
