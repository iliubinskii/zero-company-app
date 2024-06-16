"use client";

import type { AnchorHTMLAttributes, FC, MouseEventHandler } from "react";
import Link from "next/link";
import React from "react";
import { noop } from "lodash";
import { useAppLoading } from "../contexts";

export const AnimatedLink: FC<
  Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "children" | "className" | "href" | "onClick"
  >
> = ({ href, onClick = noop, ...props }) => {
  const { setLoading } = useAppLoading();

  const clickHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    onClick();

    if (typeof href === "string") setLoading();
  };

  return typeof href === "string" ? (
    <Link href={href} onClick={clickHandler} {...props} />
  ) : (
    <a href={href} onClick={clickHandler} {...props} />
  );
};
