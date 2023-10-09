import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";
import getSongs from "./getSongs";

const getSongsByTitle = async (title?: string | null): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // 當目前處在 Search page,然後又點擊SearchIcon，這時候Sidebar的SearchIcon會push一個『/search』
  // 而並不是『/search?title=』,所以 Search page 中的 SearchParams?.title 為 undefined,即為 false
  // 為 false 時，想返回全部Songs
  if (!title) {
    const allSongs = getSongs();
    return allSongs;
  }

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (songsError) {
    console.log(songsError.message);
  }

  return (songsData as Song[]) || [];
};

export default getSongsByTitle;
