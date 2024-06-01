"use client";

import type { ExistingCategory, MultipleDocsResponse } from "../schema";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatedLink } from "../components";
import React, { useCallback } from "react";
import tw from "tailwind-styled-components";

export const CategoriesCarousel: React.FC<Props> = ({ categories }) => {
  const containerRef = React.useRef<HTMLUListElement>(null);

  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const [leftButtonVisible, setLeftButtonVisible] = React.useState(false);

  const [rightButtonVisible, setRightButtonVisible] = React.useState(false);

  const updateState = useCallback((): void => {
    const container = containerRef.current;

    if (container) {
      const { clientWidth, scrollLeft, scrollWidth } = container;

      setIsOverflowing(scrollWidth > clientWidth);
      setLeftButtonVisible(scrollWidth > clientWidth && scrollLeft > 0);
      setRightButtonVisible(
        // Added an extra pixel because `scrollWidth` does not precisely reach `scrollWidth - clientWidth` in Chrome.
        scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 1
      );
    }
  }, []);

  const scrollLeft = (): void => {
    containerRef.current?.scrollBy({ behavior: "smooth", left: -200 });
  };

  const scrollRight = (): void => {
    containerRef.current?.scrollBy({ behavior: "smooth", left: 200 });
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
      <Button
        className={leftButtonVisible ? undefined : "invisible"}
        onClick={scrollLeft}
      >
        <LeftArrowIcon />
      </Button>
      <List
        className={isOverflowing ? "justify-start" : "justify-center"}
        ref={containerRef}
      >
        {categories.docs.map(category => (
          <li key={category._id}>
            <AnimatedLink href={`/categories/${category._id}`}>
              {category.name}
            </AnimatedLink>
          </li>
        ))}
      </List>
      <Button
        className={rightButtonVisible ? undefined : "invisible"}
        onClick={scrollRight}
      >
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

const List = tw.ul`grow flex gap-4 whitespace-nowrap overflow-x-auto scrollbar-hide font-medium`;
