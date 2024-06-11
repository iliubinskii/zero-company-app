import type { AppAction, AppState } from "../types";
import type { Dispatch, Middleware } from "@reduxjs/toolkit";
import { clearDrafts, clearUser, setAuthUser } from "../slices";

export const updateOnAuthUserChange: Middleware<
  // eslint-disable-next-line @typescript-eslint/ban-types -- Ok
  {},
  AppState,
  Dispatch<AppAction>
> = store => next => action => {
  if (setAuthUser.match(action)) {
    const nextUser = action.payload;

    const previousUser = store.getState().auth.authUser;

    if (nextUser && previousUser && nextUser.email === previousUser.email) {
      // Same user, do nothing
    } else if (nextUser === null && previousUser === null) {
      // Same no user, do nothing
    } else {
      store.dispatch(clearDrafts());
      store.dispatch(clearUser());
    }
  }

  return next(action);
};
