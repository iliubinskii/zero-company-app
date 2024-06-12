"use client";

import type { AnchorHTMLAttributes, FC, MouseEventHandler } from "react";
import React from "react";
import { noop } from "lodash";
import { useAppLoading } from "../contexts";
import { useRouter } from "next/navigation";

export const AnimatedLink: FC<Props> = ({
  href,
  onBeforeClick = noop,
  ...props
}) => {
  const router = useRouter();

  const { setLoading } = useAppLoading();

  const onClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    onBeforeClick();
    setLoading();
    router.push(href);
  };

  return (
    <a
      className="relative inline-block"
      href={href}
      onClick={onClick}
      {...props}
    />
  );
};

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly onBeforeClick?: (() => void) | undefined;
}
