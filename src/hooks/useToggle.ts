import { useState } from 'react';

/**
 * Custom hook for boolean state with toggle functionality
 * @param initialValue - initial boolean value (default: false)
 * @returns [value, toggle, setTrue, setFalse, setValue] tuple
 */
export function useToggle(
  initialValue: boolean = false
): [
  boolean,
  () => void,
  () => void,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev: boolean) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, toggle, setTrue, setFalse, setValue];
}
