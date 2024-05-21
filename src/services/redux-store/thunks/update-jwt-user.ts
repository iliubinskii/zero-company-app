import type { AppThunk } from "../types";
import { clientAPI } from "../../../api";
import { setJwtUser } from "../slices";

export const updateJwtUser: AppThunk = () => async dispatch => {
  const jwtUser = await clientAPI.getJwtUser();

  dispatch(setJwtUser(jwtUser));
};
