import { logError, setAuthUser } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Updates the authenticated user.
 * @returns A thunk that updates the authenticated user.
 */
export function refreshAuthUser(): AppThunk {
  return async dispatch => {
    try {
      const user = await api.getAuthUser();

      if (user === null) dispatch(setAuthUser(null));
      else if ("error" in user) {
        dispatch(setAuthUser(null));
        dispatch(logError({ error: user, message: user.errorMessage }));
      } else dispatch(setAuthUser(user));
    } catch (err) {
      dispatch(setAuthUser(null));
      dispatch(logError({ error: err, message: lang.ErrorLoadingAuthUser }));
    }
  };
}
