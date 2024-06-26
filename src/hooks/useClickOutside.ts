"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Custom hook that triggers a handler function when a click occurs outside
 * any of the provided refs.
 * @param refs - Array of refs to elements.
 * @param handler - Function to be called when a click outside the refs is detected.
 */
export function useClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const isOutside = refs.every(ref =>
        ref.current && event.target instanceof Node
          ? !ref.current.contains(event.target)
          : true
      );
      if (isOutside) handler();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
}
