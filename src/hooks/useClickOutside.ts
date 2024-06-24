"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: Add exclusion in .eslintrc.cjs instead
/* eslint-disable spellcheck/spell-checker -- Ok */

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO Add proper JSDoc, use CoPilot, use hyphens on @param lines
/**
 *
 * @param refs array of refs
 * @param handler function
 */
export function useClickOutside(
  refs: RefObject<HTMLElement>[],
  handler: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const isOutside = refs.every(ref => {
        // eslint-disable-next-line no-warning-comments -- Assigned
        // TODO: Use ternary operator
        if (ref.current && event.target instanceof Node)
          return !ref.current.contains(event.target);

        return true;
      });

      if (isOutside) handler();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
}
