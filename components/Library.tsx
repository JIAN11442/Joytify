"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  const onClick = () => {
    // Add Your Library
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        {/* inline-flex 是讓父元素寬度隨子元素内容調整 */}
        <div className="inline-flex items-center gap-x-4">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-md font-medium text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          className="
             text-neutral-400
             hover:text-white
             transition
             cursor-pointer
            "
          size={20}
        />
      </div>
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        "
      >
        List of Songs
      </div>
    </div>
  );
};

export default Library;
