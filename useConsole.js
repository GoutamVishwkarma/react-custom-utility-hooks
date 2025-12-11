import { useMemo } from 'react';

// Console wrapper for dev mode - automatically disabled in production
// Add REACT_APP_ENABLE_CONSOLE=false to .env to turn off logs
const useConsole = (prefix = '') => {
  const enabled = 
    process.env.NODE_ENV === 'development' && 
    process.env.REACT_APP_ENABLE_CONSOLE !== 'false';

  return useMemo(() => {
    // Return empty functions if disabled
    if (!enabled) {
      const noop = () => {};
      return { log: noop, warn: noop, error: noop, table: noop, group: noop, groupEnd: noop };
    }

    // Add prefix to messages if provided
    const p = prefix ? `[${prefix}]` : '';

    return {
      // Standard console methods with prefix support
      log: (...args) => console.log(p, ...args),
      warn: (...args) => console.warn(p, ...args),
      error: (...args) => console.error(p, ...args),
      
      // Table doesn't support prefix in args, so we log it separately
      table: (data, cols) => {
        if (p) console.log(p, 'Table:');
        console.table(data, cols);
      },
      
      // Group labels get prefix prepended
      group: (label) => console.group(p ? `${p} ${label}` : label),
      groupEnd: () => console.groupEnd()
    };
  }, [prefix, enabled]);
};

export default useConsole;

// Usage:
// const log = useConsole('UserCard');
// log.log('clicked', data);
// log.warn('missing prop');
// log.table(users);
// 
// log.group('API Call');
// log.log('fetching...');
// log.groupEnd();
