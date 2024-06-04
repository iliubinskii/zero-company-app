import type { FC, ReactNode } from "react";
import React from "react";

export const BlocksLayout: FC<Props> = ({ children, size = "md" }) => (
  <div className="flex justify-center">
    <div className={`grow max-w-screen-${size} p-9 flex flex-col gap-9`}>
      {children}
    </div>
  </div>
);

export interface Props {
  readonly children: ReactNode;
  readonly size?: "sm" | "lg" | "xl" | "2xl" | undefined;
}
