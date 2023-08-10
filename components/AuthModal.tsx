"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const router = useRouter();
  const authModal = useAuthModal();
  const session = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const onChange = (open: boolean) => {
    if (!open) {
      authModal.onClose();
      authModal.logIn();
      router.refresh();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      authModal.onClose();
      authModal.logIn();
    }
  }, [session]);

  return (
    <Modal
      title="Welcome Back"
      description={authModal.description}
      isOpen={authModal.isOpen}
      onChange={onChange}
    >
      <Auth
        view={authModal.viewType}
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
