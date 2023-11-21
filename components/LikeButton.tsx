"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface LikeButtonProps {
  song: Song;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
  const [isLiked, setIsLiked] = useState(false);
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const authModal = useAuthModal();
  const router = useRouter();

  // Fetch current song liked status
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchLikedStatus = async () => {
      const { data, error } = await supabase
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", song.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchLikedStatus();
  }, [supabase, user?.id, song?.id]);

  // handleClick
  const handleLike = async () => {
    if (!user?.id) {
      authModal.open();
    } else {
      if (isLiked) {
        const { error } = await supabase
          .from("liked_songs")
          .delete()
          .eq("user_id", user?.id)
          .eq("song_id", song?.id);

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(false);
          toast.success(`『 ${song.title} 』Removed`);
        }
      } else {
        const { error } = await supabase.from("liked_songs").insert({
          user_id: user?.id,
          song_id: song?.id,
        });

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(true);
          toast.success(`『 ${song.title} 』liked`);
        }
      }
    }

    router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      onClick={handleLike}
      className="
        hover:opacity-75
        transition
      "
    >
      <Icon size={28} color={isLiked ? "#00fd0a" : "white"} />
    </button>
  );
};

export default LikeButton;
