import React from "react";

export const InputField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, ...props }) => (
  <input
    className={`border border-gray-300 rounded-md p-2 ${className}`.trim()}
    {...props}
  />
);
