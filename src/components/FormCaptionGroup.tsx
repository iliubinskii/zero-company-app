import React from "react";

export const FormCaptionGroup: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={`flex flex-col gap-1 ${className}`.trim()} {...props} />
);
