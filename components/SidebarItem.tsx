import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  isCollapse: boolean;
  setIsCollapse: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  isCollapse,
  setIsCollapse,
}) => {
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
      <Icon size={30} />
      {!isCollapse && <p className="truncate font-bold text-lg">{label}</p>}
    </Link>
  );
};

export default SidebarItem;
