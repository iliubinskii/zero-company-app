import React from "react";

export const CheckboxField: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({ className, ...props }) => {
  const combinedClassName =
    `form-checkbox h-5 w-5 border-gray-300 rounded text-blue-500 ${className}`.trim();

  return <input className={combinedClassName} type="checkbox" {...props} />;
};
