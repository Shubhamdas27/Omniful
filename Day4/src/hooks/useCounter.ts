import { useState } from 'react';

interface CounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Custom hook for counter with increment/decrement/reset functionality
 * @param initialValue - initial counter value
 * @param options - optional min, max, and step values
 * @returns object with count, increment, decrement, reset functions
 */
export function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
) {
  const { min, max, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev: number) => {
      const newValue = prev + step;
      return max !== undefined ? Math.min(newValue, max) : newValue;
    });
  };

  const decrement = () => {
    setCount((prev: number) => {
      const newValue = prev - step;
      return min !== undefined ? Math.max(newValue, min) : newValue;
    });
  };

  const reset = () => {
    setCount(initialValue);
  };

  const setValue = (value: number) => {
    let newValue = value;
    
    if (min !== undefined) {
      newValue = Math.max(newValue, min);
    }
    
    if (max !== undefined) {
      newValue = Math.min(newValue, max);
    }
    
    setCount(newValue);
  };

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };
}
