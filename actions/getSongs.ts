import { Song } from "@/types";

import { cookies } from "next/headers";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

const getSongs = async (): Promise<Song[]> => {
  // get song table database from supabase server

  // createServerComponentClient : 伺服端（取得資料）
  // createClientComponentClient : 客戶端（上傳資料）
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongs;
