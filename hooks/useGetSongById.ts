import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useGetSongById = (id?: string) => {
  const { supabaseClient } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data: songData, error: songError } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (songError) {
        setIsLoading(false);
        return toast.error(songError.message);
      }

      setSong(songData as Song);
      setIsLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
