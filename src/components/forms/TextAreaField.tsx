import React from "react";

export const TextAreaField: React.FC<
  React.InputHTMLAttributes<HTMLTextAreaElement>
> = ({ className = "", ...props }) => (
  <textarea
    className={`border border-gray-300 rounded-md p-2 ${className}`.trim()}
    {...props}
  />
);
