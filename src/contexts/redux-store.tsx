"use client";

import type { FC, ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React, { useMemo } from "react";
import { createdPersistedStore } from "../services";

export const ReduxStoreProvider: FC<Props> = ({ children }) => {
  const { persistor, store } = useMemo(() => createdPersistedStore(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export interface Props {
  readonly children: ReactNode;
}
