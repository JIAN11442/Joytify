"use client";

import { LuLibrary } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";

import { useUser } from "@/hooks/useUser";
import LibrarySearch from "./LibrarySearch";
import useCollapse from "@/hooks/useCollapse";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";

interface LibraryTitleProps {
  songsByUserId: Song[];
}

const LibraryHeader: React.FC<LibraryTitleProps> = ({ songsByUserId }) => {
  const { isCollapse, setIsCollapse } = useCollapse();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();

  return (
    <div
      className="
        pt-5
    "
    >
      {/* Library Title */}
      <div
        className="
          relative
          flex
          flex-row
          items-center
        "
      >
        {/* Title */}
        <div
          onClick={() => setIsCollapse(!isCollapse)}
          className="
            flex
            flex-row
            gap-x-4
            items-center
            text-neutral-400
            hover:text-white
            transition
            cursor-pointer
        "
        >
          {/* Icon */}
          <div>
            <LuLibrary size={30} />
          </div>
          {/* Label */}
          <div className={`${isCollapse ? "hidden" : "flex"}`}>
            <p className="text-lg font-bold">Your Library</p>
          </div>
        </div>

        {/* Options */}
        <div
          onClick={() => {
            if (user) {
              uploadModal.open();
            } else {
              authModal.open();
            }
          }}
          className={`
            absolute
            right-0
            p-2
            rounded-full
            bg-transparent
            text-neutral-400
            hover:bg-neutral-800/80
            hover:text-white
            hover:scale-110
            transition
            cursor-pointer
            ${isCollapse ? "hidden" : "flex"}
          `}
        >
          <AiOutlinePlus size={20} />
        </div>
      </div>

      {/* SearchBar */}
      <div
        className={`
          pt-3
          ${isCollapse || !user || songsByUserId.length === 0 ? "hidden" : ""}
        `}
      >
        <LibrarySearch />
      </div>
    </div>
  );
};

export default LibraryHeader;
