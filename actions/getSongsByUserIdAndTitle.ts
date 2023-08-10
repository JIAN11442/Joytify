import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";
import getSongsByUserId from "./getSongsByUserId";

const getSongsByUserIdAndTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongsByUserId = getSongsByUserId();
    return allSongsByUserId;
  }

  const { data: songData, error: songError } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (songError) {
    console.log(songError.message);
  }

  return (songData as any) || [];
};

export default getSongsByUserIdAndTitle;
