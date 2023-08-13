import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `
        w-full
        h-fit
        rounded-lg
        bg-neutral-900
      `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
