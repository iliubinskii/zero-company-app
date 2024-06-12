import type { FC, HTMLAttributes } from "react";
import React from "react";

export const ZeroCoin: FC<HTMLAttributes<HTMLSpanElement>> = props => (
  <span {...props}>$</span>
);
