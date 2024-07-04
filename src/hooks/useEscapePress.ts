"use client";

import { useCallback, useEffect } from "react";
import type { DependencyList } from "react";

/**
 * Custom hook that adds an event listener for the Escape key press.
 * @param handler - A function to be called when the Escape key is pressed.
 * @param deps - Dependencies of the hook.
 */
export function useEscapePress(
  handler: () => void,
  deps: DependencyList
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Ok
  const memorizedHandler = useCallback(handler, deps);

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent): void => {
      if (event.key === "Escape") memorizedHandler();
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [memorizedHandler]);
}
