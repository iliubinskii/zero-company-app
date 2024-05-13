import React from "react";

export const ContentPage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`mx-auto max-w-screen-md flex flex-col gap-6 ${className}`.trim()}
    {...props}
  />
);
