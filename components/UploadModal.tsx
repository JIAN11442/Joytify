import uniqId from "uniqid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();

  const onChange = () => {
    if (!isLoading) {
      router.refresh();
      uploadModal.close();
    }
  };

  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      setIsLoading(true);

      const songFile = value.song?.[0];
      const imageFile = value.image?.[0];

      if (!songFile || !imageFile || !user) {
        toast.error("Miss Field");
        return;
      }

      //   Upload Song to Storage
      const uniqueId = uniqId();
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("song upload failed");
      }

      //   Upload Image to Storage
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${uniqueId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("image upload failed");
      }

      //   Upload values to supabase table
      const { error: supabaseError } = await supabase.from("songs").insert({
        user_id: user?.id,
        title: value.title,
        author: value.author,
        song_path: songData.path,
        image_path: imageData.path,
      });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      if (songData || imageData) {
        setIsLoading(false);
        uploadModal.close();
        reset();
        router.refresh();
        toast.success("Upload Successfully");
      }
    } catch (error) {
      console.log(`Something went wrong, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={uploadModal.isOpen}
      disabled={isLoading}
      onChange={onChange}
      title="Add a song"
      description="upload an mp3 file"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            flex
            flex-col
            gap-y-4
        "
      >
        {/* Loading */}
        <div>
          {isLoading && (
            <Loading title="Uploading..." description="Please wait a second" />
          )}
        </div>

        {/* Song Title */}
        <Input
          id="title"
          type="text"
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: false })}
        />
        {/* Song Author */}
        <Input
          id="author"
          type="text"
          disabled={isLoading}
          placeholder="Song author"
          {...register("author", { required: false })}
        />

        {/* Song File */}
        <div>
          {/* Title */}
          <div>
            <p
              className="
                text-md
                text-neutral-400
                pb-1        
            "
            >
              Select a song file
            </p>
          </div>
          {/* Song File Input */}
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: false })}
          />
        </div>

        {/* Image File */}
        <div>
          {/* Title */}
          <div>
            <p
              className="
                text-md
                text-neutral-400
                pb-1        
            "
            >
              Select an image file
            </p>
          </div>
          {/* Song File Input */}
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: false })}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
