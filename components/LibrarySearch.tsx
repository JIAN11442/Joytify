import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";

import Input from "./Input";
import useFocus from "@/hooks/useFocus";
import useSearchInputValue from "@/hooks/useSearchInputValue";

const LibrarySearch = () => {
  const { searchInputValue, setSearchInputValue } = useSearchInputValue();
  const searchIconRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [isFocus, isSwitch] = useFocus([searchIconRef, searchBarRef]);
  const [inputFocus, setInputFocus] = useState(false);

  const fadeInAnimation = useSpring({
    from: {
      opacity: 0,
      width: "0%",
    },
    to: {
      opacity: inputFocus ? 1 : 0,
      width: inputFocus ? "100%" : "0%",
    },
    config: { duration: 300 },
  });

  useEffect(() => {
    if (isFocus) {
      if (isSwitch) {
        setInputFocus(true);
      } else {
        setInputFocus(false);
      }
    } else {
      setInputFocus(false);
    }
  }, [isFocus, isSwitch]);

  return (
    <div
      className="
        flex
        w-full
        items-center
        relative
    "
    >
      {/* Search Icon */}
      <div
        ref={searchIconRef}
        className={`
          absolute
          z-40
          flex
          p-2
          items-center
          text-neutral-500
          hover:bg-neutral-700/60
          hover:text-white
          ${inputFocus ? "hover:bg-transparent " : "rounded-full"}
          transition
          cursor-pointer
        `}
      >
        <FiSearch size={20} />
      </div>

      {/* Search Bar */}
      <animated.div
        ref={searchBarRef}
        className={`
          flex
          w-full
        `}
        style={fadeInAnimation}
      >
        <Input
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          placeholder={`${inputFocus ? "Search in your library" : ""}`}
          className={`
            py-2
            ${inputFocus ? "pl-10" : ""}
            bg-neutral-700/60
            text-md
            focus:placeholder:text-transparent
          `}
        />
      </animated.div>
    </div>
  );
};

export default LibrarySearch;
