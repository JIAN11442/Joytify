"use client";

import queryString from "query-string";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";
import useFocus from "@/hooks/useFocus";

interface SearchInputProps {
  className?: string;
  searchParams?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  searchParams,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debounceValue = useDebounce(inputValue, 300);
  const pathName = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputFocus = useFocus(inputRef);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };

    const url = queryString.stringifyUrl({
      url: pathName,
      query: query,
    });

    router.push(url);
  }, [debounceValue]);

  return (
    <Input
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="What do you want to listen to ?"
      className={twMerge(
        `
        bg-neutral-300/5
        placeholder:text-neutral-300/50
        ${inputFocus ? "placeholder:text-transparent" : ""}
        transition
      `,
        className
      )}
    />
  );
};

export default SearchInput;
