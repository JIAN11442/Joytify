import { useEffect, useState, RefObject } from "react";

const useFocus = <T extends HTMLElement>(
  refs: RefObject<T>[] | RefObject<T> | null
) => {
  const [isFocus, setFocus] = useState(false);
  const [isSwitch, setSwitch] = useState(false);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (Array.isArray(refs)) {
        // 只要有點擊refs中的其中一個ref就算focus, return true
        // 反之, 如果都沒點擊到，那就return false
        const focus = !refs.every(
          (ref) => !ref.current?.contains(event.target)
        );
        // 判斷searchBar當前有沒有被點擊
        const searchBarFocus = refs[1].current?.contains(event.target);

        if (!focus) {
          setFocus(false);
          setSwitch(false);
        } else {
          setFocus(true);
          // 特殊情況：當點擊searchBar時, isSwitch不要切換為!isSwitch, 維持當下isSwitch
          // 所以這裡設定只有當searchBarFocus為false時， 才需要setSwitch(!switch)
          if (!searchBarFocus) {
            setSwitch(!isSwitch);
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, isSwitch]);

  return [isFocus, isSwitch];
};

export default useFocus;
