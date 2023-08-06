import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";
import getSongsByUserId from "./getSongsByUserId";
import getSongs from "./getSongs";

const getSongsByTitle = async (
  title: string,
  type: string
): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title && type === "library") {
    const allSongsByUserId = getSongsByUserId();
    return allSongsByUserId;
  } else if (!title && type === "search") {
    const allSongs = getSongs();
    return allSongs;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
