"use client";

import { persistor, store } from "../services";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";

export const ReduxStoreProvider: React.FC<Props> = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);

export interface Props {
  readonly children: React.ReactNode;
}
