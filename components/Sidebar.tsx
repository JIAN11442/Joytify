"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
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
        className="
        hidden 
        md:flex
        bg-black
        h-full
        w-[300px]
        flex-col
        p-2
        gap-y-2
        "
      >
        <Box>
          <div className="flex flex-col py-4 px-5 gap-y-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      {/* Main Content */}
      <main className="h-full flex-1 overflow-y-auto py-2 px-2 md:pl-0 ">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
