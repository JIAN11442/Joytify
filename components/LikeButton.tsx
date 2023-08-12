"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  song: Song;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
  const router = useRouter();
  const { user } = useUser();
  const authModal = useAuthModal();
  const { supabaseClient } = useSessionContext();
  const [isLiked, setIsLiked] = useState(false);

  // Initial LikeButton Status from Supabase liked_songs
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", song?.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [supabaseClient, user?.id, song?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", song?.id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success(`Removed`);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: user?.id,
        song_id: song?.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success(`Liked`);
      }
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className="
        hover:opacity-75
        transition
      "
    >
      <Icon size={28} color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default LikeButton;
