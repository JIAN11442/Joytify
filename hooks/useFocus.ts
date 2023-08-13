import { useEffect, useState, RefObject } from "react";

const useFocus = <T extends HTMLElement>(
  refs: RefObject<T>[] | RefObject<T>
) => {
  const [isFocus, setFocus] = useState(false);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (Array.isArray(refs)) {
        const unfocus = refs.every((ref) => {
          return !ref.current?.contains(event.target);
        });

        if (unfocus) {
          setFocus(false);
        } else {
          setFocus(true);
        }
      } else {
        if (!refs.current?.contains(event.target)) {
          setFocus(false);
        } else {
          setFocus(true);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // console.log(isFocus);
  return isFocus;
};

export default useFocus;
