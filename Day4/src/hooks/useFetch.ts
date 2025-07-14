import { useState, useEffect } from 'react';

// Types for the fetch hook
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string | FormData | URLSearchParams;
}

/**
 * Custom hook for generic data fetching with loading/error states
 * @param url - API endpoint URL
 * @param options - fetch options (method, headers, body)
 * @returns object with data, loading, error states and refetch function
 */
export function useFetch<T = unknown>(
  url: string | null,
  options?: FetchOptions
): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    if (!url) return;

    setState((prev: FetchState<T>) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: options?.body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: T = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState((prev: FetchState<T>) => ({ ...prev, loading: false, error: errorMessage }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, options?.method, options?.headers, options?.body]);

  const refetch = () => {
    fetchData();
  };

  return {
    ...state,
    refetch,
  };
}
