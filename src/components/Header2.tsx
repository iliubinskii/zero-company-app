import React from "react";

export const Header2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h2 className={`text-xl text-gray-500 ${className}`.trim()} {...props} />;
