"use client";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";

import uniqId from "uniqid";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const session = useSessionContext();
  const UploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      UploadModal.onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      UploadModal.onClose();
    }
  }, [session]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      // 開始Loading
      setIsLoading(true);

      // 取得value中的song與image資料
      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      // 如果value中的song與image或user 有其中一項是undefined，
      // 也就是沒有輸入就Submit或是沒有登入賬號
      if (!songFile || !imageFile || !user) {
        toast.error("Miss Fields");
        return;
      }

      // UPLOAD SONG
      const uniqueID = uniqId();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("song upload failed");
      }

      // UPLOAD IMAGE
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Image upload failed");
      }

      // UPLOAD VALUES TO SUPABASE
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      if (songData && imageData) {
        setIsLoading(false);
        toast.success("Upload Successfully");
        router.refresh();
        reset();
        UploadModal.onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={UploadModal.isOpen}
      onChange={onChange}
      disabled={isLoading}
    >
      {isLoading && (
        <Loading title="Uploading..." description="Please wait a second" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: false })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song author"
          {...register("author", { required: false })}
        />
        <div>
          <div className="text-md text-neutral-400 pb-1">
            Select a song file
          </div>
          <div>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              disabled={isLoading}
              {...register("song", { required: false })}
            />
          </div>
        </div>
        <div>
          <div className="text-md text-neutral-400 pb-1">
            Select an image file
          </div>
          <div>
            <Input
              id="song"
              type="file"
              accept="image/*"
              disabled={isLoading}
              {...register("image", { required: false })}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="mt-2">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
