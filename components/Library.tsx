"use client";

import { useEffect, useState } from "react";
import { LuLibrary } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import UserSongsList from "./UserSongsList";
import LibrarySearch from "./LibrarySearch";
import useDebounce from "@/hooks/useDebounce";
import useCollapse from "@/hooks/useCollapse";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useSearchInput from "@/hooks/useSearchInputValue";

interface LibraryProps {
  songsByUserId: Song[];
}

const Library: React.FC<LibraryProps> = ({ songsByUserId }) => {
  const { isCollapse, setIsCollapse } = useCollapse();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const { searchInputValue } = useSearchInput();
  const debounceValue = useDebounce(searchInputValue, 300);
  const [targetSearchSongs, setTargetSearchSongs] = useState<Song[] | null>(
    null
  );

  // get User Search Song
  useEffect(() => {
    // // 按整段title有沒有該字母來判斷(不嚴謹)
    // const filterSongs = songsByUserId.filter((song) =>
    //   song.title.toLowerCase().includes(debounceValue.toLowerCase())
    // );

    // 按輸入的值與可能的title比較，輸入一個字就比較第一個字母，以此類推(教嚴謹)
    const debounceLength = debounceValue.length;
    const filterSongs = songsByUserId.filter(
      (song) =>
        song.title.toLowerCase().slice(0, debounceLength) ===
        debounceValue.toLowerCase()
    );
    setTargetSearchSongs(filterSongs);
  }, [debounceValue]);

  return (
    <div
      className="
        flex
        flex-col
        gap-y-4
      "
    >
      {/* Library Title */}
      <div
        className="
            relative
            flex
            flex-row
            pt-5
            px-4
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
            right-4
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
          px-3
          ${isCollapse || !user || songsByUserId.length === 0 ? "hidden" : ""}
        `}
      >
        <LibrarySearch />
      </div>

      {/* User Songs List */}
      <div className="pb-5">
        <UserSongsList
          songsByUserId={
            debounceValue
              ? (targetSearchSongs as Song[])
              : (songsByUserId as Song[])
          }
          debounceValue={debounceValue}
        />
      </div>
    </div>
  );
};

export default Library;
