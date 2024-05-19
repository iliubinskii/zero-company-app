"use client";

import { Provider } from "react-redux";
import React from "react";
import { store } from "../services";

export const ReduxStoreProvider: React.FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export interface Props {
  readonly children: React.ReactNode;
}
