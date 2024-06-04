import type { AppThunk } from "../types";
import { getAuthUser } from "../../api";
import { setAuthUser } from "../slices";

export const updateAuthUser: AppThunk = () => async dispatch => {
  const user = await getAuthUser();

  dispatch(setAuthUser(user));
};
