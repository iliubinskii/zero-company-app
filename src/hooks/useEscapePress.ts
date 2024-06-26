"use client";

import { useEffect } from "react";

/**
 * Custom hook that adds an event listener for the "Escape" key press.
 * When the "Escape" key is pressed, the provided handler function is called.
 * @param handler - A function to be called when the "Escape" key is pressed.
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
