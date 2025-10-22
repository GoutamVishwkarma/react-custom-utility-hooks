import { useState, useRef, useEffect } from 'react';

// Throttle a value: only update it once every `delay` ms
export function useThrottle(value, delay) {
  const [throttled, setThrottled] = useState(value);
  const track = useRef(true);

  useEffect(() => {
    if (track.current) {
      setThrottled(value);
      track.current = false;

      const timer = setTimeout(() => {
        track.current = true;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return throttled;
}
