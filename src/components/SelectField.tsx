import React from "react";

export const SelectField: React.FC<
  React.InputHTMLAttributes<HTMLSelectElement>
> = ({ className, ...props }) => {
  const combinedClassName =
    `border border-gray-300 rounded-md p-2 ${className}`.trim();

  return <select className={combinedClassName} {...props} />;
};
