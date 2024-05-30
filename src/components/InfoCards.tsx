import type { FC, HTMLAttributes } from "react";
import React from "react";

export const InfoCards: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`grid grid-cols-3 gap-4 ${className}`.trim()} {...props} />
);
