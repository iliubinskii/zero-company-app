import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../AnimatedLink";
import type { IconType } from "react-icons";
import React from "react";

export const PrimaryIconButton: FC<Props> = ({ Icon, ...props }) => (
  <AnimatedLink
    className="
      border border-blue-700 rounded-lg p-2.5
      text-sm text-blue-700 text-center font-medium
      inline-flex items-center
      hover:bg-blue-700 hover:text-white
    "
    {...props}
  >
    <Icon className="text-xl" />
  </AnimatedLink>
);

export interface Props extends ComponentProps<typeof AnimatedLink> {
  readonly Icon: IconType;
}
