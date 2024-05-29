import React from "react";

export const BlocksLayout: React.FC<Props> = ({ children, size }) => (
  <div className="flex justify-center">
    <div className={`x grow max-w-screen-${size} p-9 flex flex-col gap-9`}>
      {children}
    </div>
  </div>
);

export interface Props {
  readonly children: React.ReactNode;
  readonly size: "sm" | "md" | "lg" | "xl" | "2xl";
}
