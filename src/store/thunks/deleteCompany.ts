import { logError, removeCompany } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Deletes a draft.
 * @param id - The ID of the draft to delete.
 * @returns A thunk that deletes the draft and updates the state.
 */
export function deleteCompany(id: string): AppThunk {
  return async dispatch => {
    const response = await api.deleteCompany(id);

    if ("error" in response)
      dispatch(
        logError({ error: response.error, message: response.errorMessage })
      );
    else dispatch(removeCompany(id));
  };
}
