import React from "react";

export const Header2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  const combinedClassName = `text-xl text-gray-500 ${className}`.trim();

  return <h2 className={combinedClassName} {...props} />;
};
