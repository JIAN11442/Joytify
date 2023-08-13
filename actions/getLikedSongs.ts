import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData } = await supabase.auth.getSession();

  const { data: songsData, error: songsError } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (songsError) {
    console.log(songsError.message);
  }

  if (!songsData) {
    return [];
  }

  return songsData.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
