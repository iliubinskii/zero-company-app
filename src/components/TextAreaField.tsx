import React from "react";

export const TextAreaField: React.FC<
  React.InputHTMLAttributes<HTMLTextAreaElement>
> = ({ className, ...props }) => {
  const combinedClassName =
    `border border-gray-300 rounded-md p-2 ${className}`.trim();

  return <textarea className={combinedClassName} {...props} />;
};
