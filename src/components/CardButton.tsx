import type { FC, HTMLAttributes } from "react";
import React from "react";

export const CardButton: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    className="text-gray-700 text-sm py-1 px-2 rounded-2xl border border-gray-300 hover:border-gray-800 transition-colors duration-150"
    type="button"
    {...props}
  >
    {children}
  </button>
);
