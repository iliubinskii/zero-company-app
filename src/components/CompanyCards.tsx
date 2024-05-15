import React from "react";

export const CompanyCards: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div className={`grid grid-cols-3 gap-4 ${className}`.trim()} {...props} />
);
