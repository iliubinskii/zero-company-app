"use client";

import type { AnchorHTMLAttributes, FC } from "react";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import React from "react";
import tw from "tailwind-styled-components";

export const BackButton: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <Link {...props}>
    <HiMiniArrowLongLeft />
    {children}
  </Link>
);

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly onBeforeClick?: (() => void) | undefined;
}

const Link = tw.a`flex items-center gap-1 cursor-pointer`;
