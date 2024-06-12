import { logError, removeDraft } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Deletes a draft.
 * @param id - The ID of the draft to delete.
 * @returns A thunk that deletes the draft and updates the state.
 */
export function deleteDraft(id: string): AppThunk {
  return async dispatch => {
    const response = await api.deleteCompany(id);

    if ("error" in response)
      dispatch(
        logError({ error: response.error, message: response.errorMessage })
      );
    else dispatch(removeDraft(id));
  };
}
