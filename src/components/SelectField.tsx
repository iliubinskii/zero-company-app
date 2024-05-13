import React from "react";

export const SelectField: React.FC<
  React.InputHTMLAttributes<HTMLSelectElement>
> = ({ className, ...props }) => (
  <select
    className={`border border-gray-300 rounded-md p-2 ${className}`.trim()}
    {...props}
  />
);
