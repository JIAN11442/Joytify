import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, type, className, ...props }, ref) => {
    return (
      <input
        className={twMerge(
          `
            flex
            w-full
            bg-neutral-700
            border
            border-transparent
            p-3
            rounded-md
            placeholder:text-neutral-500
            ${type === "file" ? "text-neutral-500" : ""}
            focus:outline-none
            file:bg-transparent
            file:hidden
            file:border-transparent
            file:text-neutral-500
        `,
          className
        )}
        disabled={disabled}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
