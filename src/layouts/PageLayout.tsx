import type { FC, ReactNode } from "react";
import React from "react";

export const PageLayout: FC<Props> = ({ children, size = "md" }) => (
  <div className={`mx-auto max-w-screen-${size} p-9 flex flex-col gap-9`}>
    {children}
  </div>
);

export interface Props {
  children?: ReactNode | undefined;
  readonly size?: "sm" | "lg" | "xl" | "2xl" | undefined;
}
