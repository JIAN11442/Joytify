"use client";

import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const onChange = () => {
    router.refresh();
    authModal.close();
  };

  const session = useSessionContext().session;

  useEffect(() => {
    if (session) {
      router.refresh();
      authModal.close();
    }
  }, [session]);

  return (
    <Modal
      isOpen={authModal.isOpen}
      onChange={onChange}
      title="Welcome Back"
      description={authModal.description}
    >
      <Auth
        view={authModal.viewType}
        magicLink
        theme="dark"
        providers={["google", "github"]}
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
