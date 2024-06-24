"use client";

import { useEffect } from "react";

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
