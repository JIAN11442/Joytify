import useCollapse from "@/hooks/useCollapse";
import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const { isCollapse } = useCollapse();

  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex
        flex-row
        items-center
        gap-x-4
        text-neutral-400
        hover:text-white
        transition
        cursor-pointer
      `,
        active ? "text-white" : ""
      )}
    >
      {/* Icon */}
      <div>
        <Icon size={28} />
      </div>
      {/* Label */}
      <div className={`${isCollapse ? "hidden" : "flex"}`}>
        <p className="text-lg font-bold truncate">{label}</p>
      </div>
    </Link>
  );
};

export default SidebarItem;
