import { useState, useEffect, useCallback } from 'react';

/**
 *  hook to fetch data from an API endpoint.
 *
 * @param {string} url - The API endpoint to fetch from.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.autoFetch=true] - Whether to fetch on mount.
 * @returns {{
 *   data: any,
 *   isLoading: boolean,
 *   error: string | null,
 *   refetch: () => Promise<void>
 * }} An object containing data, loading state, error, and a refetch function.
 */
export const useFetch = (url, options = {}) => {
  const { autoFetch = true } = options;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) {
      setError('URL is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url.trim()); // Prevent accidental spaces

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  // Fetch on mount if autoFetch is enabled
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData, // Expose manual refetch
  };
};
