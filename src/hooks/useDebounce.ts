import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<F extends (...args: any[]) => void>(
  functionToDebounce: F,
  delay: number,
): (...args: Parameters<F>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        functionToDebounce(...args);
      }, delay);
    },
    [functionToDebounce, delay],
  );

  return debouncedFunction;
}
