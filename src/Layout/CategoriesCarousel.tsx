"use client";

import type { ExistingCategory, MultipleDocsResponse } from "../schema";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatedLink } from "../components";
import { CAROUSEL_SCROLL_STEP } from "../consts";
import React, { useCallback, useMemo } from "react";
import tw from "tailwind-styled-components";

export const CategoriesCarousel: React.FC<Props> = ({ categories }) => {
  const containerRef = React.useRef<HTMLUListElement>(null);

  const [leftButtonVisible, setLeftButtonVisible] = React.useState<boolean>();

  const [rightButtonVisible, setRightButtonVisible] = React.useState<boolean>();

  const leftButtonClassName = useMemo(() => {
    if (leftButtonVisible === undefined) return "invisible";

    return leftButtonVisible ? "" : "invisible";
  }, [leftButtonVisible]);

  const rightButtonClassName = useMemo(() => {
    if (rightButtonVisible === undefined) return "sm:invisible";

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
      <List ref={containerRef}>
        {categories.docs.map(category => (
          <li key={category._id}>
            <AnimatedLink href={`/categories/${category._id}`}>
              {category.name}
            </AnimatedLink>
          </li>
        ))}
      </List>
      <Button className={rightButtonClassName} onClick={scrollRight}>
        <RightArrowIcon />
      </Button>
    </Container>
  );
};

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}

const Container = tw.div`flex justify-center items-center`;

const Button = tw.button`w-10 flex items-center justify-center bg-white`;

const LeftArrowIcon = tw(IoIosArrowBack)`text-xl hover:text-blue-600`;

const RightArrowIcon = tw(IoIosArrowForward)`text-xl hover:text-blue-600`;

const List = tw.ul`mx-auto flex gap-4 whitespace-nowrap overflow-x-auto scrollbar-hide font-medium`;
