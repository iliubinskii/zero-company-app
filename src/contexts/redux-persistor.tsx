"use client";

import type { FC, ReactNode } from "react";
import {
  isAppState,
  setAppState,
  setLoaded,
  store,
  useAppDispatch
} from "../services";
import { REDUX_PERSIST_KEY } from "../consts";
import React, { useEffect } from "react";

export const ReduxPersistorProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem(REDUX_PERSIST_KEY);

    if (typeof stored === "string") {
      const json = JSON.parse(stored) as unknown;

      if (isAppState(json)) dispatch(setAppState(json));

      dispatch(setLoaded(true));
    }

    return store.subscribe(() => {
      localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(store.getState()));
    });
  }, [dispatch]);

  return <>{children}</>;
};

export interface Props {
  readonly children: ReactNode;
}
