import { clearDrafts, setAuthUser } from "../slices";
import type { AppState } from "../types";
import type { Middleware } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/ban-types -- Ok
export const clearDraftsOnAuthUserChange: Middleware<{}, AppState> =
  store => next => action => {
    if (setAuthUser.match(action)) {
      const nextUser = action.payload;

      const previousUser = store.getState().auth.authUser;

      if (nextUser && previousUser && nextUser.email === previousUser.email) {
        // Same user, do nothing
      } else store.dispatch(clearDrafts());
    }

    return next(action);
  };
