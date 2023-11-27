import { Song } from "@/types";
import MediaItem from "./MediaItem";
import { useUser } from "@/hooks/useUser";
import useCollapse from "@/hooks/useCollapse";
import useOnPlay from "@/hooks/useOnPlay";

interface UserSongListProps {
  songsByUserId: Song[];
  debounceValue?: string;
}

const UserSongsList: React.FC<UserSongListProps> = ({
  songsByUserId,
  debounceValue,
}) => {
  const { user } = useUser();
  const { isCollapse } = useCollapse();
  const onPlay = useOnPlay(songsByUserId);

  return (
    <div>
      {user ? (
        debounceValue ? (
          songsByUserId.length === 0 ? (
            // 搜索失敗
            <div
              className="
                p-3
                text-neutral-500
                font-semibold
              "
            >
              <p className="mb-2">Could not find '{debounceValue}'</p>
              <p>
                Please try searching again with different spellings or keywords
              </p>
            </div>
          ) : (
            // 搜索成功，列出該目標音樂列表
            <div
              className={`
                flex
                flex-col
                ${isCollapse ? "items-center" : ""}
                gap-y-2
                px-2
            `}
            >
              {songsByUserId.map((song) => (
                <MediaItem
                  key={song.id}
                  song={song}
                  collapseRounded={true}
                  hoverAnimated={true}
                />
              ))}
            </div>
          )
        ) : songsByUserId.length === 0 ? (
          // 已登入，但不曾上傳過喜歡的音樂
          <div
            className={`
              pt-4
              px-4
              text-neutral-500
              font-semibold
              ${isCollapse ? "hidden" : ""}
            `}
          >
            <p className="mb-4">There are no songs in playlist.</p>
            <p>
              Click the " + " button in the upper right corner to upload your
              own favourite songs.
            </p>
          </div>
        ) : (
          // 已登入，列出該用戶喜歡的音樂列表
          <div
            className={`
              flex
              flex-col
              ${isCollapse ? "items-center" : ""}
              gap-y-2
              px-2
              `}
          >
            {songsByUserId.map((song) => (
              <MediaItem
                key={song.id}
                song={song}
                onClick={(id: string) => onPlay(id)}
                collapseRounded={true}
                hoverAnimated={true}
              />
            ))}
          </div>
        )
      ) : (
        // 未登入
        <div
          className={`
            pt-4
            px-4
            ${isCollapse ? "hidden" : ""}
          `}
        >
          <p className="text-neutral-500 font-semibold">
            The playlist is empty before logging into your account.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserSongsList;
