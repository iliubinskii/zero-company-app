import React from "react";

export const CheckboxRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const combinedClassName = `flex items-center gap-3 ${className}`.trim();

  return <div className={combinedClassName} {...props} />;
};
