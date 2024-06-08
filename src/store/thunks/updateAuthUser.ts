import { setAuthUser, showSnackbar } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { logger } from "../../services";

/**
 * Updates the authenticated user.
 * @returns A thunk that updates the authenticated user.
 */
export function updateAuthUser(): AppThunk {
  return async dispatch => {
    const user = await api.getAuthUser();

    if (user === null) dispatch(setAuthUser(user));
    else if ("error" in user) {
      logger.error(`${user.error}: ${user.errorMessage}`);
      dispatch(showSnackbar({ message: user.errorMessage, variant: "error" }));
    } else dispatch(setAuthUser(user));
  };
}
