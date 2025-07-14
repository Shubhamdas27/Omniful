import { useRef, useEffect } from 'react';

/**
 * Custom hook to track the previous value of any state
 * @param value - current value to track
 * @returns previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}
