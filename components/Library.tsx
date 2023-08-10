"use client";

import { useSpring, animated } from "react-spring";
import { LuLibrary } from "react-icons/lu";
import { TbPlaylist } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";

import Input from "./Input";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import { useUser } from "@/hooks/useUser";
import useCollapse from "@/hooks/useCollapse";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

interface LibraryProps {
  songsByUserId: Song[];
}

const Library: React.FC<LibraryProps> = ({ songsByUserId }) => {
  const { user } = useUser();
  const router = useRouter();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { isCollapse, setIsCollapse } = useCollapse();
  const [activeSearchBar, setActiveSearchBar] = useState<boolean>(false);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>("");
  const [songsByUserIdAndTitle, setSongsByUserIdAndTitle] = useState<Song[]>(
    []
  );

  // Upload Song OnClick Function
  const onClick = () => {
    if (!user) {
      authModal.logIn();
      authModal.logInDescription();
      authModal.onOpen();
    } else {
      uploadModal.onOpen();
    }
  };

  // Library SearchBar FadeIn Animation
  const fadeInAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: activeSearchBar ? 1 : 0,
    },
    config: { duration: 300 },
  });

  // Close SearchBar
  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        searchIconRef.current &&
        searchBarRef.current &&
        !searchIconRef.current.contains(event.target) &&
        !searchBarRef.current.contains(event.target)
      ) {
        setActiveSearchBar(false);
        setValue("");
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Get Library Search Result(setTimeout)
  useEffect(() => {
    const filterSongs = songsByUserId.filter((song) =>
      song.title.toLowerCase().includes(value.toLowerCase())
    );
    const timer = setTimeout(() => setSongsByUserIdAndTitle(filterSongs), 300);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return (
    <div
      className={`
        flex
        flex-col
        ${isCollapse ? "gap-y-3" : ""}
        h-full
      `}
    >
      {/* Library */}
      <div
        className={`
          flex
          flex-row
          items-center
          ${isCollapse ? "justify-center" : "justify-between"}
          px-5
          relative
      `}
      >
        <div
          onClick={() => {
            setIsCollapse(!isCollapse);
          }}
          className={`
            flex
            flex-row
            items-center
            ${!isCollapse ? "gap-x-4" : ""}
            text-neutral-400
            hover:text-white
            transition
            cursor-pointer
          `}
        >
          <div>
            <LuLibrary size={30} />
          </div>
          <div>
            {!isCollapse && <p className="text-lg font-bold">Your Library</p>}
          </div>
        </div>
        {!isCollapse && (
          <div
            onClick={onClick}
            className="
              absolute
              right-1
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

      {/* Search & Sort*/}
      {!isCollapse && user && songsByUserId.length > 0 && (
        <div
          className={`
            p-3
            flex
            flex-row
            w-full
            h-fit
            gap-x-3
            items-center
            justify-between
          `}
        >
          {/* Search */}
          <div
            className="
              flex
              w-full
              h-[45px]
              relative
              items-center
          "
          >
            {/* Search Icon */}
            <div
              ref={searchIconRef}
              onClick={() => {
                setActiveSearchBar(!activeSearchBar);
              }}
              className={`
                p-2
                z-10
                group
                rounded-full
                transition
                cursor-pointer
                ${activeSearchBar ? "absolute" : "hover:bg-neutral-700/50"}
              
            `}
            >
              <FiSearch
                size={20}
                className="
                  text-neutral-400 
                  group-hover:text-white
              "
              />
            </div>
            {/* SearchBar */}
            <animated.div
              ref={searchBarRef}
              style={fadeInAnimation}
              className="w-full"
            >
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                className={`
                  py-1.5
                  pl-10
                  rounded-md
                  bg-neutral-700/50
                  placeholder:text-[15px]
                  placeholder:text-neutral-500
                  ${activeSearchBar ? "flex" : "hidden"}
                `}
                placeholder="Search in your library"
              />
            </animated.div>
          </div>
          {/* Sort */}
          <div className="flex">
            <p
              className="
                w-full
                font-semibold
                text-neutral-400
                truncate
              "
            >
              Recents
            </p>
          </div>
        </div>
      )}

      {/* List Of Songs */}
      <div
        className="
            flex
            flex-col
            gap-y-2
            px-2
            h-full
        "
      >
        {!user ? (
          <>
            {!isCollapse && (
              <div className="p-3 pt-10">
                <p className="text-neutral-500 font-semibold">
                  The playlist is empty before logging into your account
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {!isCollapse && songsByUserId.length === 0 ? (
              <div className="p-3 pt-10 text-neutral-500 font-semibold">
                <p className="mb-2">There are no songs in playlist.</p>
                <p>
                  please click the "+" icon in the upper right corner and upload
                  your own favourite songs.
                </p>
              </div>
            ) : (
              <>
                {!activeSearchBar ? (
                  songsByUserId.map((song, index) => (
                    <MediaItem key={index} song={song} collapseRounded={true} />
                  ))
                ) : (
                  <>
                    {songsByUserIdAndTitle.length > 0 ? (
                      songsByUserIdAndTitle.map((song, index) => (
                        <MediaItem
                          key={index}
                          song={song}
                          collapseRounded={true}
                        />
                      ))
                    ) : (
                      <>
                        {!isCollapse && (
                          <div
                            className="
                              p-3
                              pt-10
                              text-neutral-500
                              font-semibold
                            "
                          >
                            <p className="mb-2">Could not find '{value}'.</p>
                            <p>
                              Please try searching again with different
                              spellings or keywords
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
