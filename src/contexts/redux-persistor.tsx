"use client";

import { callAsync, filterUndefinedProperties } from "../utils";
import {
  isAppState,
  setAppState,
  setLoaded,
  store,
  updateAuthUser,
  useAppDispatch
} from "../store";
import { AuthUserEssentialValidationSchema } from "../schema";
import type { FC } from "react";
import { REDUX_PERSIST_KEY } from "../consts";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const ReduxPersistor: FC = () => {
  const dispatch = useAppDispatch();

  const params = useSearchParams();

  useEffect(() => {
    let appState = store.getState();

    // Restore from local storage
    {
      const stored = localStorage.getItem(REDUX_PERSIST_KEY);

      if (typeof stored === "string") {
        const json = JSON.parse(stored) as unknown;

        if (isAppState(json)) appState = json;
      }
    }

    // Login action
    {
      const action = params.get("action");

      const user = params.get("user");

      if (action === "login" && typeof user === "string") {
        const authUser = AuthUserEssentialValidationSchema.safeParse(
          JSON.parse(user)
        );

        if (authUser.success) {
          appState = {
            ...appState,
            auth: { authUser: filterUndefinedProperties(authUser.data) }
          };
          localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(appState));
        }
      }
    }

    // Logout action
    {
      const action = params.get("action");

      if (action === "logout") {
        appState = { ...appState, auth: {} };
        localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(appState));
      }
    }

    dispatch(setAppState(appState));
    dispatch(setLoaded(true));

    callAsync(async () => {
      await dispatch(updateAuthUser());
    });

    return store.subscribe(() => {
      localStorage.setItem(REDUX_PERSIST_KEY, JSON.stringify(store.getState()));
    });
  }, [dispatch, params]);

  return <></>;
};
