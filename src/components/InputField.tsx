import React from "react";

export const InputField: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className, ...props }) => {
  const combinedClassName =
    `border border-gray-300 rounded-md p-2 ${className}`.trim();

  return <input className={combinedClassName} {...props} />;
};
