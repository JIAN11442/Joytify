"use client";

import { twMerge } from "tailwind-merge";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
  className?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
}

const Loading: React.FC<LoadingProps> = ({ className, title, description }) => {
  return (
    <div
      className={twMerge(
        `
        fixed
        bg-neutral-800/90
        inset-0
    `,
        className
      )}
    >
      <div
        className="
          fixed
          top-[50%]
          left-[50%]
          translate-x-[-50%]
          translate-y-[-50%]
          flex
          flex-col
          gap-y-4
          items-center
          jusitfy-center
      "
      >
        <ClipLoader size={50} color="#22c55e" />
        <div className={`text-center text-[#22c55e] text-opacity-80`}>
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
