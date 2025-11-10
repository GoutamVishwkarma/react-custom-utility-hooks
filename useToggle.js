import { useState, useCallback } from "react";

/**
 * A simple toggle hook to manage boolean state.
 *
 * @param {boolean} [initialValue=false] - Initial boolean value.
 * @returns {[boolean, Function]} - Current state and toggle function.
 *
 * @example
 * const [isOpen, toggleIsOpen] = useToggle();
 * const [isDark, toggleTheme] = useToggle(true);
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}
