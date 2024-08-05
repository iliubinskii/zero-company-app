"use client";

import { useCallback, useMemo, useState } from "react";
import type { DependencyList } from "react";
import { callAsync } from "../utils";

/**
 * Creates an sync callback from an async callback.
 * @param callback - The async callback.
 * @param deps - The dependencies of the async callback.
 * @returns The sync callback and the loading state.
 */
export function useAsyncCallback<T extends readonly unknown[]>(
  callback: (...args: T) => Promise<void>,
  deps: DependencyList
): AsyncCallbackResult<T> {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- Ok
  const memorizedCallback = useCallback(callback, deps);

  const sync = useCallback(
    (...args: T): void => {
      callAsync(async () => {
        setIsLoading(true);

        try {
          await memorizedCallback(...args);
        } finally {
          setIsLoading(false);
        }
      });
    },
    [memorizedCallback]
  );

  return useMemo(() => {
    return { callback: sync, isLoading };
  }, [isLoading, sync]);
}

interface AsyncCallbackResult<T extends readonly unknown[]> {
  readonly callback: (...args: T) => void;
  readonly isLoading: boolean;
}
