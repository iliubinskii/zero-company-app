import { deleteDraftFromSlice, showSnackbar } from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";
import { logger } from "../../services";

/**
 * Deletes a draft.
 * @param id - The ID of the draft to delete.
 * @returns A thunk that deletes the draft and updates the state.
 */
export function deleteDraft(id: string): AppThunk {
  return async dispatch => {
    const response = await api.deleteCompany(id);

    if ("error" in response) {
      logger.error(`${response.error}: ${response.errorMessage}`);
      dispatch(
        showSnackbar({
          message: response.errorMessage,
          variant: "error"
        })
      );
    } else dispatch(deleteDraftFromSlice(id));
  };
}
