"use client";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const AuthModal = useAuthModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // TODO: Reset any playing songs
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logout Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6 `,
        className
      )}
    >
      <div className="flex w-full mb-4 items-center justify-between">
        {/* RxArrowLeft Button && RxArrowRight Button*/}
        <div className="hidden md:flex gap-x-3 items-center">
          {/* RxArrowLeft Button */}
          <button
            onClick={() => router.back()}
            className="
                flex
                p-2
                rounded-full
                bg-black
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <RxArrowLeft size={22} />
          </button>

          {/* RxArrowRight Button */}
          <button
            onClick={() => router.forward()}
            className="
                flex
                p-2
                rounded-full
                bg-black
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <RxArrowRight size={22} />
          </button>
        </div>
        {/* HiHome Button && BiSearch Button */}
        <div className="flex md:hidden gap-x-3 item-center">
          {/* HiHome Button */}
          <button
            className="
                p-2
                rounded-full
                bg-white
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <HiHome size={20} color="black" />
          </button>
          {/* BiSearch Button */}
          <button
            className="
                p-2
                rounded-full
                bg-white
                items-center
                justify-center
                hover:opacity-75
                transition
            "
          >
            <BiSearch size={20} color="black" />
          </button>
        </div>
        {/* SignIn Button && SignUp Button */}
        <div className="flex gap-x-3 items-center justify-between">
          {user ? (
            <div className="items-center flex gap-4">
              <Button onClick={handleLogout} className="px-6 py-2 bg-white">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="bg-transparent font-medium text-neutral-300"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={AuthModal.onOpen}
                  className="bg-white px-4 py-1.5"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
