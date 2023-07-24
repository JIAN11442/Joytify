"use client";

import Modal from "./Modal";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const session = useSessionContext();
  const router = useRouter();
  const onChange = (open: boolean) => {
    if (!open) {
      router.refresh();
      authModal.onClose();
      authModal.LogIn();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      authModal.onClose();
      authModal.LogIn();
    }
  }, [session]);

  return (
    <Modal
      title="Welcome Back"
      description="Login to your account"
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
