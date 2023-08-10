import { useEffect, useState } from "react";

function useDebounce(value: string, delay?: number) {
  const [debouceValue, setDebouceValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouceValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouceValue;
}

export default useDebounce;
