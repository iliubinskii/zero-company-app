"use client";

import type { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../store";

export const ReduxStoreProvider: FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export interface Props {
  readonly children?: ReactNode;
}
