import { clearDrafts, logError, setDrafts, setDraftsError } from "../slices";
import type { AppThunk } from "../types";
import { CompanyStatus } from "../../schema";
import { api } from "../../api";
import { lang } from "../../langs";

/**
 * Requires the drafts.
 * @returns A thunk that requires the drafts and updates the state.
 */
export function refreshDrafts(): AppThunk {
  return async (dispatch, getState) => {
    try {
      const { authUser } = getState().auth;

      if (authUser) {
        const drafts = await api.getCompaniesByMe({
          sortBy: "createdAt",
          sortOrder: "desc",
          status: CompanyStatus.draft
        });

        if ("error" in drafts) {
          dispatch(setDraftsError());
          dispatch(logError({ error: drafts, message: drafts.errorMessage }));
        } else dispatch(setDrafts(drafts.docs));
      } else dispatch(clearDrafts());
    } catch (err) {
      dispatch(setDraftsError());
      dispatch(logError({ error: err, message: lang.ErrorLoadingDrafts }));
    }
  };
}
