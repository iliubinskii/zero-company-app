import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../AnimatedLink";
import type { IconType } from "react-icons";
import React from "react";

export const DarkIconButton: FC<Props> = ({ Icon, ...props }) => (
  <AnimatedLink
    className="
      border border-gray-500 rounded-lg p-2.5
      text-sm text-gray-500 text-center font-medium
      inline-flex items-center
      hover:bg-gray-700 hover:text-white
    "
    {...props}
  >
    <Icon className="text-xl" />
  </AnimatedLink>
);

export interface Props extends ComponentProps<typeof AnimatedLink> {
  readonly Icon: IconType;
}
