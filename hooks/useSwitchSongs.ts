import { useState } from "react";
import usePlayer from "./usePlayer";

const useSwitchSongs = () => {
  const { activeId, ids, setId } = usePlayer();
  const [newIds, setNewIds] = useState<string[]>([...ids]);

  const next = () => {
    if (ids.length === 0) {
      return;
    }

    const currentIndex = ids.findIndex((id) => id === activeId);
    const nextSongId = ids[(currentIndex + 1) % ids.length];

    setId(nextSongId);
  };

  const previous = () => {
    if (ids.length === 0) {
      return;
    }

    const currentIndex = ids.findIndex((id) => id === activeId);
    const previousSong = ids[currentIndex - 1];

    if (!previousSong) {
      return setId(ids[ids.length - 1]);
    }

    setId(previousSong);
  };

  const cycle = () => {};

  const shuffle = () => {
    if (ids.length === 0) {
      return;
    }

    if (newIds.length === 1) {
      setNewIds([...ids]);
    }

    const randomIndex = Math.floor(Math.random() * newIds.length);
    const nextId = newIds.splice(randomIndex, 1)[0];

    setId(nextId);
    // console.log(`rid:${randomIndex}\nnid:${nextId}\n${ids}\n${newIds}`);
  };

  return {
    next,
    previous,
    cycle,
    shuffle,
  };
};

export default useSwitchSongs;
