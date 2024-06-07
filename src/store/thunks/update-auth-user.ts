import type { AppThunk } from "../types";
import { api } from "../../api";
import { setAuthUser } from "../slices";

export const updateAuthUser: AppThunk = () => async dispatch => {
  const user = await api.getAuthUser();

  dispatch(setAuthUser(user));
};
