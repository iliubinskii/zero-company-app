import React from "react";

export const FormCaptionGroup: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const combinedClassName = `flex flex-col gap-1 ${className}`.trim();

  return <div className={combinedClassName} {...props} />;
};
