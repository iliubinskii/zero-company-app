"use client";

import type { FC, ReactNode } from "react";
import { BREAKPOINT } from "../consts";
import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

export const ExpandableCard: FC<Props> = ({ children, expandable }) => {
  const [contentsHeight, setContentsHeight] = useState(0);

  const contentsRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (contentsRef.current)
      setContentsHeight(contentsRef.current.scrollHeight);
  }, [expandable, isHovering]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (window.innerWidth >= BREAKPOINT.md) setIsHovering(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= BREAKPOINT.md) setIsHovering(false);
      }}
    >
      <div ref={contentsRef}>{children}</div>
      <Hoverable
        className={isHovering ? "opacity-100 pointer-events-auto" : undefined}
      >
        <Background className={isHovering ? "scale-100" : undefined} />
        <div className="relative" style={{ height: `${contentsHeight}px` }}>
          {children}
        </div>
        <div className="relative">{expandable}</div>
      </Hoverable>
    </div>
  );
};

export interface Props {
  readonly children?: ReactNode | undefined;
  readonly expandable?: ReactNode | undefined;
}

const Hoverable = tw.div`
  z-10 absolute -left-4 -right-4 -top-4
  px-4 pt-4 pb-6
  opacity-0 pointer-events-none
  transition-all duration-150
`;

const Background = tw.div`
  absolute inset-0
  rounded-xl border border-gray-300 shadow-lg
  bg-white
  transform scale-95
  transition-all duration-300
`;
