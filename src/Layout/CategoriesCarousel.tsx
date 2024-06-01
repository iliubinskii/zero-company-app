"use client";

import type { ExistingCategory, MultipleDocsResponse } from "../schema";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AnimatedLink } from "../components";
import React from "react";

export const CategoriesCarousel: React.FC<Props> = ({ categories }) => {
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const containerRef = React.useRef<HTMLUListElement>(null);
  const [leftButtonVisible, setLeftButtonVisible] = React.useState(false);
  const [rightButtonVisible, setRightButtonVisible] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    const checkOverflow = (): void => {
      if (container) {
        const hasOverflow = container.scrollWidth > container.clientWidth;
        setIsOverflowing(hasOverflow);
        setRightButtonVisible(hasOverflow);
      }
    };
    const handleScroll = (): void => {
      if (container) {
        const scrollPosition = container.scrollLeft;
        setLeftButtonVisible(() => scrollPosition !== 0);
        setRightButtonVisible(
          () => scrollPosition !== container.scrollWidth - container.clientWidth
        );
      }
    };
    checkOverflow();
    container?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollLeft = (): void => {
    if (containerRef.current)
      containerRef.current.scrollBy({ behavior: "smooth", left: -200 });
  };

  const scrollRight = (): void => {
    if (containerRef.current)
      containerRef.current.scrollBy({ behavior: "smooth", left: 200 });
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-center items-center">
        <button
          className={
            isOverflowing && leftButtonVisible
              ? "w-10 bg-white flex items-center justify-center"
              : "w-10 invisible"
          }
          onClick={scrollLeft}
        >
          <IoIosArrowBack className="text-xl hover:text-blue-600" />
        </button>

        <ul
          className={`flex gap-4 whitespace-nowrap w-full overflow-x-auto scrollbar-hide font-medium ${isOverflowing ? "justify-start" : "justify-center"}`}
          ref={containerRef}
        >
          {categories.docs.map(category => (
            <li key={category._id}>
              <AnimatedLink href={`/categories/${category._id}`}>
                {category.name}
              </AnimatedLink>
            </li>
          ))}
        </ul>
        <button
          className={
            isOverflowing && rightButtonVisible
              ? "w-10 bg-white flex items-center justify-center"
              : "w-10 invisible"
          }
          onClick={scrollRight}
        >
          <IoIosArrowForward className="text-xl hover:text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export interface Props {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}
