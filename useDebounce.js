import { useEffect, useState } from "react";

/**
 * Custom hook: useDebounce
 * 
 * A simple and reusable hook that helps delay updating a value
 * until after a certain delay (default: 300ms). Useful for
 * optimizing input handling, API calls, or search filters.
 * 
 * You can use it in two ways:
 *  1️⃣ With internal state (just use what it returns directly)
 *  2️⃣ With external state (pass your own value)
 * 
 * Returns an array:
 * [inputVal, setInputVal, debouncedVal]
 * 
 * inputVal      → Current value (for internal use)
 * setInputVal   → Setter for the value
 * debouncedVal  → Value updated after the delay
 */

const useDebounce = (externalValue = null, delay = 300) => {
  const [inputVal, setInputVal] = useState("");
  const [debouncedVal, setDebouncedVal] = useState("");

  // Use the external value if provided, otherwise fall back to internal state
  const valueToWatch = externalValue !== null ? externalValue : inputVal;

  useEffect(() => {
    // Basic validation – makes sure delay is a positive number
    if (typeof delay !== "number" || delay < 0) {
      console.error("useDebounce: delay should be a positive number.");
      return;
    }

    // Timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedVal(valueToWatch);
    }, delay);

    // Clean up the timer if value changes or component unmounts
    return () => clearTimeout(timer);
  }, [valueToWatch, delay]);

  // Return internal states as array so user can choose to rename and how to handle input
  return [inputVal, setInputVal, debouncedVal];
};

export default useDebounce;
