import { clearDrafts, logError, setDrafts, setDraftsError } from "../slices";
import type { AppThunk } from "../types";
import { CompanyStatus } from "../../schema";
import { api } from "../../api";

/**
 * Requires the drafts.
 * @returns A thunk that requires the drafts and updates the state.
 */
export function refreshDrafts(): AppThunk {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (authUser) {
      const drafts = await api.getCompaniesByMe({
        sortBy: "createdAt",
        sortOrder: "desc",
        status: CompanyStatus.draft
      });

      if ("error" in drafts) {
        dispatch(logError({ error: drafts, message: drafts.errorMessage }));
        dispatch(setDraftsError());
      } else dispatch(setDrafts(drafts.docs));
    } else dispatch(clearDrafts());
  };
}
