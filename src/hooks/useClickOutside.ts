"use client";

import type { DependencyList, RefObject } from "react";
import { useCallback, useEffect, useMemo } from "react";

/**
 * Custom hook that adds an event listener for clicks outside of the provided elements.
 * @param handler - A function to be called when a click outside of the provided elements is detected.
 * @param deps - Dependencies of the hook.
 * @param elements - An array of React refs to the elements that should be ignored.
 */
export function useClickOutside(
  handler: () => void,
  deps: DependencyList,
  elements: RefObject<HTMLElement>[]
): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Ok
  const memorizedElements = useMemo(() => elements, elements);

  // eslint-disable-next-line react-hooks/exhaustive-deps -- Ok
  const memorizedHandler = useCallback(handler, deps);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const { target } = event;

      const ignore =
        target instanceof Node &&
        memorizedElements.some(
          ({ current: element }) =>
            element && (target === element || element.contains(target))
        );

      if (!ignore) memorizedHandler();
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [memorizedElements, memorizedHandler]);
}
