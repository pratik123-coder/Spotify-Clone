import { useEffect, useState } from "react";

function useDebounce<T>(value: T,delay?: number): T {
  const [debouncedValue, setDeouncedValue] = useState<T>(value)

  useEffect (() => {
    const timer = setTimeout(() => {
      setDeouncedValue(value)
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value,delay]);

  return debouncedValue;
}

export default useDebounce;