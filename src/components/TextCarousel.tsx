"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { CAROUSEL_SCROLL_STEP } from "../consts";
import React, { useCallback, useMemo } from "react";
import tw from "tailwind-styled-components";

export const TextCarousel: React.FC<Props> = ({ children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [leftButtonVisible, setLeftButtonVisible] = React.useState<boolean>();

  const [rightButtonVisible, setRightButtonVisible] = React.useState<boolean>();

  const leftButtonClassName = useMemo(() => {
    if (leftButtonVisible === undefined) return "invisible";

    return leftButtonVisible ? "" : "invisible";
  }, [leftButtonVisible]);

  const rightButtonClassName = useMemo(() => {
    if (rightButtonVisible === undefined) return "md:invisible";

    return rightButtonVisible ? "" : "invisible";
  }, [rightButtonVisible]);

  const updateState = useCallback((): void => {
    const container = containerRef.current;

    if (container) {
      const { clientWidth, scrollLeft, scrollWidth } = container;

      const isOverflow = scrollWidth > clientWidth;
      setLeftButtonVisible(isOverflow && scrollLeft > 0);
      setRightButtonVisible(
        // Added an extra pixel because `scrollWidth` does not precisely reach `scrollWidth - clientWidth` in Chrome.
        isOverflow && scrollLeft < scrollWidth - clientWidth - 1
      );
    }
  }, []);

  const scrollLeft = (): void => {
    containerRef.current?.scrollBy({
      behavior: "smooth",
      left: -CAROUSEL_SCROLL_STEP
    });
  };

  const scrollRight = (): void => {
    containerRef.current?.scrollBy({
      behavior: "smooth",
      left: CAROUSEL_SCROLL_STEP
    });
  };

  React.useEffect(() => {
    updateState();

    const container = containerRef.current;

    window.addEventListener("resize", updateState);
    container?.addEventListener("scroll", updateState);

    return () => {
      window.removeEventListener("resize", updateState);
      container?.removeEventListener("scroll", updateState);
    };
  }, [updateState]);

  return (
    <Container>
      <Button className={leftButtonClassName} onClick={scrollLeft}>
        <LeftArrowIcon />
      </Button>
      <List ref={containerRef}>{children}</List>
      <Button className={rightButtonClassName} onClick={scrollRight}>
        <RightArrowIcon />
      </Button>
    </Container>
  );
};

export interface Props {
  readonly children: React.ReactNode;
}

const Container = tw.div`flex justify-center items-center`;

const Button = tw.button`w-10 flex items-center justify-center bg-white`;

const LeftArrowIcon = tw(IoIosArrowBack)`text-xl hover:text-blue-600`;

const RightArrowIcon = tw(IoIosArrowForward)`text-xl hover:text-blue-600`;

const List = tw.div`overflow-x-auto scrollbar-hide`;
