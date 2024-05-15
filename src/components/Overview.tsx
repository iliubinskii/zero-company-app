import React from "react";

export const Overview: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => <div className={`flex flex-col gap-4 ${className}`.trim()} {...props} />;
