// 📁 src/hooks/useSessionStorage.js
import { useState, useEffect } from "react";

/**
 * useSessionStorage - Syncs state with sessionStorage
 
 * @param {string} key - The key to store the value under
 * @param {*} initialValue - The default value to use if key not found
 * @returns {[any, Function]} - [storedValue, setStoredValue]
 
 * Example:
 * const [user, setUser] = useSessionStorage("user", null);
 */
export default function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useSessionStorage error reading key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useSessionStorage error setting key “${key}”:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
