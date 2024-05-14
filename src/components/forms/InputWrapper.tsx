import React from "react";

export const InputWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`flex flex-col gap-1 ${className}`.trim()} {...props} />;
