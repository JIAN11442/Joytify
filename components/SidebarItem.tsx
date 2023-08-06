import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import useCollapse from "@/hooks/useCollapse";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const { isCollapse, setIsCollapse } = useCollapse();

  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        flex-row
        text-neutral-400
        hover:text-white
        transition
        w-full
        h-auto
        text-md
        font-medium
        cursor-pointer
        gap-x-4
        items-center
      `,
        active ? "text-white" : ""
      )}
    >
      <div>
        <Icon size={30} />
      </div>
      {!isCollapse && <p className="truncate font-bold text-lg">{label}</p>}
    </Link>
  );
};

export default SidebarItem;
