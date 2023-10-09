"use client";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useCollapse from "@/hooks/useCollapse";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { user } = useUser();
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { isCollapse, setIsCollapse } = useCollapse();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      router.refresh();
      toast.success("Logout!");
    }
  };

  return (
    <div
      className={twMerge(
        `
          h-fit
          p-6
          bg-gradient-to-b
          from-emerald-800
        `,
        className
      )}
    >
      <div
        className="
          flex
          w-full
          mb-4
          items-center
          justify-between
      "
      >
        {/* RxArrowLeft Button && RxArrowRight Button*/}
        <div
          className={`
            gap-x-3
            items-center
            ${isCollapse ? "flex" : "hidden md:flex"}
          `}
        >
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
            <RxArrowLeft size={25} />
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
            <RxArrowRight size={25} />
          </button>
        </div>
        {/* HiHome Button && BiSearch Button */}
        <div
          className={`
            flex
            md:hidden
            ${isCollapse ? "hidden" : ""}
            gap-x-3
            item-center
          `}
        >
          <button
            onClick={() => router.push("/")}
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
            <HiHome size={25} color="black" />
          </button>
          <button
            onClick={() => router.push("/search")}
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
            <BiSearch size={25} color="black" />
          </button>
        </div>
        {/* SignIn Button && SignUp Button */}

        <div
          className="
            flex
            gap-x-3
            items-center
            justify-between
        "
        >
          {user ? (
            <div className="flex gap-x-3">
              <Button onClick={handleLogout} className="px-4 py-2 bg-white">
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
                  onClick={() => {
                    authModal.signUp();
                    authModal.open();
                  }}
                  className="
                  bg-transparent
                  font-medium
                  text-neutral-300"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    authModal.signIn();
                    authModal.open();
                  }}
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
