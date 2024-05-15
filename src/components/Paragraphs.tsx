import React from "react";

export const Paragraphs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => (
  <div
    className={`flex flex-col gap-3 text-justify ${className}`.trim()}
    {...props}
  />
);
