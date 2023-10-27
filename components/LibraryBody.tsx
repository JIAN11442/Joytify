"use client";

import { useEffect, useState } from "react";

import { Song } from "@/types";
import UserSongsList from "./UserSongsList";
import useDebounce from "@/hooks/useDebounce";
import useSearchInput from "@/hooks/useSearchInputValue";

interface LibraryProps {
  songsByUserId: Song[];
}

const LibraryBody: React.FC<LibraryProps> = ({ songsByUserId }) => {
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
      {/* User Songs List */}
      <div className="pb-5 ">
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

export default LibraryBody;
