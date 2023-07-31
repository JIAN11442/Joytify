"use client";

import { TbPlaylist } from "react-icons/tb";
import { LuLibrary } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  isCollapse: boolean;
  setIsCollapse: any;
  songsByUserId: Song[];
}

const Library: React.FC<LibraryProps> = ({
  isCollapse,
  setIsCollapse,
  songsByUserId,
}) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const onClick = () => {
    // Add Your Library
    if (!user) {
      authModal.onOpen();
    } else {
      uploadModal.onOpen();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Library */}
      <div
        className={`
          flex
          items-center
          ${isCollapse ? "justify-center" : "justify-between"}
          px-5
      `}
      >
        <div
          onClick={() => {
            setIsCollapse(!isCollapse);
          }}
          className="
          flex
          flex-row
          items-center
          gap-x-4
          text-neutral-400
          hover:text-white
          transition
          cursor-pointer
        "
        >
          <LuLibrary size={30} />
          {!isCollapse && <p className="text-lg font-bold">Your Library</p>}
        </div>
        {!isCollapse && (
          <div
            onClick={onClick}
            className="
              p-2
              bg-transparent
              rounded-full
              text-neutral-400
             hover:bg-neutral-800/80
             hover:text-white
             transition
             cursor-pointer
            "
          >
            <AiOutlinePlus size={22} />
          </div>
        )}
      </div>

      {/* List Of Songs */}
      <div
        className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
        "
      >
        {songsByUserId.map((song, index) => (
          <MediaItem key={index} song={song} isCollapse={isCollapse} />
        ))}
      </div>
    </div>
  );
};

export default Library;
