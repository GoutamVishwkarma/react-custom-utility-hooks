import { useState, useEffect } from 'react';

// Sync state with localStorage
export function useLocalStorage(key, initialValue) {
  // Get value from localStorage or use initial value
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (e) {
      console.warn(`Failed to read "${key}" from localStorage`);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to save "${key}" to localStorage`);
    }
  }, [key, value]);

  return [value, setValue];
}
