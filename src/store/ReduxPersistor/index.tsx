"use client";

import {
  refreshAuthUser,
  refreshDrafts,
  refreshFavoriteCompanies,
  refreshUser
} from "../thunks";
import type { FC } from "react";
import { REDUX_PERSIST_KEY } from "../../consts";
import React, { useEffect } from "react";
import { callAsync } from "../../utils";
import { setAppState } from "../root-actions";
import { store } from "../store";
import { useAppDispatch } from "../hooks";
import { useRestoreFromLocalStorage } from "./useRestoreFromLocalStorage";
import { useRestoreFromLogin } from "./useRestoreFromLogin";
import { useRestoreFromLogout } from "./useRestoreFromLogout";

export const ReduxPersistor: FC = () => {
  const dispatch = useAppDispatch();

  const restoreFromLocalStorage = useRestoreFromLocalStorage();

  const restoreFromLogin = useRestoreFromLogin();

  const restoreFromLogout = useRestoreFromLogout();

  useEffect(() => {
    let state = store.getState();

    if (state.loaded) {
      // Already loaded, do nothing
    } else {
      state = restoreFromLocalStorage(state);
      state = restoreFromLogin(state);
      state = restoreFromLogout(state);

      dispatch(setAppState({ ...state, loaded: true }));
      callAsync(async () => {
        await Promise.allSettled([
          dispatch(refreshAuthUser()),
          dispatch(refreshDrafts()),
          dispatch(refreshFavoriteCompanies()),
          dispatch(refreshUser())
        ]);
      });
    }

    return store.subscribe(() => {
      localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(store.getState()));
    });
  }, [dispatch, restoreFromLocalStorage, restoreFromLogin, restoreFromLogout]);

  return <></>;
};
