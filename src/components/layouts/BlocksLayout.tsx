import React from "react";

export const BlocksLayout: React.FC<Props> = ({
  className,
  wide = false,
  ...props
}) => {
  const className2 = wide ? "max-w-screen-lg" : "max-w-screen-md";

  return (
    <div
      className={`mx-auto p-9 flex flex-col gap-9 ${className} ${className2}`.trim()}
      {...props}
    />
  );
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly wide?: boolean;
}
