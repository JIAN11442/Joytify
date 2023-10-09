import Image from "next/image";

import Header from "@/components/Header";
import getLikedSongs from "@/actions/getLikedSongs";
import LikedContent from "./components/LikedContent";
import PlayButton from "@/components/PlayButton";

const LikedSongs = async () => {
  const likedSongs = await getLikedSongs();

  return (
    <div
      className="
        w-full
        h-full
        bg-neutral-900
        rounded-lg
        overflow-hidden
        overflow-y-auto
      "
    >
      {/* Header Section */}
      <Header
        className="
        from-indigo-600/50
        to-indigo-800/40
       "
      >
        <div
          className="
            mt-20
            flex
            flex-row
            gap-x-5
        "
        >
          {/* IMAGE */}
          <div
            className="
                relative
                w-32
                h-32
                sm:w-32
                sm:h-32
                md:w-44
                md:h-44
                lg:h-[200px]
                lg:w-[200px]
            "
          >
            <Image
              fill
              alt="liked"
              src="/images/liked.png"
              className="
                object-cover
                drop-shadow-3xl
              "
            />
          </div>
          {/* TITLE */}
          <div
            className="
                flex
                flex-col
                my-2
                justify-evenly
            "
          >
            <div className="flex flex-col gap-y-3">
              <p
                className="
                    text-sm
                    text-white
                    font-semibold
                "
              >
                Playlist
              </p>
              <h1
                className="
                    text-white
                    text-4xl
                    sm:text-6xl
                    lg:text-7xl
                    xl:text-8xl
                    font-bold
                "
              >
                Liked Songs
              </h1>
            </div>
            <div>
              <p
                className="
                    text-white
                    text-md
                    font-semibold
                "
              >
                {likedSongs.length} songs
              </p>
            </div>
          </div>
        </div>
      </Header>

      {/* Main Section */}
      <div
        className="
          bg-gradient-to-b
          from-indigo-800/20
        "
      >
        {likedSongs.length > 0 ? (
          <div className="py-3 px-6">
            <PlayButton className="opacity-100 p-5" />
          </div>
        ) : (
          <div
            className="
              flex
              py-10
              items-center
              justify-center
            "
          >
            <p
              className="
                text-lg
                font-semibold
                text-neutral-500
              "
            >
              No liked Songs.
            </p>
          </div>
        )}
        <div>
          <LikedContent likedSongs={likedSongs} />
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
