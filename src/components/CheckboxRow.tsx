import React from "react";

export const CheckboxRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={`flex items-center gap-3 ${className}`.trim()} {...props} />
);
