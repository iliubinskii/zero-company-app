"use client";

import React from "react";
import { noop } from "lodash";
import { useAppLoading } from "../contexts";
import { useRouter } from "next/navigation";

export const AnimatedLink: React.FC<Props> = ({
  href,
  onBeforeClick = noop,
  ...props
}) => {
  const router = useRouter();

  const { setLoading } = useAppLoading();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    onBeforeClick();
    setLoading();
    router.push(href);
  };

  return (
    <a
      className="relative inline-block"
      href={href}
      onClick={handleClick}
      {...props}
    />
  );
};

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly href: string;
  readonly onBeforeClick?: () => void;
}
