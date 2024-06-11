import { clearUser, logError, setUser } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Requires the drafts.
 * @returns A thunk that requires the drafts and updates the state.
 */
export function refreshUser(): AppThunk {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (authUser) {
      const user = await api.getMe();

      if ("error" in user) {
        dispatch(logError({ error: user, message: user.errorMessage }));
        dispatch(clearUser());
      } else dispatch(setUser(user));
    } else dispatch(clearUser());
  };
}
