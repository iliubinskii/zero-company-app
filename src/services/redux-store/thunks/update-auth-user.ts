import type { AppThunk } from "../types";
import { clientAPI } from "../../../api";
import { setAuthUser } from "../slices";

export const updateAuthUser: AppThunk = () => async dispatch => {
  const user = await clientAPI.getAuthUser();

  dispatch(setAuthUser(user));
};
