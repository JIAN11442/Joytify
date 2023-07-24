import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useUploadImage = (song: Song) => {
  const supabase = useSupabaseClient();

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useUploadImage;
