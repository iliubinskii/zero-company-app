"use client";

import type { FC, ReactNode } from "react";
import type { AppStore } from "../store";
import { Provider } from "react-redux";
import React, { useRef } from "react";
import { createStore } from "../store";

export const ReduxStoreProvider: FC<Props> = ({ children }) => {
  const store = useRef<AppStore>();

  if (store.current) {
    // Already created
  } else store.current = createStore();

  return <Provider store={store.current}>{children}</Provider>;
};

export interface Props {
  readonly children: ReactNode;
}
