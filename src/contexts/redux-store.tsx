"use client";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import { createdPersistedStore } from "../services";

export const ReduxStoreProvider: React.FC<Props> = ({ children }) => {
  const { persistor, store } = React.useMemo(() => createdPersistedStore(), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export interface Props {
  readonly children: React.ReactNode;
}
