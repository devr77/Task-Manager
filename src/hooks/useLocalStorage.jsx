import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Failed to parse localStorage", error);
      localStorage.removeItem(key); // clear corrupted value
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Failed to set localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
