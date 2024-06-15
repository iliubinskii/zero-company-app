"use client";

import type { ComponentProps, FC, MouseEventHandler } from "react";
import Link from "next/link";
import React from "react";
import { noop } from "lodash";
import { useAppLoading } from "../contexts";

export const AnimatedLink: FC<ComponentProps<typeof Link>> = ({
  onClick = noop,
  ...props
}) => {
  const { setLoading } = useAppLoading();

  const clickHandler: MouseEventHandler<HTMLAnchorElement> = () => {
    onClick();
    setLoading();
  };

  return (
    <Link className="relative inline-block" onClick={clickHandler} {...props} />
  );
};
