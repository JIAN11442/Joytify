"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";

import Box from "./Box";
import { Song } from "@/types";
import Library from "./Library";
import SidebarItem from "./SidebarItem";
import useCollapse from "@/hooks/useCollapse";
import usePlayer from "@/hooks/usePlayer";

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
  const player = usePlayer();

  return (
    <div
      className={`
        flex
        h-full
        p-2
        pr-0
        gap-x-2
        ${player.activeId && `h-[calc(100%-7%)]`}
      `}
    >
      {/* Sidebar */}
      <div
        className={`
          flex
          flex-col
          ${isCollapse ? "w-[77px]" : "w-[300px] lg:w-[350px] hidden md:flex"}
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
              px-4
              gap-y-4
            `}
          >
            {routes.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </div>
        </Box>

        {/* Library */}

        <Box className="h-full p-2 overflow-y-auto">
          <div
            className="
              flex
              flex-col
              gap-y-4
            "
          >
            <Library songsByUserId={songsByUserId} />
          </div>
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
