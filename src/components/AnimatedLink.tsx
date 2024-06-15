"use client";

import type { AnchorHTMLAttributes, FC, MouseEventHandler } from "react";
import React from "react";
import { noop } from "lodash";
import { useAppLoading } from "../contexts";
import { useRouter } from "next/navigation";

export const AnimatedLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  onClick = noop,
  ...props
}) => {
  const router = useRouter();

  const { setLoading } = useAppLoading();

  const clickHandler: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    onClick();

    if (typeof href === "string") {
      setLoading();
      router.push(href);
    }
  };

  return <a href={href} onClick={clickHandler} {...props} />;
};
