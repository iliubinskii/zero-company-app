import type { AppAction, AppState } from "../types";
import type {
  Dispatch,
  Middleware,
  ThunkDispatch,
  UnknownAction
} from "@reduxjs/toolkit";
import {
  clearCompanies,
  clearDocuments,
  clearDrafts,
  clearFavoriteCompanies,
  clearUser,
  setAuthUser
} from "../slices";
import {
  refreshCompanies,
  refreshDocuments,
  refreshDrafts,
  refreshFavoriteCompanies,
  refreshUser
} from "../thunks";
import { callAsync } from "../../utils";

export const updateOnAuthUserChange: Middleware<
  // eslint-disable-next-line @typescript-eslint/ban-types -- Ok
  {},
  AppState,
  Dispatch<AppAction> & ThunkDispatch<AppState, undefined, UnknownAction>
> = store => next => action => {
  if (setAuthUser.match(action)) {
    const authUser = action.payload;

    const previousAuthUser = store.getState().auth.authUser;

    if (
      authUser &&
      previousAuthUser &&
      authUser.email === previousAuthUser.email
    ) {
      // Same user, do nothing
    } else if (authUser === null && previousAuthUser === null) {
      // Same no user, do nothing
    } else {
      store.dispatch(clearCompanies());
      store.dispatch(clearDocuments());
      store.dispatch(clearDrafts());
      store.dispatch(clearFavoriteCompanies());
      store.dispatch(clearUser());

      callAsync(async () => {
        await Promise.allSettled([
          store.dispatch(refreshCompanies()),
          store.dispatch(refreshDocuments()),
          store.dispatch(refreshDrafts()),
          store.dispatch(refreshFavoriteCompanies()),
          store.dispatch(refreshUser())
        ]);
      });
    }
  }

  return next(action);
};
