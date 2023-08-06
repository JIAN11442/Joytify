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
import { document } from "postcss";

interface SidebarProps {
  children: React.ReactNode;
  songsByUserId: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songsByUserId }) => {
  const pathname = usePathname();
  const { isCollapse, setIsCollapse } = useCollapse();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`
          bg-black
          h-full
          ${isCollapse ? "w-[100px]" : "w-[300px]"}
          ${isCollapse ? "flex" : "hidden md:flex"}
          transition
          flex-col
          p-2
          gap-y-2
        `}
      >
        <Box className="h-auto p-2">
          <div
            className="
              flex
              flex-col
              py-4
              px-5
              gap-y-4
          "
          >
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box
          className="
            overflow-y-auto
            h-full
            p-2
        "
        >
          <div
            className="
              flex
              flex-col 
              py-4
              gap-y-4
          "
          >
            <Library songsByUserId={songsByUserId} />
          </div>
        </Box>
      </div>
      {/* Main Content */}
      <main
        className={`
          h-full
          flex-1
          overflow-y-auto
          py-2
          ${!isCollapse ? "pl-2 md:pl-0" : ""}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
