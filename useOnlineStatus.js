import { useState, useEffect } from 'react';

/**
 * useOnlineStatus Hook
 * 
 * Tracks the user's online/offline status.
 * Returns true when online, false when offline.
 * 
 * @returns {boolean} isOnline - Current online status
 * 
 * @example
 * function NetworkStatus() {
 *   const isOnline = useOnlineStatus();
 * 
 *   return (
 *     <div>
 *       <p>Status: {isOnline ? '🟢 Online' : '🔴 Offline'}</p>
 *       {!isOnline && <p>Please check your internet connection</p>}
 *     </div>
 *   );
 * }
 */

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
