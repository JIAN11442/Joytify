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

interface LibraryProps {
  songsByUserId: Song[];
}

const Library: React.FC<LibraryProps> = ({ songsByUserId }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { isCollapse, setIsCollapse } = useCollapse();
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const fadeInAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: activeSearchBar ? 1 : 0,
    },
    config: { duration: 300 },
  });

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
    } else {
      uploadModal.onOpen();
    }
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        searchIconRef.current &&
        searchBarRef.current &&
        !searchIconRef.current.contains(event.target) &&
        !searchBarRef.current.contains(event.target)
      ) {
        setActiveSearchBar(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className={`
        flex
        flex-col
        ${isCollapse ? "gap-y-3" : ""}
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
      {!isCollapse && (
        <div
          className="
          p-3
          flex
          flex-row
          w-full
          h-fit
          gap-x-3
          items-center
          justify-between
        "
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
            <animated.div ref={searchBarRef} style={fadeInAnimation}>
              <Input
                autoFocus
                className={`
                py-1.5
                pl-10
                rounded-d=md
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
          <div
            className={`
              flex
              ${activeSearchBar ? "w-5" : "w-fit"}
            `}
          >
            <div
              className="
                w-full
                "
            >
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
        </div>
      )}

      {/* List Of Songs */}
      <div
        className="
            flex
            flex-col
            gap-y-2
            px-2
        "
      >
        {songsByUserId.map((song, index) => (
          <MediaItem key={index} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
