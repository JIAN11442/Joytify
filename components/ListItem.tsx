"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4
        "
    >
      {/* Image */}
      <div className="relative min-h-[56px] min-w-[56px]">
        <Image fill src={image} className="object-cover" alt="Image" />
      </div>
      {/* Name */}
      <p className="font-medium truncate">{name}</p>
      {/* FaPlay Icon */}
      <div
        className="
        absolute
        right-5
        p-3
        flex
        items-center
        justify-center
        rounded-full
        bg-green-500
        drop-shadow-md
        hover:scale-105
        transition
        opacity-0
        group-hover:opacity-100
      "
      >
        <FaPlay color="black" />
      </div>
    </button>
  );
};

export default ListItem;
