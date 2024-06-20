import type { FC, ReactNode } from "react";
import React from "react";

export const ScrollView: FC<Props> = ({ children }) => {
  ("");

  return <>{children}</>;
};

export interface Props {
  readonly children?: ReactNode | undefined;
  /**
   * Fetches more data.
   * @returns A promise that resolves to a boolean value indicating whether more data is available.
   */
  readonly fetchMoreData: () => Promise<boolean>;
}
