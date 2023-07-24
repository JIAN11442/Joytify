import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className="
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
    "
    >
      <FaPlay color="black" />
    </button>
  );
};

export default PlayButton;
