import type { FC, HTMLAttributes } from "react";
import React from "react";

export const HeaderSimpleButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    className="text-white hover:text-gray-300 transition-colors duration-150 py-2 px-3 rounded-lg "
    type="button"
    {...props}
  >
    {children}
  </button>
);
