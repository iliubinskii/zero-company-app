import { logError, setAuthUser } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Updates the authenticated user.
 * @returns A thunk that updates the authenticated user.
 */
export function refreshAuthUser(): AppThunk {
  return async dispatch => {
    const user = await api.getAuthUser();

    if (user === null) dispatch(setAuthUser(null));
    else if ("error" in user) {
      dispatch(logError({ error: user, message: user.errorMessage }));
      dispatch(setAuthUser(null));
    } else dispatch(setAuthUser(user));
  };
}
