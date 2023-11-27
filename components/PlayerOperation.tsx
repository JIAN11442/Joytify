import { Howl } from "howler";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import usePlayer from "@/hooks/usePlayer";
import useSwitchSongs from "@/hooks/useSwitchSongs";
import CstmLoopSolid from "@/public/svgs/CstmLoopSolid.svg";
import CstmShuffleSolid from "@/public/svgs/CstmShuffleSolid.svg";

interface PlayerOperationProps {
  sound: Howl | null;
}

const PlayerOperation: React.FC<PlayerOperationProps> = ({ sound }) => {
  const { isPlaying, playerStatus, setPlayerStatus } = usePlayer();
  const { next, previous, shuffle } = useSwitchSongs();

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const handlePlayPause = () => {
    if (!isPlaying) {
      sound?.play();
    } else {
      sound?.pause();
    }
  };

  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
        gap-x-2
      "
    >
      {/* Shuffle */}
      <div
        onClick={() => {
          setPlayerStatus({
            sh_status: !playerStatus.shuffle,
            alp_status: false,
            slp_status: false,
          });
        }}
        className={`
          hidden
          md:flex
          items-center
          justify-center
          hover:scale-110
          cursor-pointer
          transition
        `}
      >
        <CstmShuffleSolid
          className={`
            h-[28px]
            w-[28px]
            ${
              playerStatus.shuffle
                ? `text-[#00fd0a]`
                : `text-neutral-400
                   hover:text-white
                 `
            }
          `}
        />
        <div
          className={`
            w-[2px]
            h-[2px]
            bg-[#00fd0a]
            rounded-full
            ${playerStatus.shuffle ? "flex" : "hidden"}
          `}
        ></div>
      </div>

      {/* Previous */}
      <div
        className="
          hidden
          md:flex
          hover:scale-110
          cursor-pointer
          transition      
        "
      >
        <AiFillStepBackward
          size={30}
          onClick={() => {
            if (playerStatus.shuffle) {
              shuffle();
            } else {
              previous();
            }
          }}
          className="
            text-neutral-400
            hover:text-white
          "
        />
      </div>

      {/* Play && Pause  */}
      <div
        onClick={handlePlayPause}
        className="
          p-2
          flex
          items-center
          justify-center
          bg-white
          rounded-full
          cursor-pointer
          hover:scale-110
          transition
        "
      >
        <Icon size={25} className="text-black" />
      </div>

      {/* Next */}
      <div
        className="
          hidden
          md:flex
          hover:scale-110
          cursor-pointer
          transition
        "
      >
        <AiFillStepForward
          onClick={() => {
            if (playerStatus.shuffle) {
              shuffle();
            } else {
              next();
            }
          }}
          size={30}
          className="
            text-neutral-400
            hover:text-white
          "
        />
      </div>

      {/* Loop */}
      <div
        onClick={() => {
          if (!playerStatus.aLoop && !playerStatus.sLoop) {
            setPlayerStatus({
              sh_status: false,
              alp_status: !playerStatus.aLoop,
            });
          } else if (playerStatus.aLoop && !playerStatus.sLoop) {
            setPlayerStatus({
              sh_status: false,
              alp_status: !playerStatus.aLoop,
              slp_status: !playerStatus.sLoop,
            });
          } else if (!playerStatus.aLoop && playerStatus.sLoop) {
            setPlayerStatus({
              sh_status: false,
              slp_status: !playerStatus.sLoop,
            });
          }
        }}
        className="
          relative
          hidden
          md:flex
          items-center
          justify-center
          hover:scale-110
          cursor-pointer
          transition
        "
      >
        {/* Loop Icon */}
        <div>
          <CstmLoopSolid
            className={`
              w-[25px]
              h-[25px]
              ${
                playerStatus.aLoop || playerStatus.sLoop
                  ? `
                      text-[#00fd0a]
                      hover:text-[#00fd0a]
                  `
                  : `
                      text-neutral-400
                      hover:text-white
                      
                  `
              }
          `}
          />
        </div>

        {/* Active Bullet && Text*/}
        <div
          className={`
            absolute
            right-[2px]
            bottom-[6px]
            w-[2px]
            h-[2px]
            bg-[#00fd0a]
            rounded-full
            ${playerStatus.aLoop || playerStatus.sLoop ? "flex" : "hidden"}
            `}
        >
          {/* All or Single Loop Text */}
          <div
            className={`
            ${playerStatus.sLoop || playerStatus.aLoop ? "flex" : "hidden"}
          `}
          >
            <p
              className="
              text-[10px]
              text-[#00fd0a]
              font-semibold
            "
            >
              {playerStatus.aLoop && "A"}
              {playerStatus.sLoop && "S"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOperation;
