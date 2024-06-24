"use client";

import { useEffect } from "react";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO Add proper JSDoc, use CoPilot
/**
 *
 * @param handler is a function
 */
export function useEscapePress(handler: () => void): void {
  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent): void => {
      if (event.key === "Escape") handler();
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => {
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [handler]);
}
