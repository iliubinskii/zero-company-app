import type { ComponentProps, FC } from "react";
import { AnimatedLink } from "../AnimatedLink";
import type { IconType } from "react-icons";
import React from "react";

export const DarkIconButton: FC<Props> = ({
  Icon,
  className = "",
  ...props
}) => (
  <AnimatedLink className={`dark-icon-button ${className}`.trim()} {...props}>
    <Icon className="text-xl" />
  </AnimatedLink>
);

export interface Props extends ComponentProps<typeof AnimatedLink> {
  readonly Icon: IconType;
}
