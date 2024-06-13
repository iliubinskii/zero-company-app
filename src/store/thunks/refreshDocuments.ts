import {
  clearDocuments,
  logError,
  setDocuments,
  setDocumentsError
} from "../slices";
import type { AppThunk } from "../types";
import { api } from "../../api";

/**
 * Requires the documents.
 * @returns A thunk that requires the documents and updates the state.
 */
export function refreshDocuments(): AppThunk {
  return async (dispatch, getState) => {
    const { authUser } = getState().auth;

    if (authUser) {
      const documents = await api.getDocumentsByMe({
        sortBy: "createdAt",
        sortOrder: "desc"
      });

      if ("error" in documents) {
        dispatch(
          logError({ error: documents, message: documents.errorMessage })
        );
        dispatch(setDocumentsError());
      } else dispatch(setDocuments(documents.docs));
    } else dispatch(clearDocuments());
  };
}
