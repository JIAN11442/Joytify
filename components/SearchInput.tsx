"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value, 300);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debounceValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
        bg-gray-100/20
        placeholder:text-gray-400
        focus:placeholder:text-transparent
    "
      placeholder="What do you want to listen to ?"
    />
  );
};

export default SearchInput;
