"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
/* eslint-disable spellcheck/spell-checker -- Ok */
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
