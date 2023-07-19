import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

const UploadModal = () => {
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <div>form</div>
    </Modal>
  );
};

export default UploadModal;
