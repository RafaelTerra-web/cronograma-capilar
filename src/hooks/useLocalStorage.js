import { useCallback, useEffect, useRef, useState } from "react";

function readStorageValue(key, initialValue) {
  if (typeof window === "undefined") {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch {
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const initialValueRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState(() =>
    readStorageValue(key, initialValueRef.current)
  );

  useEffect(() => {
    setStoredValue(readStorageValue(key, initialValueRef.current));
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Storage may be unavailable in private mode; the app still works in memory.
    }
  }, [key, storedValue]);

  const setValue = useCallback((value) => {
    setStoredValue((current) => (typeof value === "function" ? value(current) : value));
  }, []);

  return [storedValue, setValue];
}
