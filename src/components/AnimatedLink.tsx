"use client";

import React from "react";
import { useAppLoading } from "../contexts";
import { useRouter } from "next/navigation";

export const AnimatedLink: React.FC<Props> = ({ href, ...props }) => {
  const router = useRouter();

  const { setLoading } = useAppLoading();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    router.push(href);
    setLoading();
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
}
