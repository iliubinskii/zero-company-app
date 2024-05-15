import React from "react";

export const ArticleLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div
    className={`mx-auto max-w-screen-md p-9 flex flex-col gap-6 ${className}`.trim()}
    {...props}
  />
);
