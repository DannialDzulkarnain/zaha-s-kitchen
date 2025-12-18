import { useEffect, useState } from 'react';

function readFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch (error) {
    console.warn(`Failed to read ${key} from storage`, error);
    return fallback;
  }
}

export function usePersistentState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => readFromStorage<T>(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Failed to persist ${key}`, error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
