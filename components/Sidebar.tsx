"use client";

import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import Box from "./Box";
import { Song } from "@/types";
import LibraryBody from "./LibraryBody";
import SidebarItem from "./SidebarItem";
import useCollapse from "@/hooks/useCollapse";
import usePlayer from "@/hooks/usePlayer";
import LibraryHeader from "./LibraryHeader";

interface SidebarProps {
  children?: React.ReactNode;
  songsByUserId: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songsByUserId }) => {
  const pathName = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
    ],
    [pathName]
  );
  const { isCollapse } = useCollapse();
  const { activeId } = usePlayer();

  return (
    <div
      className={twMerge(
        `
        flex
        h-full
        p-2
        pr-0
        gap-x-2
      `,
        activeId && "h-[calc(100%-75px)]"
      )}
    >
      {/* Sidebar */}
      <div
        className={`
          flex
          flex-col
          ${isCollapse ? "w-[70px]" : "w-[300px] lg:w-[350px] hidden md:flex"}
          h-full
          gap-y-2
        `}
      >
        {/* Main Navigate */}
        <Box className="h-auto p-2">
          <div
            className={`
              flex
              flex-col
              py-5
              px-3
              gap-y-4
            `}
          >
            {routes.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </div>
        </Box>

        {/* Library */}
        <Box
          className="
            flex
            flex-col
            w-full
            h-full
            overflow-hidden
          "
        >
          {/* Header */}
          <Box className="rounded-b-none">
            <div
              className="
                flex-1
                py-2
                pl-5
                pr-4
              "
            >
              <LibraryHeader songsByUserId={songsByUserId} />
            </div>
          </Box>

          {/* Body */}
          <Box
            className="
              flex 
              flex-col 
              px-2
              pt-2
              overflow-x-hidden
              overflow-y-auto 
              rounded-t-none
            "
          >
            <div>
              <LibraryBody songsByUserId={songsByUserId} />
            </div>
          </Box>
        </Box>
      </div>

      {/* Main Page */}
      <main
        className="
          flex-1
          overflow-hidden
          overflow-y-auto
        "
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
